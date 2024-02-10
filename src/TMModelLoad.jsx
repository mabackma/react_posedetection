import * as tf from "@tensorflow/tfjs"
import * as tmPose from "@teachablemachine/pose"

// Takes path to model.json and path to metadata.json as props. 
function TMModelLoad(props) {

    const {path_to_model, path_to_metadata} = props;

    init(path_to_model, path_to_metadata)
    
    return (
        <div id='model-div'>
            <canvas id="canvas"></canvas>
            <div id="label-container"></div>
        </div>
    )
}

let model, webcam, ctx, labelContainer, maxPredictions;


async function init(path_to_model, path_to_metadata){
    
    // Loads model.json and metadata.json.
    model = await tmPose.load(
        path_to_model,
        path_to_metadata
    )

    maxPredictions = model.getTotalClasses();
    

    const width = window.innerWidth;
    const height = window.innerHeight;
    //const size = 200;
    const flip = true;
    webcam = new tmPose.Webcam(width, height, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    const canvas = document.getElementById("canvas");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }

    console.log(model)
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    // finally draw the poses
    drawPose(pose);
}

function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        // draw the keypoints and skeleton
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}

export default TMModelLoad