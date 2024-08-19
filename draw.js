document.addEventListener("DOMContentLoaded", function() {
    addCanvas();
    setCellColorListener();
    let number = Math.floor((Math.random() * 10));
    document.getElementById("computer-prediction").innerHTML = 'Computer Prediction: ' +  number;
});

function addCanvas() {
    const canvas = document.querySelector(".drawing");
    
    canvas.style.gridTemplateRows = `repeat(28, 20px)`;
    canvas.style.gridTemplateColumns = `repeat(28, 20px)`;

    for (let i = 0; i < (28 * 14); i++) {
        const cell = document.createElement("div");
        cell.className = "cell"
        canvas.appendChild(cell);
    }
}

function setCellColorListener() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.addEventListener("mouseover", () => {
            cell.style.backgroundColor = 'black';
        })
    });
}