var keys = [];
var audio = [];
var currentpress = false;
var selectedspeed = 10;
var playspeed = 10;
var defaultspeed = 10;
var background = 0;
var whistle = 1;
var engine0 = 2;
var engine1 = 3;
var engine2 = 4;

//set audio files
audio[background] = new Audio("d51/d51-background.mp3");
audio[background].loop = true;
audio[background].addEventListener('timeupdate', function(){
                var buffer = 1.0
                if(this.currentTime > this.duration - buffer){
                    this.currentTime = 1.0
                    this.play()
                }}, false);
audio[whistle] = new Audio("d51/d51-whistle.mp3");
audio[engine0] = new Audio("d51/d51-engine0.mp3");
audio[engine0].addEventListener('timeupdate', function(){
                var buffer = 1.17
                if(this.currentTime > this.duration - buffer){
                    this.currentTime = 0.3
                    this.play()
                }}, false);
audio[engine1] = new Audio("d51/d51-engine1.mp3");
audio[engine1].addEventListener('timeupdate', function(){
                var buffer = 1.0
                if(this.currentTime > this.duration - buffer){
                    this.currentTime = 1.0
                    this.play()
                }}, false);
audio[engine2] = new Audio("d51/d51-engine2.mp3");
audio[engine2].addEventListener('timeupdate', function(){
                var buffer = 1.0
                if(this.currentTime > this.duration - buffer){
                    this.currentTime = 0.8
                    this.play()
                }}, false);

window.addEventListener("keyup", function (e) {
    delete keys[e.keyCode];
    currentpress = false;
}, false);

window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
}, false);

window.addEventListener("spacebar", function (e) {
    keys[e.keyCode] = true;
}, false);

/*
up - 38
down - 40
left - 37
right 39
space - 32
*/

function buttonpress() {
    //ensure single press
    if (!currentpress) {
        //upkey
        if (keys[38]) {
            selectedspeed++;
            currentpress = true;
        }
        //downkey
        if (keys[40]) {
            selectedspeed--;
            currentpress = true;
        }
        //spacebar
        if (keys[32]) {
            currentpress = true;
        }
	}
	if (selectedspeed > 52) {
		selectedspeed = 52;
	} else if (selectedspeed < 10) {
		selectedspeed = 10;
	}
}

document.onkeypress = function() {
    if (event.keyCode == 32) {
        audio[whistle].play();
    }
};

setInterval(function () {
    console.log(selectedspeed + "+" + currentpress);
    buttonpress();
	if (playspeed !== selectedspeed) {
        if (selectedspeed == 10) {
            playspeed = selectedspeed;
            document.getElementById("speed").innerHTML = 0;
            audio[engine0].pause();
            audio[engine1].pause();
            audio[engine2].pause();
        }
        else if ((selectedspeed > 10) && (selectedspeed <= 24)){
		    playspeed = selectedspeed;
            document.getElementById("speed").innerHTML = 5 * (selectedspeed - 1) / 10;
            audio[engine1].pause();
            audio[engine2].pause();
		    audio[engine0].playbackRate = (playspeed - 1) / 10;
            audio[engine0].play();
        }
        else if ((selectedspeed > 24) && (selectedspeed <= 41)){
            playspeed = selectedspeed;
            document.getElementById("speed").innerHTML = 12 * (selectedspeed - 15) / 10;
            audio[engine0].pause();
            audio[engine2].pause();
            audio[engine1].playbackRate = (playspeed - 15) / 10;
            audio[engine1].play();
        }
        else if ((selectedspeed > 41) && (selectedspeed <= 52)){
            playspeed = selectedspeed;
            document.getElementById("speed").innerHTML = 34 * (selectedspeed -32) / 10;
            audio[engine0].pause();
            audio[engine1].pause();
            audio[engine2].playbackRate = (playspeed - 32) / 10;
            audio[engine2].play();
        }
	}
}, 10);
audio[background].playbackRate = defaultspeed / 10;
audio[background].play();
document.getElementById("speed").innerHTML = 0;
