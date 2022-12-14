// Function draws the board
function set_up_context() {
  canvas = document.getElementById("canvas_screen");

  canvas.width = window.innerWidth - 18;
  canvas.height = window.innerHeight - 18;

  /* Temporary */
  canvas.style.border = "1px solid black";

  context = canvas.getContext("2d");
  return context;
}

set_up_context();

// Global variables
/*var x = 200;
var y = 200;
var width = 50;
var height = 50;
var move_value = 20;
var edge_left = 0;
var edge_top = 0;
var edge_right = canvas.width;
var edge_bottom = canvas.height;*/

/*function shape_move(key_pressed) {
  key_value = key_pressed.key;
  // The borders and key presses
  if ((key_value === "w") && (edge_top + 42 < y)) {
    y -= move_value;
  } else if ((key_value === "a") && (edge_left + 42 < x)) {
    x -= move_value;
  } else if ((key_value === "s") && (edge_bottom - 42 > y)) {
    y += move_value;
  } else if ((key_value === "d") && (edge_right - 42 > x)) {
    x += move_value;
  } else if ((key_value === "i") && (edge_top + 42 < y) && (edge_left + 42 < x)) {
    x -= move_value;
    y -= move_value;
  } else if ((key_value === "j") && (edge_left + 42 < x) && (edge_bottom - 42 > y)) {
    x -= move_value;
    y += move_value;
  } else if ((key_value === "k") && (edge_bottom - 42 > y) && (edge_right - 42 > x)) {
    x += move_value;
    y += move_value;
  } else if ((key_value === "l") && (edge_right - 42 > x) && (edge_top + 42 < y)) {
    x += move_value;
    y -= move_value;
  }
  draw();
}*/

// Position and velocity of circle
var circle_position = [0, 0, 25];
var circle_velocity = [0, 0, 0];

// Change the position of the circle
function applyVelocity (position, velocity) {
  if (circle_position[0] < 30) {
    circle_velocity[0] = 0;
    circle_position[0] = 30;
  } else if (circle_position[0] > canvas.width - 30) {
    circle_velocity[0] = 0;
    circle_position[0] = canvas.width - 30;
  }
  if (circle_position[1] < 30) {
    circle_velocity[1] = 0;
    circle_position[1] = 30;
  } else if (circle_position[1] > canvas.height - 30) {
    circle_velocity[1] = 0;
    circle_position[1] = canvas.height - 30;
  }
  var i = 0;
  for (i = 0; i < position.length; i++) {
    position[i] += velocity[i];
  }
}

// Key strokes
function myKeyDown(event) {
  keyStr = event.key;
  if (keyStr == 'w') {
    circle_velocity[1] -= 1;
  } else if (keyStr == 'a') {
    circle_velocity[0] -= 1;
  } else if (keyStr == 's') {
    circle_velocity[1] += 1;
  } else if (keyStr == 'd') {
    circle_velocity[0] += 1;
  }
}

// Draw the circle
function draw() {
  applyVelocity(circle_position, circle_velocity);

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.arc(circle_position[0], circle_position[1], circle_position[2], 0, 2 * Math.PI);
  context.stroke();

  window.requestAnimationFrame(draw);
}

document.addEventListener("keydown", myKeyDown);

window.requestAnimationFrame(draw);
