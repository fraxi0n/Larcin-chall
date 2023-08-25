let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.font = "25px myFont";
let derniereUpdate = Date.now()
let dt
let fetchedMap 


let maintenant

function run(){

    requestAnimationFrame(run);
    maintenant = Date.now ()
     dt = (maintenant-derniereUpdate)/1000
    //console .log (maintenant,derniereUpdate)
    derniereUpdate= maintenant
    update(dt);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw(ctx)
}

function init() {

    fetch('http://127.0.0.1:8000/daily')
  .then(response => response.json()) // Convert response to JSON
  .then(data => {
    fetchedMap= data
    // console.table(1,fetchedMap)
    load()
    requestAnimationFrame(run)
  })



    //interval= setInterval(run,1000/60);

}

init();
