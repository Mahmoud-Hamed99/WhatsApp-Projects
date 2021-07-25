//webkitURL is deprecated but nevertheless 
URL = window.URL || window.webkitURL;
var gumStream;
//stream from getUserMedia() 
var rec;
//Recorder.js object 
var input;
//MediaStreamAudioSourceNode we'll be recording 
// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext;
//new audio context to help us record 
var recordButton = document.getElementById("recordButton");
// var stopButton = document.getElementById("stopButton");
// var pauseButton = document.getElementById("pauseButton");
//add events to those 3 buttons 
recordButton.addEventListener("click", startRecording);
// stopButton.addEventListener("click", stopRecording);
// pauseButton.addEventListener("click", pauseRecording);

function startRecording()
{
    var constraints = {
        audio: true,
        video: false
    } 
    /* Disable the record button until we get a success or fail from getUserMedia() */
    
    // recordButton.disabled = true;
    // stopButton.disabled = false;
    // pauseButton.disabled = false
    
    /* We're using the standard promise based getUserMedia()
    
    https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia */
    
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    
        console.log("getUserMedia() success, stream created, initializing Recorder.js ..."); 
        /* assign to gumStream for later use */
        gumStream = stream;
        /* use the stream */
        input = audioContext.createMediaStreamSource(stream);
        /* Create the Recorder object and configure to record mono sound (1 channel) Recording 2 channels will double the file size */
        rec = new Recorder(input, {
            numChannels: 1
        }) 
        //start the recording process 
        rec.record()
        console.log("Recording started");
        
    }).catch(function(err) {
        //enable the record button if getUserMedia() fails 
        // recordButton.disabled = false;
        // stopButton.disabled = true;
        // pauseButton.disabled = true
         console.log(''+err) ;
    });
 
}