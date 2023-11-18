music = "";
music2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

music_status=""
music2_status=""


function preload() {
    music = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    music_status = music.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        music2.stop();
        if(music_status == false)
        {
            music.play();
            document.getElementById("song").innerHTML = "Song 1 is playing";
        }

        music2_status = music2.isPLaying();
        if (scooreRightWrist > 0.2) {
            circle(rightWristX, rightWristY, 20);
            music.stop();
            if(music_status == false)
            {
                music2.play();
                document.getElementById("song").innerHTML = "Song 2 is playing";
            }
    }
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        
        scoreRightWrist = results[0].pose.keypoints[8].score;
        console.log("scoreRightWrist = " + scoreRightWrist);

        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
    };
}
