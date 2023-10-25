// function getParameterByName(name)
// {
//  name = name.replace(/[[]/, [).replace(/[]]/, ]);
//  var regexS = [?&] + name + =([^&#]*);
//  var regex = new RegExp(regexS);
//  var results = regex.exec(window.location.search);
//  if(results == null)
//  return ;
//  else
//  return decodeURIComponent(results[1].replace(/+/g, ));
// }

const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
function KeyUp(t) {

    if (arrowKeys.includes(t.code)) {
        t.preventDefault();
        if (t.code == "ArrowUp") { keyUp = false }
        if (t.code == "ArrowDown") { keyDown = false }
        if (t.code == "ArrowLeft") { keyLeft = false }
        if (t.code == "ArrowRight") { keyRight = false }
    }

}
function KeyDown(t) {


    if (arrowKeys.includes(t.code)) {
        t.preventDefault()
    }

    // if (t.code == "Escape") {
    //     GameMod = "MENU"
    //     score = false
    // }


    if (GameMod == "MENU") {

        if (t.code == "ArrowLeft") {
            curseur.pos--
            if (curseur.pos == 0) { curseur.pos = 3 }
        }

        if (t.code == "ArrowRight") {
            curseur.pos++
            if (curseur.pos == 4) { curseur.pos = 1 }
        }



    }
    else // IN GAME
    {



        if (animON == false && score == false) {


            if (t.code == "ArrowUp") {
                LarcinMove(0, -1)
            }

            if (t.code == "ArrowDown") {
                LarcinMove(0, +1)
            }

            if (t.code == "ArrowLeft") {
                LarcinMove(-1, 0)


            }

            if (t.code == "ArrowRight") {
                LarcinMove(+1, 0)


            }
        }
    }
}
function AnimLarcin(pFunction) {
    if (GameMod != "RAPIDE" || pFunction != "DIE")
        laserON = true
    animON = true

    functionP = pFunction

}


function LarcinMove(pX, pY) {
    let fY = Larcin.y + pY
    let fX = Larcin.x + pX

    if (laserON == true) {
        laserON = false
        timer2 = 0
    }



    if (fY >= 1 && fY <= map.hauteur && fX >= 1 && fX <= map.largeur) {
        Larcin.y += pY
        Larcin.x += pX

        if (map[fY][fX] == 1 || map[fY][fX] == 2 || map[fY][fX] == 4) {



        }
        else {
            if (map[fY][fX] == 3) {
                AnimLarcin("DIE")
            }
            else {
                if (map[fY][fX] == 5) {
                    Larcin.y = fY
                    Larcin.x = fX
                    AnimLarcin("WIN")

                }
            }
        }

    }
    else {
    }
}

function LarcinDie() {
    deathCount++



    Larcin.x = Larcin.dX
    Larcin.y = Larcin.dY
    laserON = true

    if (GameMod == "PRECIS") {
        time -= 9
    }

    if (GameMod == "MORTEL") {
        if (deathCount == 3) {
            score = true
        }
        lvl--
        LarcinWin()
    }

}

function LarcinWin() {

    if (lvl != 0) {

        if (GameMod == "PRECIS") {
            testDif += 5
            time += 2
        }
        if (GameMod == "MORTEL") {
            testDif += 4
        }
        if (GameMod == "RAPIDE") {
            if (deathCount == deathCountSave) {
                time++
            }
            testDif += 3
            timer2 = 0
        }

    }
    lvl++;
    updateScore(lvl) // élément ajouté 
    loadMap()


}


function loadMap() {
    // fetch loadmap



    // console.table(fetchedMap)

    if (lvl == 0) {
        map = [[, , , , ,],
        [, 1, 1, 2, 2, 1, 2, 2, 1, 1],
        [, 1, 2, 1, 1, 2, 1, 1, 2, 1],
        [, 1, 2, 1, 5, 1, 4, 1, 2, 1],
        [, 1, 1, 2, 1, 1, 1, 2, 1, 1],
        [, 1, 1, 1, 2, 1, 2, 1, 1, 1],
        [, 1, 1, 1, 1, 2, 1, 1, 1, 1],]
    }
    else {
        map = fetchedMap[lvl - 1]
    }


    map.largeur = map[1].length - 1
    map.hauteur = map.length - 1
    map.t = map.largeur + map.hauteur

    oX = largeurEcran / 2 - scale * map.largeur / 2 - scale
    oY = hauteurEcran / 2 - scale * map.hauteur / 2 - scale

    for (let i = 1; i <= map.length - 1; i++) {


        if (map[i].includes(4)) {
            line = map[i]

            for (let j = 1; j <= line.length - 1; j++) {

                if (map[i][j] == 4) {
                    Larcin.x = j
                    Larcin.y = i
                    Larcin.dX = Larcin.x
                    Larcin.dY = Larcin.y
                    map[i][j] = 1
                    j = 100
                    i = 100
                }

            }

        }
    }

}

function MapOK(pDif) {
    mapOK = "NO"

    let a = Math.floor(pDif / 25)
    if (a > 8) { a = 8 }

    let c = Math.floor(pDif / 20)
    if (c > 14) { c = 14 }

    let b = Math.floor(pDif / 5)
    if (b > 35) { c = 35 }

    let d = Math.floor(pDif / 4)
    if (d > 65) { d = 65 }


    if (path.length >= distPorte + 2 + a && 15 + b <= Math.floor(laserCount / (map.hauteur * map.largeur) * 100)) {
        mapOK = "YES"
    }

    if (path.length >= distPorte + 4 + c || 30 + d <= Math.floor(laserCount / (map.hauteur * map.largeur) * 100) || Secu > 200) {
        mapOK = "REBOOT"
    }

    return mapOK

}