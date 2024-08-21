document.addEventListener("DOMContentLoaded", function() {
    let number = Math.floor((Math.random() * 10));
    document.getElementById("computer-prediction").innerHTML = 'Computer Prediction: ' +  number;
});