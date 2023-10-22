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




const godLaunch = () => {
  godMODE = true


  if (!MapID) {

    fetch(urlAPI + urlMaps + 'mapFromIndex?umMap=0')
      .then(response => response.json()) // Convert response to JSON
      .then(data => {

        // const jsonString = JSON.stringify(data);
        fetchedMap = JSON.parse(data.map)
        MapID = data.id
      }).then(() => runGame())

  }
  else {

    fetch(urlAPI + urlMaps + 'map?+id' + MapID)
      .then(response => response.json()) // Convert response to JSON
      .then(data => {

        // const jsonString = JSON.stringify(data);
        fetchedMap = JSON.parse(data.map)
        MapID = data.id
      }).then(() => runGame())
    runGame()
  }


}


if (MapID) {

  fetch(urlApi + urlMaps + 'daily')
    .then(response => response.json()) // Convert response to JSON
    .then(data => {

      fetchedMap = JSON.parse(data.map)
      if (!MapID == data.id) {



        godMODE = true

        godLaunch()




      }




    })
}

//test launch game quick
// godLaunch()


