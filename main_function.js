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
var score_number = 0;

var circle_position = [50, 50, 20];
var circle_velocity = [0, 0, 0];

var eliminate_position = [Math.floor(Math.random() * 20) + 680, Math.floor(Math.random() * 20) + 680, 15];
var eliminate_velocity = [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), 0];

var eliminate_position_1 = [Math.floor(Math.random() * 20) + 680, Math.floor(Math.random() * 20) + 680, 15];
var eliminate_velocity_1 = [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), 0];

var eliminate_position_2 = [Math.floor(Math.random() * 20) + 680, Math.floor(Math.random() * 20) + 680, 15];
var eliminate_velocity_2 = [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), 0];

var eliminate_position_3 = [Math.floor(Math.random() * 20) + 680, Math.floor(Math.random() * 20) + 680, 15];
var eliminate_velocity_3 = [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), 0];

var eliminate_position_4 = [Math.floor(Math.random() * 20) + 680, Math.floor(Math.random() * 20) + 680, 15];
var eliminate_velocity_4 = [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), 0];

var eliminate_position_5 = [Math.floor(Math.random() * 20) + 680, Math.floor(Math.random() * 20) + 680, 15];
var eliminate_velocity_5 = [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), 0];

var play_position = [0, 700, 15];
var play_velocity = [Math.round(Math.random()) ? 1 : -1 * 2, Math.round(Math.random()) ? 1 : -1 * 2, 0];

// Change the position of the circle
function apply_bounce(which_position, which_velocity, position, velocity) {
    if (which_position[0] < 30) {
        which_velocity[0] = Math.random() * 4 + 2;
        which_position[0] = 30;
    } else if (which_position[0] > canvas.width - 30) {
        which_velocity[0] = -(Math.random() * 4 + 2);
        which_position[0] = canvas.width - 30;
    }
    if (which_position[1] < 30) {
        which_velocity[1] = (Math.random() * 4 + 2);
        which_position[1] = 30;
    } else if (which_position[1] > canvas.height - 30) {
        which_velocity[1] = -Math.random() * 4 + 2;
        which_position[1] = canvas.height - 30;
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

function draw_circles(color, x_position) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(x_position[0], x_position[1], x_position[2], 0, 2 * Math.PI);
    context.fill();
    context.stroke();
}

function intersect(eliminate_x, eliminate_y, player_x, player_y) {
    if ((Math.abs(eliminate_x - player_x) < 25) && (Math.abs(eliminate_y - player_y) < 25)) {
        return true;
    } else {
        return false;
    }
}

function win() {
    score_number += 1;
    play_position[0] = Math.floor(Math.random() * 750) + 50;
    play_position[1] = Math.floor(Math.random() * 750) + 50;
}

function lose() {
    
    context.beginPath();
    context.fillStyle = "black";
    context.fillRect(canvas.width-120, 10, 110, 40);
    context.stroke();

    context.beginPath();
    context.fillStyle = "white";
    context.fillRect(275, 275, 200, 200);
    context.stroke();
    context.font = "bold 20px verdana, sans-serif";
    context.fillStyle = "black";
    context.fillText('Game Over!', 305, 350);
    context.font = "bold 14px verdana, sans-serif";
    context.fillStyle = "black";
    context.fillText('Score: ' + score_number, 340, 400);
    console.log('hello');
}

// Draw the circle
function draw() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.fillStyle = "black";
    context.fillRect(0, 0, 750, 750);
    context.stroke();

    draw_circles("rgb(245, 66, 66)", eliminate_position);

    draw_circles("rgb(78, 245, 66)", play_position);

    draw_circles("white", circle_position);

    apply_bounce(circle_position, circle_velocity, circle_position, circle_velocity);
    apply_bounce(eliminate_position, eliminate_velocity, eliminate_position, eliminate_velocity);
    apply_bounce(play_position, play_velocity, play_position, play_velocity);

    context.beginPath();
    context.fillStyle = "white";
    context.fillRect(canvas.width-120, 10, 110, 40);
    context.stroke();
    context.font = "bold 14px verdana, sans-serif";
    context.fillStyle = "black";
    context.fillText('Score: ' + score_number,canvas.width-100, 35);
    

    if (intersect(play_position[0], play_position[1], circle_position[0], circle_position[1])) {
        win();
    }

    if (score_number >= 2) {
        draw_circles("rgb(245, 66, 66)", eliminate_position_1);
        apply_bounce(eliminate_position_1, eliminate_velocity_1, eliminate_position_1, eliminate_velocity_1);
        if (intersect(eliminate_position_1[0], eliminate_position_1[1], circle_position[0], circle_position[1])) {
            lose();
            return;
        }
    }
    if (score_number >= 4) {
        console.log('hello');
        draw_circles("rgb(245, 66, 66)", eliminate_position_2);
        apply_bounce(eliminate_position_2, eliminate_velocity_2, eliminate_position_2, eliminate_velocity_2);
        if (intersect(eliminate_position_2[0], eliminate_position_2[1], circle_position[0], circle_position[1])) {
            lose();
            return;
        }
    }

    if (score_number >= 6) {
        draw_circles("rgb(245, 66, 66)", eliminate_position_3);
        apply_bounce(eliminate_position_3, eliminate_velocity_3, eliminate_position_3, eliminate_velocity_3);
        if (intersect(eliminate_position_3[0], eliminate_position_3[1], circle_position[0], circle_position[1])) {
            lose();
            return;
        }
    }

    if (score_number >= 8) {
        draw_circles("rgb(245, 66, 66)", eliminate_position_4);
        apply_bounce(eliminate_position_4, eliminate_velocity_4, eliminate_position_4, eliminate_velocity_4);
        if (intersect(eliminate_position_4[0], eliminate_position_4[1], circle_position[0], circle_position[1])) {
            lose();
            return;
        }
    }

    if (score_number >= 10) {
        draw_circles("rgb(245, 66, 66)", eliminate_position_5);
        apply_bounce(eliminate_position_5, eliminate_velocity_5, eliminate_position_5, eliminate_velocity_5);
        if (intersect(eliminate_position_5[0], eliminate_position_5[1], circle_position[0], circle_position[1])) {
            lose();
            return;
        }
    }

    if (intersect(eliminate_position[0], eliminate_position[1], circle_position[0], circle_position[1])) {
        lose();
        return;
    }

    window.requestAnimationFrame(draw);
}

document.addEventListener("keydown", myKeyDown);

window.requestAnimationFrame(draw);