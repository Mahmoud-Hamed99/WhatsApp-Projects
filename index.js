$(document).ready(function(){
    $('.tabs').tabs() ;
});

$(document).ready(function (){
         
    var qs= window.location.search;
    var urlparams=new URLSearchParams(qs);
    var userId=urlparams.get('userId'); 
    var userName=urlparams.get('userName');// can be userId from login or userName from registration and both of them unique .

    $("#addProjectLink").attr("href","addProject.html?userId="+userId+"&userName="+userName+"") ;
    $("#addContactLink").attr("href","addContact.html?userId="+userId+"") ;
   
   
console.log(userName) ;
    $.ajax({
        
        url: 'https://localhost:44373/api/projects?userid='+userId+"&userName="+userName,
        type: 'GET',
        data:{ 
        },
        success: function (data, textStatus, xhr) {
            data.forEach(element => {
                     $("#test1").append(SetProject(element.ProjectId, element.ProjectName));
            });        
        },
        error: function (xhr, textStatus, errorThrown){
            alert('Something is Wrong..!');
            console.log(xhr);
        }

     });

     $.ajax({
        url: 'https://localhost:44373/Api/Contacts?userid='+userId,
        type: 'GET',
        success: function (data, textStatus, xhr) {
            data.forEach(element => {
                $("#test2").append(SetContact(element.ContacName,element.ContactMail,element.ContactNumber));
            });
        },
        error: function (xhr, textStatus, errorThrown){
            alert('Something is Wrong..!');
            console.log(xhr);
        }
     });
    
});

function SetProject(projectid,projectname)
{
    var qs= window.location.search;
    var urlparams=new URLSearchParams(qs);
    var userId=urlparams.get('userId') ;
    var userName=urlparams.get('userName') ;

    var res="<a href='chat.html?ProjectName="+projectname+"&ProjectId="+projectid+"&userId="+userId+"&userName="+userName+"' target='_self'>"
    res +="<div class='card-panel whiteColor lighten-5 z-depth-1'>";//begain div2
    res+="<div class='row valign-wrapper'>";//begain div3
    
    res+="<div class='col s3'>" ; //begain image div
    res+=" <img src='img/add-user.png' class='circle responsive-img'></div>";//end image div
    
    res+="<div class='col s9'>" ; //begain text div
    res+="<span class='black-text'>" ;
    res+="<b>"+projectname+"</b><br>" ;
    res+="<span class='grey-text'>Last Message</span> </span> </div>" ;// end text div
       
    res+="<div class='col'>" ;//begain unreadMsg div
    res+="<div class='badge circle green white-text' style='width: 25px; text-align: center;'>" ; // begain circleMsg div
    res+=" <p id='unreadMsg' style='font-size: 12px;'>+99</p>";
    res+="</div> </div>" ; // end unreadMsg div, circleMsg div

    res+="</div> </div> </a>"; // end div3,div2

    return res;
}

function SetContact(name,mail,phone)
{
    var res="<div class='card-panel whiteColor lighten-5 z-depth-1'>";
    res+="<div class='row valign-wrapper'>" ;

    res+="<div class='col s3'>";
    res+="<img src='img/add-user.png' class='circle responsive-img'> </div>";
   
    res+="<div class='col s9'>";
    res+="<span class='black-text'>";
    res+="<b>"+name+"</b><br>" ;
    res+="<span class='grey-text' style='font-size: 14px;'>"+mail+"</span><br>";
    res+="<span class='grey-text' style='font-size: 14px;'> "+phone+"</span>";
    res+="</span> </div> </div> </div> </div>";

    return res ;
                    
}
