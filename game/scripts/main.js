let ctx
let derniereUpdate = Date.now()
let dt
let fetchedMap
let maintenant

let godMODE = false


function run() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  ctx.font = scale / 40 + "rem myFont";


  requestAnimationFrame(run);
  maintenant = Date.now()
  dt = (maintenant - derniereUpdate) / 1000
  derniereUpdate = maintenant
  update(dt);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw(ctx)
}

function initGame() {

  load()
  requestAnimationFrame(run)

}

const runGame = () => {

  if (largeurEcran < 1000) {
    vKeyboard.classList.remove("hidden")
    vKeyboard.classList.add("virtual-keyboard")

  }


  loginForm.classList.add("hidden")
  registrationForm.classList.add("hidden")

  canvas = document.createElement("canvas");
  canvas.id = "canvas";

  canvas.width = largeurEcran;
  canvas.height = hauteurEcran
  canvas.style.backgroundColor = "black";
  canvas.style.margin = "auto";

  canvasContainer = document.createElement("div");
  canvasContainer.width = largeurEcran;
  canvasContainer.id = "canvas-container";
  canvasContainer.style.display = "flex";
  canvasContainer.style.justifyContent = "center";

  root.appendChild(canvasContainer);
  canvasContainer.appendChild(canvas);

  initGame()

}


const godLaunch = () => {
  godMODE = true

  if (!MapID) { // pour test developpeur 
    console.log("MODE TEST ACTIF")

    fetch(urlAPI + urlMaps + 'daily')
      .then(response => response.json())
      .then(data => {

        fetchedMap = JSON.parse(data.map)
        MapID = data.id
      }).then(() => runGame())

  }
  else {

    fetch(urlAPI + urlMaps + 'map_from_id/' + MapID)
      .then(response => response.json())
      .then(data => {

        fetchedMap = JSON.parse(data.map)
        MapID = data.id
      }).then(runGame())
  }


}


if (MapID) {

  fetch(urlAPI + urlMaps + 'daily')
    .then(response => response.json())
    .then(data => {

      if (MapID != data.id) {
        godLaunch()
      }
    })
}

//test launch game quick
// godLaunch()


