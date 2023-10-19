function load() {


    document.addEventListener("keydown", KeyDown, false)
    document.addEventListener("keyup", KeyUp, false)


    imgCase.src = "sprite/case.png"
    imgLarcin.src = "sprite/larcin.png"
    imgPorte.src = "sprite/porte.png"
    imgLaser.src = "sprite/laser.png"
    imgPlante.src = "sprite/plante.png"

    imgMortel.src = "sprite/mortel.png"
    imgRapide.src = "sprite/rapide.png"
    imgPrécis.src = "sprite/precis.png"

    imgCurseur.src = "sprite/curseur.png"
    imgFond.src = "sprite/fond.png"
    imgLanguette.src = "sprite/languette.png"
    imgLanguetteWhite.src = "sprite/languetteBlanche.png"


    imgStemps.src = "sprite/Stemps.png"
    imgSflash.src = "sprite/Sflash.png"
    imgSmort.src = "sprite/Smort.png"
    imgSporte.src = "sprite/Sporte.png"
    imgScoeur.src = "sprite/Scoeur.png"


    iMap = 0


    lvl = 0
    loadMap()
    deathCount = 0

    testDif = 0
    time = 90




}


function update(d) {

    if (score == false && lvl != 0) {
        time -= dt
    }

    if (animON == true) {

        timer += dt
        Larcin.clignote += dt * 8
        if (Larcin.clignote >= 3) {
            Larcin.clignote -= 2
        }

        if (timer >= 1) {
            //console.log("check1")


            timer = 0
            animON = false
            Larcin.clignote = 1

            if (functionP == "WIN") {

                LarcinWin()
            }
            if (functionP == "DIE") {
                LarcinDie()
            }
        }
    }
    else {
        if (GameMod == "RAPIDE" && laserON == true) {
            timer2 += dt
            if (timer2 >= 0.8) {
                laserON = false
                timer2 = 0
            }
        }

    }


    if (time <= 0 && GameMod != "MENU") {
        score = true
    }


}


function draw(pCtx) {

    const drawInCenter = (pImg, h, isScaled) => {


        let scaleW = pImg.width
        let scaleH = pImg.height

        if (isScaled) {
            scaleW = scaleW * scale / 64
            scaleH = scaleH * scale / 64

        }
        pCtx.drawImage(pImg, largeurEcran / 2 - scaleW / 2, h, scaleW, scaleH)

    }
    const writeInCenter = (pTxt, h) => {


        pCtx.fillText(pTxt, (largeurEcran - pCtx.measureText(pTxt).width) / 2, h)
    }






    ctx.fillStyle = 'rgb(255,255,255)'




    if (GameMod == "MENU") {
        pCtx.drawImage(imgFond, 0, 0)

        pCtx.drawImage(imgLanguetteWhite, languette.x[curseur.pos] - 5, languette.y, 210, 305)


        pCtx.drawImage(imgLanguette, languette.x[1], languette.y, 200, 300)
        pCtx.drawImage(imgLanguette, languette.x[2], languette.y, 200, 300)
        pCtx.drawImage(imgLanguette, languette.x[3], languette.y, 200, 300)

        pCtx.drawImage(imgPrécis, 60, 90)
        pCtx.drawImage(imgMortel, 450, 90)
        pCtx.drawImage(imgRapide, 860, 90)

        pCtx.drawImage(imgCurseur, curseur.x[curseur.pos], curseur.y)


        pCtx.drawImage(imgStemps, 140, 250, 50, 50)
        pCtx.drawImage(imgStemps, 530, 250, 50, 50)
        pCtx.drawImage(imgStemps, 940, 250, 50, 50)

        pCtx.fillText("=   90 s", 90 + 110, 40 + 240)
        pCtx.fillText("=   180 s", 90 + 500, 40 + 240)
        pCtx.fillText("=   30 s", 90 + 910, 40 + 240)

        pCtx.drawImage(imgLaser, 140, 250 + 70, 50, 50)
        pCtx.drawImage(imgLaser, 530, 250 + 70, 50, 50)
        pCtx.drawImage(imgLaser, 940, 250 + 70, 50, 50)

        pCtx.fillText("= - 10 s", 90 + 110, 40 + 240 + 70)
        pCtx.fillText("=", 90 + 500, 40 + 240 + 70)
        pCtx.fillText("->", 90 + 910, 40 + 240 + 70)


        pCtx.drawImage(imgSmort, 530 + 80, 250 + 70, 50, 50)
        pCtx.drawImage(imgSflash, 940 + 80, 250 + 70, 50, 50)


        pCtx.drawImage(imgPorte, 140, 250 + 140, 50, 50)

        pCtx.drawImage(imgScoeur, 15 + 530, 250 + 140 + 10, 32, 32)
        pCtx.drawImage(imgScoeur, 15 + 40 + 530, 250 + 140 + 10, 32, 32)
        pCtx.drawImage(imgScoeur, 15 + 80 + 530, 250 + 140 + 10, 32, 32)


        pCtx.drawImage(imgPorte, 940, 250 + 140, 50, 50)



        pCtx.fillText("= + 2 s", 90 + 110, 40 + 240 + 140)
        940
        pCtx.fillText(" 1st try", 90 + 940 - 30, 30 + 240 + 140)
        pCtx.fillText(" = + 1 s", 90 + 940 - 30, 60 + 240 + 140)



        /*
                pCtx.drawImage( v, 110,240+80,50,50)
                pCtx.drawImage( imgLaser, 500,240)
                pCtx.drawImage( imgLaser, 910,240)
                
                pCtx.fillText( "=   90",  90+ 110, 40+ 240)
                pCtx.fillText( "=   180", 90+ 500, 40+ 240)
                pCtx.fillText( "=   60",  90+ 910, 40+ 240)
        
        */




    }
    else //  == INGAME
    {

        if (lvl == 0) {
            writeInCenter(homeText, scale)
            // pCtx.fillText(homeText, (largeurEcran - pCtx.measureText(homeText).width) / 2, scale)
        }
        if (score == false) {
            //ctx.fillStyle = 'rgb(255,255,255)'
            pCtx.drawImage(imgStemps, largeurEcran / 2 - scale * 1.3, scale * 0.14, scale / 2, scale * 0.45)

            pCtx.fillText(Math.ceil(time), largeurEcran / 2 - scale * 0.75, scale * 0.51)

            pCtx.drawImage(imgSporte, largeurEcran / 2 + scale * 0.3, scale * 0.1, scale / 2, scale / 2)

            pCtx.fillText(lvl, largeurEcran / 2 + scale * 0.85, scale * 0.51)


            for (let Sy = 1; Sy <= map.hauteur; Sy++) {
                for (let Sx = 1; Sx <= map.largeur; Sx++) {

                    if (map[Sy][Sx] == 3 && laserON == false) {
                        pCtx.drawImage(imgCase, oX + scale * Sx, oY + scale * Sy, scale, scale)
                    }
                    else {
                        pCtx.drawImage(plot[map[Sy][Sx]], oX + scale * Sx, oY + scale * Sy, scale, scale)
                    }
                }
            }

            if (Larcin.clignote < 2) {
                pCtx.drawImage(imgLarcin, oX + scale * Larcin.x, oY + scale * Larcin.y, scale, scale)
            }



        }
        else // GAME OVER -- score == true
        {



            if (GameMod == "PRECIS") { drawInCenter(imgPrécis, hauteurEcran * 0.05, true) }
            if (GameMod == "MORTEL") { drawInCenter(imgMortel, hauteurEcran * 0.05, true) }
            if (GameMod == "RAPIDE") { drawInCenter(imgRapide, hauteurEcran * 0.05, true) }


            writeInCenter("GAME OVER", hauteurEcran * 0.45)


            drawInCenter(imgSporte, hauteurEcran * 0.55, scale)
            pCtx.fillText(lvl, largeurEcran / 2 + scale, hauteurEcran * 0.55 + scale / 2)


            // writeInCenter(lvl, 300 + 40)



            if (GameMod == "MORTEL") {
                pCtx.drawImage(imgStemps, 530, 500, scale, true)
                pCtx.fillText(Math.ceil(time) + " left", 530 + scale + 10, 500 + 40)


            }
            else {

                // writeInCenter(deathCount, 500 + 40)


                drawInCenter(imgSmort, hauteurEcran * 0.70, true)

                // pCtx.drawImage(imgSmort, 550, 500, scale, scale)
                pCtx.fillText(deathCount, largeurEcran / 2 + scale, hauteurEcran * 0.70 + scale / 2)
            }

        }



    }




}
