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


console.log(2, MapID, urlAPI)
if (MapID) {


  fetch(urlAPI + urlMaps + 'daily')
    .then(response => response.json()) // Convert response to JSON
    .then(data => {

      if (MapID != data.id) {


        console.log(MapID, data.id)
        fetch(urlAPI + urlMaps + 'map_from_id/' + MapID)
          .then(response => response.json())
          .then(data => {

            fetchedMap = JSON.parse(data.map)
            console.log("passe")

            godMODE = true

            godLaunch()
          })
      }
    })
}

//test launch game quick
// godLaunch()


