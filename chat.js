const stopwatch=document.getElementById('msg') ;
let typeOfMedia={
    audio: {
        sampleRate: 48000,
        channelCount: 2,
        volume: 1.0
    }
   // video: true
}


let options=
{
    audioBitsPerSecond:128000,
    videoBitsPerSecond:2500000,
    MimeType: 'audio/webm'
}
let counter=0 ;
let recStream ;
let recordStarted=false ;
   
var qs= window.location.search;
var urlparams = new URLSearchParams(qs);
var Pname = urlparams.get('ProjectName')
var pId = urlparams.get('ProjectId')
var userId = urlparams.get('userId')
var userName = urlparams.get('userName')

var RecordBoolean=false ;
var base64dataa;

var messagesReceived ;
$(document).ready(function () {
    
	var jsonDate = (new Date()).toJSON();
  
     base64dataa="" ;
     messagesReceived = [];
    
    document.getElementById('ProjectName').textContent = Pname;
    
    load();

    setInterval(function () {
        load();
    }, 1000);

    getContacts();
  
    $("#backToIndex").attr("href","Index.html?userId="+userId+"&userName="+userName+"") ;
});

window.addEventListener('cameraId', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }
  
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        }
    });
  });

function startRecord()
{    
    if (recordStarted == false) {
    
        navigator.permissions.query({
            name: 'microphone',
            state: 'denied'
        })
            .then(function (result) {
              
                if (result.state === 'granted') {
                    document.getElementById("recordButton").src = "img/mic.png";
                } else if (result.state === 'prompt') {
                    recordStarted = true;
                    RecordBoolean = true;
                    document.getElementById("recordButton").src = "img/stop.png";
                    recFunc();
                } else if (result.state === 'denied') {
                    document.getElementById("recordButton").src = "img/mic.png";
                }
            })
    }
    
}


$('#recordButton').click(function () 
{
    if(IsRecordButton())
    {
        startRecord();
    }
    else
    { 
        if(recordStarted)
        {
            recordStarted = false;
            setTimeout(() => { recStream.stop() }, 0);

            document.getElementById("recordButton").src = "img/mic.png";
            clearInterval(swInterval);
            sec = 0;
            min = 0;

            document.getElementById("msg").value = "";
            sendMsgWhenReady();
        }
        else {
            sendMsg();
        }

        
    }
        
});

function sendMsgWhenReady()
{
    if(base64dataa=="")
    {
        setTimeout(() => { sendMsgWhenReady(); }, 100);
    }
    else
    {
        sendMsg();
    }
}


let swInterval;
let displayStopwatch;
let sec = 0;
let min = 0;

let stopWatchFunc = () => {
    sec++;
    if (sec <= 9)
    {
        sec = '0' + sec;
    }
    if (sec === 60)
    {
        sec = 0;
        min++;
    }
    if (min >= 10) {
        min = '0' + min;
    }
    if (min === 60) {
        min = 0;
    }

    displayStopwatch = min + ":" + sec;
    document.getElementById("msg").textContent= displayStopwatch;
}

//Rec Stream INtiate
const recFunc = async() =>
{
    try {
        const mediaDevices = await navigator.mediaDevices.getUserMedia(typeOfMedia);
        if (mediaDevices.active === true) {
            clearInterval(swInterval);
                sec = 0;
                min = 0;
                swInterval = setInterval(stopWatchFunc, 1000); 
            let chunks=[];
            recStream = new MediaRecorder(mediaDevices, options);
            recStream.ondataavailable = e => {
                chunks.push(e.data);
              
                if (recStream.state === 'inactive') {
                    var blob = new Blob(chunks, { type: 'audio/webm'});
                  
                    var reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = function () {
                         base64dataa = reader.result;
                         base64dataa = base64dataa.replace('data:audio/webm;base64,','');
                       
                    }
                }
            }
            recStream.start(1000);
        }
    }
    catch (error) {
        if (error)
            throw error;
    }
}



let linkStyle="display:block; padding:10px; color:red; text-decoration:none;" 
function createAudioElement(bloburl ,MsgId)
{
    // const divEl=document.createElement('div') ;
    // divEl.className='div-audio';

    // const audioEl=document.createElement('audio') ;
    // audioEl.className='audio' ;
    // audioEl.controls=true ;

    const sourceEl=document.createElement('source');
    sourceEl.src=bloburl ;
    sourceEl.type='audio/webm' ;
    document.getElementById(MsgId).appendChild(sourceEl);
  //  document.appendChild(sourceEl) ;
  
}

function createAudio(MsgId)
{
    const divEl=document.createElement('div') ;
    divEl.className='div-audio';

    const audioEl=document.createElement('audio') ;
    audioEl.className='audio' ;

    audioEl.controls=true ;
    
    audioEl.id= MsgId;
    
    divEl.appendChild(audioEl) ;
    $("#chat-box").append(divEl)   
}


function sendMsg()
{
    var MsgObj ;
    var RecordObj;

    if(RecordBoolean==true)
    {
        MsgObj = {
            Message:"Record",
            ProjectId: pId,
            SenderId:userId,  
            Record: RecordBoolean
        };
         RecordObj={
        UserId:userId,
        ProjectId:pId,
        base64data:base64dataa
    };// prepare record object if found.

    }
    else
    {
        MsgObj = {
            Message: $('#msg').val(),
            ProjectId: pId,
            SenderId:userId,  
            Record: RecordBoolean
        }; 
     RecordObj={
            UserId:userId,
            ProjectId:pId,
            base64data:""
        };// prepare record object if found.
    }

    var MsgRecord={
        TextmsgObj: MsgObj,
        RecordMsgObj:RecordObj
    };
    $.ajax({
        url: 'https://localhost:44373/api/Msgs/',
        type: 'POST',
        data: MsgRecord,
        success: function (data, textStatus, xhr) {   
               document.getElementById("msg").value  = "";
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Please check Connection...!');
            document.getElementById("msg").value  = "";
            }
       
    });
}

function getRecord(MsgId)
{
    $.ajax({
        url:'https://localhost:44373/api/Msgs/?ProjectId='+pId+'&MsgId='+MsgId+'',
        typeof:'GET',
        success: function (data, textStatus, xhr) {
            const byteCharacters = atob(data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], {type: 'audio/webm'});
             createAudioElement(URL.createObjectURL(blob),MsgId);
          },
          error: function (xhr, textStatus, errorThrown) {
              alert('Please Try Again, No Connection...!');
          }     
    });
}

function setRightMsg(msg, date,userIdchat)
{
    var res = " <div class='chat-r'>	<div class='sp'></div> ";
    res += "<div class='mess mess-r'>  <p> ~"  + userIdchat + " </p>   <p>" + msg + " </p> ";
    res += "<div class='check'> <span>" + date + "</span> <img id='msgState' src='img/check-1.png'>  </div>";
    res += " </div> </div>";

    return res;
}

function setLeftMsg(msg, date)
{
    var res = "<div class='chat-l'> ";
    res += "<div class='mess'> <p> " + msg + " </p> ";
    res += "<div class='check'> <span>" + date + "</span> </div> </div>";
    res += "<div class='sp'></div> </div>";

    return res;
}

function load() {
    var qs = window.location.search;
    var urlparams = new URLSearchParams(qs);
    var Pname = urlparams.get('ProjectName')
    var pId = urlparams.get('ProjectId')
    var userId = urlparams.get('userId')
    
    
    $.ajax({
        url: 'https://localhost:44373/api/Msgs?ProjectId='+pId+'',
        type: 'Get',
        dataType: 'json',
        success: function (data, textStatus, xhr) {
                data.forEach(element => {
                    var found = false;
                    if(messagesReceived.length > 0)
                    {
                        messagesReceived.forEach(elMessage=>{

                            if(elMessage.MsgId == element.MsgId)
                            {
                                found = true;
                            }
                        });
                    }
                    if(found == false)
                    {
                        if (element.Record == false) {
                            if (element.SenderId == userId){
                                $("#chat-box").append(setRightMsg(element.Message, element.Created_at , element.SenderId));
                            }
                            else {
                                $("#chat-box").append(setLeftMsg(element.Message, element.Created_at));
                            }
                        }
                        else {
                            createAudio(element.MsgId);
                                getRecord(element.MsgId);

                        }
                        messagesReceived.push(element);
                }
                });
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Please check Connection...!');
        }
    });
}

function Backspace(event)
{
    var x=event.which || event.keyCode ;
    var elementx = document.getElementById("userMentionDiv");
    if(x=="8")
    {
        if ($('#msg').val().length == 1) {
            elementx.setAttribute("hidden", "hidden");
            document.getElementById("recordButton").src = "img/mic.png";
        }
        if($('#msg').val().includes("@")) 
        {
            elementx.setAttribute("hidden", "hidden");
        }
    }
}
   
function display(event)
{
    var x = event.which || event.keyCode;
    var elementx = document.getElementById("userMentionDiv");

    if (x == "64") {
        elementx.removeAttribute("hidden");
    }
    else {
        document.getElementById("recordButton").src = "img/emo.png";
        elementx.setAttribute("hidden", "hidden");
    }
}      

function getContacts() 
{
    var qs = window.location.search;
    var urlparams = new URLSearchParams(qs);
    var pId = urlparams.get('ProjectId');
    var userName = urlparams.get('userName')
    $.ajax({
        url: 'https://localhost:44373/api/Projects?projectId=' + pId + "&userName=" + userName,
        type: 'GET',
        dataType: 'json',

        success: function (data, textStatus, xhr) {
            data.forEach(element => {
                $("#userMentionDiv").append(setGridMentionUsers(element));
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Please check Connection...!');
        }
    });
}

function setGridMentionUsers(contactName) 
{
    var res = "<div><li onclick='showData(\"" + contactName + "\")'>" + contactName + "</li></div>";
    return res;
}

function showData(dta) 
{
    document.getElementById("msg").value += dta + " ";
    var elementx = document.getElementById("userMentionDiv");
    elementx.setAttribute("hidden", "hidden");
}
function IsRecordButton()
{
    var img = $("#recordButton");
  
    if (img.attr('src') == 'img/mic.png') {
        return true;
    }
    if(img.attr('src') == 'img/stop.png'){
        
        return false;
    }
    else {
        return false;
    }

}