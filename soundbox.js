var keys = [];
var audio = [];
var currentpress = false;
var selectedspeed = 10;
var playspeed = 10;
var defaultspeed = 10;

var background = 0;
var whistle = 1;
var drain = 2;
var brake = 3;
var injecting = 4;
var drifting = 5;
var coalshoveling = 6;
var engine0 = 7;
var engine1 = 8;
var engine2 = 9;
var brakeactive = 10;

var indrift = false;
var inbrake = false;
var velocity = 0;

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
audio[drain] = new Audio("d51/d51-drain.mp3");
audio[drain].addEventListener('timeupdate', function(){
                var buffer = 1.0
                if(this.currentTime > this.duration - buffer){
                    this.currentTime = 1.0
                    this.play()
                }}, false);
audio[brake] = new Audio("d51/d51-brake.mp3");
audio[injecting] = new Audio("d51/d51-injecting.mp3");
audio[drifting] = new Audio("d51/d51-drifting.mp3");
audio[coalshoveling] = new Audio("d51/d51-coalshoveling.mp3");
audio[engine0] = new Audio("d51/d51-engine0.mp3");
audio[engine0].addEventListener('timeupdate', function(){
                var buffer = 1.13
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
audio[brakeactive] = new Audio("d51/d51-brakeactive.mp3");
audio[brakeactive].addEventListener('timeupdate', function(){
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

/*
up - 38
down - 40
left - 37
right 39
space - 32
1 - 49
2 - 50
...
6 - 54
*/

function buttonpress() {
    //ensure single press
    if (!currentpress) {
        //w key
        if (keys[87]) {
            selectedspeed++;
            currentpress = true;
            indrift = false;
        }
        //s key
        if (keys[83]) {
            selectedspeed--;
            currentpress = true;
            indrift = false;
        }
	}
	if (selectedspeed > 52) {
		selectedspeed = 52;
	} else if (selectedspeed < 10) {
		selectedspeed = 10;
	}
}

document.onkeypress = function() {
    if (event.keyCode == 49) {
        audio[whistle].play();
    }
    if (event.keyCode == 51) {
        if (selectedspeed == 10) {
            audio[brake].play();
            inbrake = false;
        }
        else {
            if (inbrake) {
                audio[brakeactive].pause();
                audio[brakeactive].currentTime = 0;
                inbrake = false;
            }
            else{
                inbrake = true;
                audio[brakeactive].play();
                if (indrift) {
                   (function myLoop (i) {         
                        setTimeout(function () {   
                            if (selectedspeed <= 10) {
                                selectedspeed = 10;
                                velocity = 0;
                                audio[brakeactive].pause();
                                audio[brakeactive].currentTime = 0;
                            }
                            else if ((selectedspeed > 10) && (selectedspeed <= 24)) {
                                selectedspeed -= 2;
                                velocity = 5 * (selectedspeed - 1) / 10;
                            }
                            else if ((selectedspeed > 24) && (selectedspeed <= 41)) {
                                selectedspeed -= 10/12;
                                velocity = 12 * (selectedspeed - 15) / 10;
                            }
                            else if ((selectedspeed > 41) && (selectedspeed <= 52)) {
                                selectedspeed -= 10/34;
                                velocity = 34 * (selectedspeed -32) / 10;
                            }
                            document.getElementById("speed").innerHTML = velocity.toFixed(2);
                            playspeed = selectedspeed;
                            if ((selectedspeed > 10) && inbrake && indrift) {
                                myLoop(i);
                            }
                            else {
                                audio[brakeactive].pause();
                                audio[brakeactive].currentTime = 0;
                            }
                        }, 200)
                    })(1);
                }
                else {
                    (function myLoop (i) {         
                        setTimeout(function () {   
                            if (selectedspeed <= 10) {
                                selectedspeed = 10;
                                velocity = 0;
                                audio[brakeactive].pause();
                                audio[brakeactive].currentTime = 0;
                            }
                            else if ((selectedspeed > 10) && (selectedspeed <= 24)) {
                                selectedspeed -= 2;
                                velocity = 5 * (selectedspeed - 1) / 10;
                            }
                            else if ((selectedspeed > 24) && (selectedspeed <= 41)) {
                                selectedspeed -= 10/12;
                                velocity = 12 * (selectedspeed - 15) / 10;
                            }
                            else if ((selectedspeed > 41) && (selectedspeed <= 52)) {
                                selectedspeed -= 10/34;
                                velocity = 34 * (selectedspeed -32) / 10;
                            }
                            document.getElementById("speed").innerHTML = velocity.toFixed(2);
                            if ((selectedspeed > 10) && inbrake && !indrift){
                                myLoop(i);
                            }
                            else {
                                audio[brakeactive].pause();
                                audio[brakeactive].currentTime = 0;
                            }
                        }, 200)
                    })(1);
                }
            }
        }
    }
    if (event.keyCode == 52) {
        audio[injecting].play();
    }
    if (event.keyCode == 53) {
        if (selectedspeed == 10) {
            audio[drifting].play();
            indrift = false;
        }
        else {
            if (indrift) {
                selectedspeed -= 1;
                indrift= false;
            }
            else {
                audio[engine0].pause();
                audio[engine1].pause();
                audio[engine2].pause();
                indrift = true;
            }
        }
    }
    if (event.keyCode == 54) {
        audio[coalshoveling].play();
    }
};

document.onkeydown = function() {
    if (event.keyCode == 50) {
        audio[drain].play();
    }
}

document.onkeyup = function() {
    if (event.keyCode == 50) {
        audio[drain].pause();
    }
}

setInterval(function () {
    console.log(selectedspeed);// + "+" + currentpress);
    buttonpress();
	if (playspeed !== selectedspeed) {
        if (selectedspeed == 10) {
            playspeed = selectedspeed;
            velocity = 0;
            audio[drifting].pause();
            audio[drifting].currentTime = 0;
            audio[engine0].pause();
            audio[engine1].pause();
            audio[engine2].pause();
        }
        else if ((selectedspeed > 10) && (selectedspeed <= 24)) {
		    playspeed = selectedspeed;
            velocity = 5 * (selectedspeed - 1) / 10;
            audio[drifting].pause();
            audio[drifting].currentTime = 0;
            audio[engine1].pause();
            audio[engine2].pause();
		    audio[engine0].playbackRate = (playspeed - 1) / 10;
            audio[engine0].play();
        }
        else if ((selectedspeed > 24) && (selectedspeed <= 41)) {
            playspeed = selectedspeed;
            velocity = 12 * (selectedspeed - 15) / 10;
            audio[drifting].pause();
            audio[drifting].currentTime = 0;
            audio[engine0].pause();
            audio[engine2].pause();
            audio[engine1].playbackRate = (playspeed - 15) / 10;
            audio[engine1].play();
        }
        else if ((selectedspeed > 41) && (selectedspeed <= 52)) {
            playspeed = selectedspeed;
            velocity = 34 * (selectedspeed -32) / 10;
            audio[drifting].pause();
            audio[drifting].currentTime = 0;
            audio[engine0].pause();
            audio[engine1].pause();
            audio[engine2].playbackRate = (playspeed - 32) / 10;
            audio[engine2].play();
        }
        document.getElementById("speed").innerHTML = velocity.toFixed(2);
	}
}, 10);
audio[background].playbackRate = defaultspeed / 10;
audio[background].play();
document.getElementById("speed").innerHTML = velocity.toFixed(2);
