
let ctx
let derniereUpdate = Date.now()
let dt
let fetchedMap


let maintenant

function run() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  ctx.font = "25px myFont";


  requestAnimationFrame(run);
  maintenant = Date.now()
  dt = (maintenant - derniereUpdate) / 1000
  //console .log (maintenant,derniereUpdate)
  derniereUpdate = maintenant
  update(dt);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw(ctx)
}

function initGame() {

  console.log("LEZGOOO")


  // canvas = document.getElementById("canvas");
  // ctx = canvas.getContext("2d");
  // ctx.font = "25px myFont";


  //gamemod = game


  load()
  requestAnimationFrame(run)



  //interval= setInterval(run,1000/60);

}
