harry_potter = '';
peter_pan = '';
left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_x = 0;
right_wrist_y = 0;

function preload(){

    harry_potter = loadSound('Harry Potter.mp3');
    peter_pan = loadSound('Peter Pan.mp3');
    peter_pan.rate(1);
    peter_pan.setVolume(1);
    harry_potter.rate(1);
    harry_potter.setVolume(1);

}

function setup(){

    canvas = createCanvas(640,480);
    canvas.position(630, 350);

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, model_loaded);
    posenet.on('pose', got_poses);
}

function draw(){

    image(video, 0, 0 ,640, 480);
}

function model_loaded(){

    console.log('Posenet Model Initialized');

}

function got_poses(results){

    if(results.length > 0){
        console.log(results);

        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        console.log(`Left Wrist X = ${left_wrist_x} | Left Wrist Y = ${left_wrist_y}.`);

        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log(`Right Wrist X = ${right_wrist_x} | Right Wrist Y = ${right_wrist_y}.`);
    }
}