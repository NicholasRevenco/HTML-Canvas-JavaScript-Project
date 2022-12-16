// Function draws the board
function set_up_context() {
  canvas = document.getElementById("canvas_screen");

  canvas.width = 750;
  canvas.height = 750;

  /* Temporary */
  canvas.style.border = "1px solid black";

  context = canvas.getContext("2d");
  return context;
}

set_up_context();

// Position and velocity of circle
var circle_position = [0, 0, 25];
var circle_velocity = [0, 0, 0];

// Change the position of the circle
function applyVelocity (position, velocity) {
  if (circle_position[0] < 30) {
    circle_velocity[0] = 2;
    circle_position[0] = 30;
  } else if (circle_position[0] > canvas.width - 30) {
    circle_velocity[0] = -2;
    circle_position[0] = canvas.width - 30;
  }
  if (circle_position[1] < 30) {
    circle_velocity[1] = 2;
    circle_position[1] = 30;
  } else if (circle_position[1] > canvas.height - 30) {
    circle_velocity[1] = -2;
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
    circle_velocity[1] -= 2;
  } else if (keyStr == 'a') {
    circle_velocity[0] -= 2;
  } else if (keyStr == 's') {
    circle_velocity[1] += 2;
  } else if (keyStr == 'd') {
    circle_velocity[0] += 2;
  } else if (keyStr == ' ') {
    circle_velocity[0] = circle_velocity[0] / 4;
    circle_velocity[1] = circle_velocity[1] / 4;
  }
}

// Draw the circle
function draw() {
  applyVelocity(circle_position, circle_velocity);

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.fillStyle = "black";
  context.fillRect(0, 0, 750, 750);
  context.stroke();

  context.beginPath();
  context.fillStyle = "white";
  context.arc(circle_position[0], circle_position[1], circle_position[2], 0, 2 * Math.PI);
  context.fill();
  context.stroke();

  window.requestAnimationFrame(draw);
}

document.addEventListener("keydown", myKeyDown);

window.requestAnimationFrame(draw);
