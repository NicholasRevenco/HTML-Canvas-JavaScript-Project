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

function draw() {
  window.requestAnimationFrame(draw);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.rect(canvas.width / 2, canvas.height / 2, 50, 50);
    context.fillStyle = "#000000";
    context.fillRect(canvas.width / 2, canvas.height / 2, 50, 50);
    context.stroke();

}

window.requestAnimationFrame(draw);
