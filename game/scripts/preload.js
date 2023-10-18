GameMod = "PRECIS"


let imgCase = new Image
let imgLarcin = new Image
let imgPorte = new Image
let imgLaser = new Image
let imgPlante = new Image



let imgRapide = new Image
let imgPrécis = new Image
let imgMortel = new Image

let imgFond = new Image

let imgCurseur = new Image
let imgLanguette = new Image
let imgLanguetteWhite = new Image


let imgStemps = new Image
let imgSflash = new Image
let imgSmort = new Image
let imgSporte = new Image
let imgScoeur = new Image

let tCase = 64 //img.width
let scale = 64
let scaleRatio = 1



if (largeurEcran < tCase * 16) {
    scale = Math.floor(largeurEcran / 16)
    scaleRatio = scale / tCase

}

let homeText = "Passez la premiere porte pour comencer le défi"




let plot = []
plot[1] = imgCase
plot[2] = imgPlante
plot[3] = imgLaser
plot[4] = imgCase
plot[5] = imgPorte



let distPorte = 12

let map = []
/*for (let S = 1; S<=20; S++ )
{
 map[S] = [] 
}*/

var matrix = []

/*for (let S = 0; S<=3; S++ )
{
 matrix[0] = [] 
}
*/



map.largeur = 1
map.hauteur = 1

// map[x][y] = 0 

let oX = 20 - 64
let oY = 20 - 64

let Relement
let Ri
let Rx
let Ry

let Larcin = []
Larcin.x
Larcin.y

let porte = []
porte.x
porte.y



let laserON = true

var grid
var finder = new PF.AStarFinder();
var path

let laserCount
let Secu

let timer = 0
let timer2 = 0
let animON = false

let functionP

Larcin.clignote = 1



menu = []

menu.butPrecis
menu.butmortel
menu.butRapide

let curseur = []

curseur.pos = 1
curseur.x = [0, 180, 600, 980]
curseur.y = 30

testDif = 0

let mapOK

let time

let lvl

let score = false

let deathCount
let deathCountSave

languette = []
languette.x = [0, 110, 500, 910]
languette.y = 190

