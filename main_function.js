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
var circle_position = [50, 50, 25];
var circle_velocity = [0, 0, 0];

var eliminate_position = [700, 700, 15];
var eliminate_velocity = [Math.round(Math.random()) ? 1 : -1 * 2, Math.round(Math.random()) ? 1 : -1 * 2, 0, 2, 0];

function eliminate_stop(eliminate_x, eliminate_y, player_x, player_y) {
    if ((Math.abs(eliminate_x - player_x) < 40) && (Math.abs(eliminate_y - player_y) < 40)) {
        return true;
    } else {
        return false;
    }
}

// Change the position of the circle
function apply_velocity(which_position, which_velocity, position, velocity) {
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

function apply_velocity_eliminate(position, velocity) {
    if (eliminate_position[0] < 30) {
        eliminate_velocity[0] = 2;
        eliminate_position[0] = 30;
    } else if (eliminate_position[0] > canvas.width - 30) {
        eliminate_velocity[0] = -2;
        eliminate_position[0] = canvas.width - 30;
    }
    if (eliminate_position[1] < 30) {
        eliminate_velocity[1] = 2;
        eliminate_position[1] = 30;
    } else if (eliminate_position[1] > canvas.height - 30) {
        eliminate_velocity[1] = -2;
        eliminate_position[1] = canvas.height - 30;
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

class create_eliminate {

}

// Draw the circle
function draw() {
    apply_velocity(circle_position, circle_velocity, circle_position, circle_velocity);
    apply_velocity_eliminate(eliminate_position, eliminate_velocity);

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.fillStyle = "black";
    context.fillRect(0, 0, 750, 750);
    context.stroke();

    context.beginPath();
    context.fillStyle = "red";
    context.arc(eliminate_position[0], eliminate_position[1], eliminate_position[2], 0, 2 * Math.PI);
    context.fill();
    context.stroke();

    context.beginPath();
    context.fillStyle = "white";
    context.arc(circle_position[0], circle_position[1], circle_position[2], 0, 2 * Math.PI);
    context.fill();
    context.stroke();

    if (eliminate_stop(eliminate_position[0], eliminate_position[1], circle_position[0], circle_position[1])) {
        console.log("You lost!");
        return;
    }
    window.requestAnimationFrame(draw);
}

document.addEventListener("keydown", myKeyDown);

window.requestAnimationFrame(draw);
