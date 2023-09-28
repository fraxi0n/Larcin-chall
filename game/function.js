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

function KeyDown(t) {
    if (t.code != "F12") {
        t.preventDefault()
    }

    if (t.code == "Escape") {
        GameMod = "MENU"
        score = false


    }


    if (GameMod == "MENU") {

        if (t.code == "ArrowLeft") {
            curseur.pos--
            if (curseur.pos == 0) { curseur.pos = 3 }
        }

        if (t.code == "ArrowRight") {
            curseur.pos++
            if (curseur.pos == 4) { curseur.pos = 1 }
        }

        if (t.code == "Enter") {
            if (curseur.pos == 1) {
                GameMod = "PRECIS"
                testDif = 0
                time = 90


            }
            if (curseur.pos == 2) {
                GameMod = "MORTEL"
                testDif = 40
                time = 180
            }
            if (curseur.pos == 3) {
                GameMod = "RAPIDE"
                testDif = 20
                time = 30
            }

            deathCount = 0
            lvl = 1
            laserON = true
            CreateMap(testDif)
        }


    }
    else // IN GAME
    {

        if (score == true && t.code == "Enter") {
            score = false
            GameMod = "MENU"
        }



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



    if (fY >= 1 && fY <= mapHauteur && fX >= 1 && fX <= mapLargeur) {
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

    lvl++

    // inserer vérif ici ??
    /*

    userId = récup dans l'url mettre dans une variable 
    mapid  = récup dans l'url puis extraire ( juste le mod suffit)



        get() statut de user id = game précis 
        get() statut scores.score map + userid 

    */




    loadMap()



}


function loadMap() {

    // console.table(fetchedMap)
    // console.table(fetchedMap.map)


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


    mapLargeur = map[1].length - 1 // cause first entry empty 
    mapHauteur = map.length - 1
    mapTotal = mapLargeur + mapHauteur

    for (let i = 1; i <= map.length - 1; i++) {


        if (map[i].includes(4)) {
            line = map[i]

            for (let j = 1; j <= line.length - 1; j++) {

                if (map[i][j] == 4) {
                    Larcin.x = j
                    Larcin.y = i
                    map[i][j] = 1
                    j = 100
                    i = 100
                }

            }

        }
    }

}

function CreateMap(pDif) {


    map = []

    do {

        do {
            if (pDif > 200) {
                mapTotal = 24
                mapLargeur = 16
            }
            else {
                mapTotal = RandomINT(4 + Math.floor(pDif / 12), 6 + Math.floor(pDif / 8)) + RandomINT(4, 6)
                mapLargeur = RandomINT(Math.floor(0, 64 * mapTotal) - 2, Math.floor(0.64 * mapTotal) + 2)
            }

            mapHauteur = mapTotal - mapLargeur
        } while (mapHauteur <= 2 || mapHauteur >= 10 || mapLargeur <= 2 || mapLargeur >= 17)

        /*
        for ( let Sy = 1; Sy <= mapHauteur; Sy++ )
        {
            map[Sy] = []


            for (let Sx = 1; Sx <= mapLargeur; Sx++)
            {
                map[Sy][Sx] = 1
            }
        }
        */

        porte.x = RandomINT(1, Math.ceil(mapLargeur * 0.20)) + (RandomINT(0, Math.floor(mapLargeur * 0.20)))
        porte.y = RandomINT(1, Math.ceil(mapHauteur * 0.50)) + (RandomINT(0, Math.floor(mapHauteur * 0.50)))
        Larcin.x = RandomINT(1, Math.ceil(mapLargeur * 0.20)) + (RandomINT(0, Math.floor(mapLargeur * 0.20))) + Math.floor(0.60 * mapLargeur)
        Larcin.y = RandomINT(1, Math.ceil(mapHauteur * 0.50)) + (RandomINT(0, Math.floor(mapHauteur * 0.50)))

        if (porte.y > mapHauteur) { porte.y = mapHauteur }
        if (Larcin.y > mapHauteur) { Larcin.y = mapHauteur }




        Larcin.dX = Larcin.x
        Larcin.dY = Larcin.y




        distPorte = Math.abs(Larcin.x - porte.x) + Math.abs(Larcin.y - porte.y)

    } while (distPorte <= 7)


    mapNbCase = mapHauteur * mapLargeur - 2
    oX = 1200 / 2 - 64 * mapLargeur / 2 - 64
    oY = 675 / 2 - 64 * mapHauteur / 2 - 64



    //------------------------------------------------ mise en place des lasers


    do // REBOOT 
    {
        Secu = 0
        laserCount = 0
        matrix = []

        for (let Sy = 1; Sy <= mapHauteur; Sy++) {
            map[Sy] = []


            for (let Sx = 1; Sx <= mapLargeur; Sx++) {
                map[Sy][Sx] = 1
            }
        }

        map[Larcin.y][Larcin.x] = 4
        map[porte.y][porte.x] = 5

        do // MAP NOT OK = placement des lazers
        {

            do // lazer déjà sur la position
            {
                Ri = RandomINT(1, 10)
                if (Ri <= 2) {
                    Rx = RandomINT(porte.x, Larcin.x)
                    if (Larcin.y >= porte.y) {
                        Ry = RandomINT(porte.y, Larcin.y)
                    }
                    else {
                        Ry = RandomINT(Larcin.y, porte.y)
                    }
                }
                else {
                    if (Ri >= 7) {
                        if (RandomINT(1, 2) == 1) {
                            if (RandomINT(1, mapHauteur + mapLargeur - 4) <= mapLargeur - 2) {
                                Rx = 1
                            }
                            else {
                                Rx = mapLargeur
                            }
                            Ry = RandomINT(1, mapHauteur)
                        }
                        else {
                            if (RandomINT(1, 2) == 1) {
                                Ry = 1
                            }
                            else {
                                Ry = mapHauteur
                            }
                            Rx = RandomINT(1, mapLargeur)
                        }
                    }
                    else {
                        Rx = RandomINT(1, mapLargeur)
                        Ry = RandomINT(1, mapHauteur)
                    }
                }
            }

            while (map[Ry][Rx] == 3 || map[Ry][Rx] == 5 || map[Ry][Rx] == 4)

            map[Ry][Rx] = 3



            for (let Sy = 0; Sy <= mapHauteur - 1; Sy++) {
                matrix[Sy] = []
                for (let Sx = 0; Sx <= mapLargeur - 1; Sx++) {
                    if (map[Sy + 1][Sx + 1] == 3) {
                        matrix[Sy][Sx] = 1
                    }
                    else {
                        matrix[Sy][Sx] = 0
                    }
                }
            }


            grid = new PF.Grid(matrix);
            path = finder.findPath(Larcin.dX - 1, Larcin.dY - 1, porte.x - 1, porte.y - 1, grid)


            if (path.length == 0) {
                map[Ry][Rx] = 1
            }
            else {
                laserCount++
            }


            Secu++







        }
        while ((pDif) == "NO")
    }
    while (MapOK(pDif) == "REBOOT")



    let a = Math.floor(pDif / 8)
    if (a > 12) { a = 12 }

    let b = Math.floor(pDif / 12)
    if (b > 20) { a = 20 }


    Relement = RandomINT(15 - a, 30 - b) / 100
    let S = 1
    while (S <= Relement * (mapNbCase - laserCount)) {
        Rx = RandomINT(1, mapLargeur)
        Ry = RandomINT(1, mapHauteur)

        if (map[Ry][Rx] == 1) {
            map[Ry][Rx] = 2

            S++
        }


    }



    map[Larcin.y][Larcin.x] = 1


    deathCountSave = deathCount
    // console.table(map)



    //  console.table(map)
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


    if (path.length >= distPorte + 2 + a && 15 + b <= Math.floor(laserCount / (mapHauteur * mapLargeur) * 100)) {
        mapOK = "YES"
        console.log(path.length, Math.floor(laserCount / (mapHauteur * mapLargeur) * 100))
    }

    if (path.length >= distPorte + 4 + c || 30 + d <= Math.floor(laserCount / (mapHauteur * mapLargeur) * 100) || Secu > 200) {
        mapOK = "REBOOT"
        console.log("REBOOT")
    }

    return mapOK

}