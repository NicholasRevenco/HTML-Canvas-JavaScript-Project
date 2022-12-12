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

window.requestAnimationFrame();
