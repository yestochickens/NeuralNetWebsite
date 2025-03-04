document.addEventListener('DOMContentLoaded', function() {
    addCanvas();
    setupDrawingListeners();
    document.querySelector(".clear").addEventListener("click", clear);

});

function addCanvas() {
    const canvas = document.querySelector(".drawing");
    
    if (window.innerWidth < 768) {
        canvas.style.gridTemplateRows = `repeat(28, 2.5vh)`;
        canvas.style.gridTemplateColumns = `repeat(28, 2.5vh)`;
    } else {
        canvas.style.gridTemplateRows = `repeat(28, 2.9vh)`;
        canvas.style.gridTemplateColumns = `repeat(28, 2.9vh)`;
    }

    for (let i = 0; i < (28 * 28); i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.style.backgroundColor = 'rgb(255, 255, 255)';
        canvas.appendChild(cell);
    }
}

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function setupDrawingListeners() {
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
        getData();
    });

    canvas.addEventListener("mouseleave", () => {
        mouseDown = false;
        lastMouseX = null;
        lastMouseY = null;
    });

    canvas.addEventListener("mousemove", handleMouseMove);

    // mobile drawing

    canvas.addEventListener("touchstart", (event) => {
        mouseDown = true;
        lastMouseX = null;
        lastMouseY = null;
        const touch = event.touches[0];
        lastMouseX = touch.clientX - canvas.getBoundingClientRect().left;
        lastMouseY = touch.clientY - canvas.getBoundingClientRect().top;

        event.preventDefault();
    });

    canvas.addEventListener("touchmove", (event) => {
        if (!mouseDown) return;
        const touch = event.touches[0];
        const mouseX = touch.clientX - canvas.getBoundingClientRect().left;
        const mouseY = touch.clientY - canvas.getBoundingClientRect().top;

        drawLine(lastMouseX, lastMouseY, mouseX, mouseY);

        lastMouseX = mouseX;
        lastMouseY = mouseY;

        event.preventDefault();
    });

    canvas.addEventListener("touchend", () => {
        mouseDown = false;
        lastMouseX = null;
        lastMouseY = null;
        getData();
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "c") {
        clear();
    }
    if (event.key === "g") {
        getData();
    }
});
function clear() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.style.backgroundColor = 'rgb(255, 255, 255)';
    });
    document.getElementById('computer-prediction').innerHTML = 'Computer Prediction: ';
    
    const probContainer = document.querySelector('.computer-percentage');
    probContainer.innerHTML = '';
    // clear bar graph
    for (let i = 0; i < 10; i++) {
        const barContainer = document.createElement('div');
        barContainer.classList.add('bar-container');

        const barLabel = document.createElement('span');
        barLabel.classList.add('bar-label');
        barLabel.textContent = `${i}: `;

        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.width = '0%';

        barContainer.appendChild(barLabel);
        barContainer.appendChild(bar);
        probContainer.appendChild(barContainer);
    }
}

function getData() {
    let pictureArr = [];

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        pictureArr.push((255 - cell.style.backgroundColor.split(',')[1]) / 255);
    });

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
        const probContainer = document.querySelector('.computer-percentage');

        probContainer.innerHTML = '';
        // set values for bar graph

        let probabilities = data.prob[0];

        let scaledProbs = scaleProbabilities(probabilities);

        for (let i = 0; i < scaledProbs.length; i++) {
            const barContainer = document.createElement('div');
            barContainer.classList.add('bar-container');

            const barLabel = document.createElement('span');
            barLabel.classList.add('bar-label');
            barLabel.textContent = `${i}: `;

            const bar = document.createElement('div');
            bar.classList.add('bar');
            bar.style.width = `${scaledProbs[i]}%`;

            const percentageLabel = document.createElement('span');
            percentageLabel.classList.add('percentage-label');
            percentageLabel.textContent = `${(probabilities[i] * 100).toFixed(2)}%`;

            barContainer.appendChild(barLabel);
            barContainer.appendChild(bar);
            barContainer.appendChild(percentageLabel);
            probContainer.appendChild(barContainer);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function scaleProbabilities(probs) {
    // scaling for bars
    const minBarWidth = 15;
    const maxBarWidth = 100;

    const minProb = Math.min(...probs);
    const maxProb = Math.max(...probs);

    return probs.map(prob => {
        return minBarWidth + ((prob - minProb) / (maxProb - minProb)) * (maxBarWidth - minBarWidth);
    });
}