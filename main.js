harry_potter = '';
peter_pan = '';
left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_x = 0;
right_wrist_y = 0;
left_wrist_score = 0;
right_wrist_score = 0;
harry_status = '';
peter_status = '';

function preload() {

    harry_potter = loadSound('Harry Potter.mp3');
    peter_pan = loadSound('Peter Pan.mp3');
    peter_pan.rate(1);
    peter_pan.setVolume(1);
    harry_potter.rate(1);
    harry_potter.setVolume(1);

}

function setup() {

    canvas = createCanvas(640, 480);
    canvas.position(630, 350);

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, model_loaded);
    posenet.on('pose', got_poses);
}

function draw() {

    image(video, 0, 0, 640, 480);

    harry_status = harry_potter.isPlaying();
    peter_status = peter_pan.isPlaying();

    fill('green');
    stroke('green');

    if (left_wrist_score > 0.2) {

        circle(left_wrist_x, left_wrist_y, 20);
        peter_pan.stop();
        if (harry_status == false) {
            harry_potter.play();
            document.getElementById('song_name').innerHTML = 'Harry Potter Playing';
        }
    }

    if (right_wrist_score > 0.2) {

        circle(right_wrist_x, right_wrist_y, 20);
        harry_potter.stop();
        if (peter_status == false) {
            peter_pan.play();
            document.getElementById('song_name').innerHTML = 'Peter Pan Playing';
        }
    }
}

function model_loaded() {

    console.log('Posenet Model Initialized');

}

function got_poses(results) {

    if (results.length > 0) {
        console.log(results);

        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        console.log(`Left Wrist X = ${left_wrist_x} | Left Wrist Y = ${left_wrist_y}.`);

        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log(`Right Wrist X = ${right_wrist_x} | Right Wrist Y = ${right_wrist_y}.`);

        left_wrist_score = results[0].pose.keypoints[9].score;
        right_wrist_score = results[0].pose.keypoints[10].score;

        console.log(right_wrist_score);
        console.log(left_wrist_score);
    }
}