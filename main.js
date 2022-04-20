harry_potter = '';
peter_pan = '';

function preload(){
    harry_potter = loadSound('Harry Potter.mp3');
    peter_pan = loadSound('Peter Pan.mp3');
}

function setup(){

    canvas = createCanvas(640,480);
    canvas.position(630, 350);

    video = createCapture(VIDEO);
    video.hide();
}

function draw(){

    image(video, 0, 0 ,640, 480);
}