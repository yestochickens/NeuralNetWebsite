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

function handleMouseMove(event) {
    if (!mouseDown) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        const cellRect = cell.getBoundingClientRect();
        const cellX = cellRect.left + (cellRect.width / 2) - rect.left;
        const cellY = cellRect.top + (cellRect.height / 2) - rect.top;

        const distance = calculateDistance(mouseX, mouseY, cellX, cellY);
        const maxDistance = 40;
        const colorIntensity = Math.max(0, 1 - (distance / maxDistance));
        const newColorValue = Math.min(255 * (1 - colorIntensity), cell.style.backgroundColor.split(',')[1]);

        const newColor = `rgb(${newColorValue}, ${newColorValue}, ${newColorValue})`;
        
        if (cell.style.backgroundColor !== newColor) {
            cell.style.backgroundColor = newColor;
        }
    });
}

function clearColors() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.style.backgroundColor = 'rgb(255, 255, 255)';
    });
}

function getData(){
    let pictureArr = []

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        pictureArr.push((255 - cell.style.backgroundColor.split(',')[1]) / 255)
    });
    document.getElementById("test").textContent = pictureArr;
    console.log(pictureArr)
}

let mouseDown = false;
const canvas = document.querySelector(".drawing");

canvas.addEventListener("mousedown", () => {
    mouseDown = true;
});

canvas.addEventListener("mouseup", () => {
    mouseDown = false;
});

canvas.addEventListener("mousemove", handleMouseMove);

addCanvas();
