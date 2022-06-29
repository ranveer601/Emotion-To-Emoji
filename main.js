Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
});
Webcam.attach('#camera');

function takePicture() {
    Webcam.snap(function (data_uri) {
        // display results in page
        document.getElementById('result').innerHTML =
            '<img id="img1" src="' + data_uri + '"/>';
    });
}

console.log(ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/-yOZaYOnh/model.json", modelloaded);

function modelloaded() {
    console.log("model successfully loaded");
}

var prediction1 = "";

var prediction2 = "";

function speak() {
    var synth = window.speechSynthesis;
    speak_1 = "prediction 1 is" + prediction1;
    speak_2 = "prediction 2 is" + prediction2;
    var utter = new SpeechSynthesisUtterance(speak_1 + speak_2);
    synth.speak(utter);
}
function check() {
    img = document.getElementById("img1");
    classifier.classify(img, gotResult);

}
function gotResult(error, Results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(Results);
        document.getElementById("result_emotion_name").innerHTML = Results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = Results[1].label;
        prediction1 = Results[0].label;
        prediction2 = Results[1].label;
        speak();
        if (prediction1 == "Happy") {
            document.getElementById("update_emoji1").innerHTML = "&#128512;"; 
        }
        if (prediction1 == "Sad") {
            document.getElementById("update_emoji1").innerHTML = "&#128532;"; 
        }
        if (prediction1 == "Angry") {
            document.getElementById("update_emoji1").innerHTML = "&#128548;"; 
        }
        if (prediction2 == "Happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128512;"; 
        }
        if (prediction2 == "Sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128532;"; 
        }
        if (prediction2 == "Angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128548;"; 
        }
    }
}
