const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const grayscaleCanvas = document.getElementById("grayscaleCanvas");
const grayscaleCtx = grayscaleCanvas.getContext("2d");

const clearBtn = document.getElementById("clearBtn");
const convertBtn = document.getElementById("convertBtn");
const clearGrayBtn = document.getElementById("clearGrayBtn");
const reconvertBtn = document.getElementById("reconvertBtn");

canvas.width = 280; 
canvas.height = 280;
grayscaleCanvas.width = 28;
grayscaleCanvas.height = 28;

// Initialize canvas with white background
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineWidth = 10;
ctx.lineCap = "round";
ctx.strokeStyle = "black";

// ✅ Correct cursor tracking for accurate drawing
function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (event.clientX - rect.left) * (canvas.width / rect.width),
        y: (event.clientY - rect.top) * (canvas.height / rect.height)
    };
}

// 🎨 Drawing functionality
let isDrawing = false;

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    const pos = getMousePos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
});

canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;
    const pos = getMousePos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
});

canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseleave", () => isDrawing = false);

// 🧹 Clear drawing canvas
clearBtn.addEventListener("click", () => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// 🔄 Convert drawing to 28x28 grayscale
function convertToGrayscale() {
    // Resize drawing to 28x28
    grayscaleCtx.drawImage(canvas, 0, 0, 28, 28);

    // Get pixel data
    const imageData = grayscaleCtx.getImageData(0, 0, 28, 28);
    const data = imageData.data;
    const grayscaleData = [];

    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];

        // Convert RGB to grayscale
        const gray = Math.round(red * 0.3 + green * 0.59 + blue * 0.11);

        // Normalize grayscale values (0-1 range)
        grayscaleData.push(gray / 255);

        // Apply grayscale to image
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
    }

    grayscaleCtx.putImageData(imageData, 0, 0);

    console.log("Grayscale Data (28x28):", grayscaleData);
}

// 🖌 Convert and display grayscale image
convertBtn.addEventListener("click", convertToGrayscale);

// ❌ Clear grayscale canvas
clearGrayBtn.addEventListener("click", () => {
    grayscaleCtx.fillStyle = "white";
    grayscaleCtx.fillRect(0, 0, grayscaleCanvas.width, grayscaleCanvas.height);
});

// 🔁 Reconvert grayscale image
reconvertBtn.addEventListener("click", convertToGrayscale);