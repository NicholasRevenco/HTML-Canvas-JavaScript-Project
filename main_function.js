/* Function draws the board */
function setUpContext() {
  canvas = document.getElementById("canvas_screen");

  canvas.width = window.innerWidth - 18;
  canvas.height = window.innerHeight - 18;

  /* Temporary */
  canvas.style.border = "1px solid black";

  context = canvas.getContext("2d");

  return context;
}
setUpContext();

var x = 0;
var y = 0;
var width = 50;
var height = 50;
var move_value = 20;

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.arc(x, y, 25, 0, 2 * Math.PI);
  context.fillStyle = "red";
  context.stroke();
}

function shape_move(key_pressed) {
  key_value = key_pressed.key;
  console.log(key_pressed.key);
  if (key_value === "e") {
    y -= move_value;
  } else if (key_value === "s") {
    x -= move_value;
  } else if (key_value === "d") {
    y += move_value;
  } else if (key_value === "f") {
    x += move_value;
  } else if (key_value === "w") {
    x -= move_value;
    y -= move_value;
  } else if (key_value === "a") {
    x -= move_value;
    y += move_value;
  } else if (key_value === "g") {
    x += move_value;
    y += move_value;
  } else if (key_value === "r") {
    x += move_value;
    y -= move_value;
  }
  draw();
}

window.addEventListener("keypress", shape_move);

window.requestAnimationFrame(draw);
