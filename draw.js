document.addEventListener("DOMContentLoaded", function() {
    addCanvas();
    draw();
    let number = Math.floor((Math.random() * 10));
    document.getElementById("computer-prediction").innerHTML = 'Computer Prediction: ' +  number;
});

document.addEventListener("keydown", (event) => {
    if (event.key === "c") {
        clearColors();
      }
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

function draw() {
    const cells = document.querySelectorAll(".cell");
    let isDrawing = false;


    cells.forEach(cell => {
        cell.addEventListener("mousedown", () => {
            isDrawing = true;
            cell.style.backgroundColor = "rgb(0, 0, 0)";
        });

        cell.addEventListener("mousemove", () => {
            if (isDrawing) {
                cell.style.backgroundColor = "rgb(0, 0, 0)";
            }
        });

        cell.addEventListener("mouseup", () => {
            isDrawing = false;
        });

        cell.addEventListener("mouseleave", () => {
            if (isDrawing) {
                cell.style.backgroundColor = "rgb(0, 0, 0)";
            }
        });
    });
    document.addEventListener("mouseup", () => {
        isDrawing = false;
    });
}

function clearColors() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.style.backgroundColor = 'white';
    });
}