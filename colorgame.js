// Variables globales
let numSquares = 6;
let colors = [];
let pickedColor;

const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.getElementById("message");
const h1 = document.getElementById("h1");
const resetButton = document.getElementById("reset");
const modeButtons = document.querySelectorAll(".mode");

// Inicialización del juego
init();

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

// Configuración de botones de modo
function setupModeButtons() {
    modeButtons.forEach(button => {
        button.addEventListener("click", function () {
            modeButtons.forEach(btn => btn.classList.remove("selected"));
            this.classList.add("selected");
            numSquares = this.textContent === "EASY" ? 3 : 6;
            reset();
        });
    });
}

// Configuración de los cuadrados
function setupSquares() {
    squares.forEach((square, index) => {
        square.addEventListener("click", function () {
            const clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "¡Correcto!";
                resetButton.textContent = "Play Again?";
                changeColors(pickedColor);
                h1.style.backgroundColor = pickedColor;
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Inténtalo nuevamente";
            }
        });
    });
}

// Reiniciar el juego
function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = "";
    resetButton.textContent = "Nuevos Colores";
    h1.style.backgroundColor = "#232323";
    squares.forEach((square, index) => {
        if (colors[index]) {
            square.style.display = "block";
            square.style.backgroundColor = colors[index];
        } else {
            square.style.display = "none";
        }
    });
}

// Cambiar colores de todos los cuadrados
function changeColors(color) {
    squares.forEach(square => square.style.backgroundColor = color);
}

// Elegir color ganador
function pickColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// Generar colores aleatorios
function generateRandomColors(num) {
    const arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

// Generar un color RGB aleatorio
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Evento del botón de reset
resetButton.addEventListener("click", reset);

