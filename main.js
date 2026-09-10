//### Constants
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const pauseButton = document.getElementById("pause");
const speed1xButton = document.getElementById("speed1x");
const speed2xButton = document.getElementById("speed2x");
const speed10xButton = document.getElementById("speed10x");

const updateInterval = 500  // ms per update
let   speed = 1;

let   probOutput = document.getElementById("probOutput")
const probSlider = document.getElementById("probSlider")
const addButton = document.getElementById("add");

const rows = 50;
const cols = 50;
const cellSize = 15;

// false: black, true: white
const grid = new Uint8Array(rows * cols);


//### Functions
function get(x, y) {
  return grid[y * cols + x];
}

function set(x, y, value) {
  grid[y * cols + x] = value;
}

function countNeighbors(x, y) {
  let count = 0;

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {

      if (dx === 0 && dy === 0) continue;

      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 && nx < cols &&
        ny >= 0 && ny < rows
      ) {count += get(nx, ny)}
    }
  }
  return count;
}

function fillRand(prob = 0.33) {
    for (let n = 0; n < rows * cols; n++) {
        grid[n] = (Math.random() < prob ? 1 : 0);
    }
}


// Control
speed1xButton.onclick = () => {speed = 1}
speed2xButton.onclick = () => {speed = 2}
speed10xButton.onclick = () => {speed = 10}

var prob = probSlider.value / 100;

canvas.addEventListener("mousedown", (event) => {
    const rect = canvas.getBoundingClientRect();

    const x = Math.floor(
        (event.clientX - rect.left) / cellSize
    );
    const y = Math.floor(
        (event.clientY - rect.top) / cellSize
    );

    if (x >= 0 && x < cols && y >= 0 && y < rows) {
        const newState = !(get(x, y));
        set(x, y, newState);
        drawImg();
    }
});

probSlider.oninput = function() {
    prob = probSlider.value / 100;
    probOutput.innerHTML = `Density: ${prob}`;
} 

addButton.addEventListener("click", () => {
    fillRand(prob);
    drawImg();
});

fillRand();
drawImg();


//### Canvas
canvas.width = rows*cellSize;
canvas.height = cols*cellSize;

//### Animation
function update() {
    fillRand(prob);
}

function drawImg() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {

            ctx.fillStyle = get(x, y) ? "white" : "black";
            ctx.fillRect(
                x * cellSize,
                y * cellSize,
                cellSize,
                cellSize
            );

            ctx.strokeStyle = "DimGray";
            ctx.strokeRect(
                x * cellSize,
                y * cellSize,
                cellSize,
                cellSize
            );
        }
    }
}


let play = true;
let frame = 0;
let lastUpdate = performance.now();

function animate(timestamp) {
  if (play) {if (timestamp - lastUpdate >= updateInterval/speed) {
    update();
    lastUpdate = timestamp;
  }}

  drawImg();

  pauseButton.innerHTML = {
    true: "\u23F8",   // pause symbol
    false: "\u23F5",  // play symbol
  }[play];

  frame += 1;
  requestAnimationFrame(animate)
}

function startAnimation() {
  requestAnimationFrame(animate);
}

startAnimation()

pauseButton.onclick = () => {play = !play}