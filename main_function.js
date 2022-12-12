/* Function draws the board */
function settopContext() {
  canvas = document.getElementById("canvas_screen");

  canvas.width = window.innerWidth - 18;
  canvas.height = window.innerHeight - 18;

  /* Temporary */
  canvas.style.border = "1px solid black";

  context = canvas.getContext("2d");

  return context;
}
settopContext();

var x = 200;
var y = 200;
var width = 50;
var height = 50;
var move_value = 20;
var edge_left = 0;
var edge_top = 0;
var edge_right = canvas.width;
var edge_bottom = canvas.height;


function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.arc(x, y, 25, 0, 2 * Math.PI);
  context.fillStyle = "red";
  context.stroke();
}

function shape_move(key_pressed) {
  key_value = key_pressed.key;
  if ((key_value === "w") && !(edge_top + 42 > y)) {
    y -= move_value;
  } else if ((key_value === "a") && !(edge_left + 42 > x)) {
    x -= move_value;
  } else if ((key_value === "s") && !(edge_bottom - 42 < y)) {
    y += move_value;
  } else if ((key_value === "d") && !(edge_right - 42 < x)) {
    x += move_value;
  } else if ((key_value === "i") && !(edge_top + 42 > y) && !(edge_left + 42 > x)) {
    x -= move_value;
    y -= move_value;
  } else if ((key_value === "j") && !(edge_left + 42 > x) && !(edge_bottom - 42 < y)) {
    x -= move_value;
    y += move_value;
  } else if ((key_value === "k") && !(edge_bottom - 42 < y) && !(edge_right - 42 < x)) {
    x += move_value;
    y += move_value;
  } else if ((key_value === "l") && !(edge_right - 42 < x) && !(edge_top + 42 > y)) {
    x += move_value;
    y -= move_value;
  }
  draw();
}

window.addEventListener("keypress", shape_move);

window.requestAnimationFrame(draw);
