document.addEventListener("keydown", (event) => {
    if (event.key === "c") {
        clearColors();
    }
    if (event.key === "g") {
        getData();
    }
});

function addCanvas() {
    const canvas = document.querySelector(".drawing");
    
    canvas.style.gridTemplateRows = `repeat(28, 20px)`;
    canvas.style.gridTemplateColumns = `repeat(28, 20px)`;

    for (let i = 0; i < (28 * 28); i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.style.backgroundColor = 'rgb(255, 255, 255)'
        canvas.appendChild(cell);
    }
}

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

let mouseDown = false;
let lastMouseX = null;
let lastMouseY = null;
const canvas = document.querySelector(".drawing");

function handleMouseMove(event) {
    if (!mouseDown) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (lastMouseX !== null && lastMouseY !== null) {
        drawLine(lastMouseX, lastMouseY, mouseX, mouseY);
    }

    lastMouseX = mouseX;
    lastMouseY = mouseY;
}

function drawLine(x1, y1, x2, y2) {
    const cells = document.querySelectorAll(".cell");
    const rect = canvas.getBoundingClientRect();

    const distance = calculateDistance(x1, y1, x2, y2);
    const steps = Math.ceil(distance / 10);
    const dx = (x2 - x1) / steps;
    const dy = (y2 - y1) / steps;

    for (let i = 0; i <= steps; i++) {
        const currentX = x1 + dx * i;
        const currentY = y1 + dy * i;

        cells.forEach(cell => {
            const cellRect = cell.getBoundingClientRect();
            const cellX = cellRect.left + (cellRect.width / 2) - rect.left;
            const cellY = cellRect.top + (cellRect.height / 2) - rect.top;

            const dist = calculateDistance(currentX, currentY, cellX, cellY);
            const maxDistance = 40;
            const colorIntensity = Math.max(0, 1 - (dist / maxDistance));
            const newColorValue = Math.min(255 * (1 - colorIntensity), cell.style.backgroundColor.split(',')[1]);

            const newColor = `rgb(${newColorValue}, ${newColorValue}, ${newColorValue})`;

            if (cell.style.backgroundColor !== newColor) {
                cell.style.backgroundColor = newColor;
            }
        });
    }
}

canvas.addEventListener("mousedown", () => {
    mouseDown = true;
    lastMouseX = null;
    lastMouseY = null;
});

canvas.addEventListener("mouseup", () => {
    mouseDown = false;
    lastMouseX = null;
    lastMouseY = null;
});

canvas.addEventListener("mouseleave", () => {
    mouseDown = false;
    lastMouseX = null;
    lastMouseY = null;
});

canvas.addEventListener("mousemove", handleMouseMove);

addCanvas();

function clearColors() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.style.backgroundColor = 'rgb(255, 255, 255)';
    });
    getData()
}

function getData(){
    let pictureArr = []

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        pictureArr.push((255 - cell.style.backgroundColor.split(',')[1]) / 255)
    });
    document.getElementById("test").textContent = "not working bumg";

    fetch('/process_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pictureArr: pictureArr })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("computer-prediction").textContent = `Computer Prediction: ${data.pred}`;
        document.getElementById("prob").textContent = 
        `0: ${(data.prob[0][0] * 100).toFixed(2)}%
         1: ${(data.prob[0][1] * 100).toFixed(2)}% 
         2: ${(data.prob[0][2] * 100).toFixed(2)}%
         3: ${(data.prob[0][3] * 100).toFixed(2)}%
         4: ${(data.prob[0][4] * 100).toFixed(2)}%
         5: ${(data.prob[0][5] * 100).toFixed(2)}%
         6: ${(data.prob[0][6] * 100).toFixed(2)}%
         7: ${(data.prob[0][7] * 100).toFixed(2)}%
         7: ${(data.prob[0][8] * 100).toFixed(2)}%
         9: ${(data.prob[0][9] * 100).toFixed(2)}%`
    })
    .catch(error => {
        console.error('Error:', error);
    });
}