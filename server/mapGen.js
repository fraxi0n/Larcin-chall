

const  PF = require('pathfinding') 


var finder = new PF.AStarFinder({
    allowDiagonal: false
});
    

    function RandomINT (pMin,pMax)
    { let w = pMin -1
        let x = 1+ pMax-pMin
        let y = Math.random ()
        let z = 0
        
        while (z< y)
        {
            z += 1/x
            w ++
            
        } 
        return w
    }
    
    
    
    let daylySeed = {}
    
    lvlDif={}
    lvlDif.precis={}
    lvlDif.mortel={}
    lvlDif.eclair={}
    lvlDif.precis.base= 0
    lvlDif.mortel.base=40
    lvlDif.eclair.base=0
    lvlDif.precis.inc=10
    lvlDif.mortel.inc=20
    lvlDif.eclair.inc=10
    
    
    
    
        
        function gen (pDif)
        {
            function MapOK(pDif)
    {
        mapOK = "NO"
    
        let a = Math.floor(pDif/25)
        if (a > 8) {a=8} 
    
        let c = Math.floor(pDif/20)
        if (c > 14) {c=14} 
    
        let b = Math.floor(pDif/5)
        if (b > 35) {c=35} 
    
        let d = Math.floor(pDif/4)
        if (d > 65) {d=65} 
    
    
        if ( path.length >= distPorte+2+ a && 15+ b <= Math.floor(laserCount/(map.hauteur*map.largeur) *100)  )
        {
            mapOK = "YES"
            console.log ( path.length, Math.floor(laserCount/(map.hauteur*map.largeur) *100))
        }
    
        if ( path.length >= distPorte+4+ c || 30+ d <= Math.floor(laserCount/(map.hauteur*map.largeur) *100) || Secu > 200 )
        {
            mapOK = "REBOOT"
            console.log ("REBOOT")
        }
    
        return mapOK
    
    }
    
    
            let Larcin = []
        Larcin.x 
        Larcin.y
    
        let porte = []
        porte.x
        porte.y
    
    
            map=[]
            
            do
            {
                do 
                {
                    if (pDif>200)        
                    { 
                        map.t = 24
                        map.largeur = 16
                    }
                    else
                    {
                        map.t = RandomINT (4 +Math.floor(pDif/12),6  +Math.floor(pDif/8))  +  RandomINT (4,6)
                        map.largeur = RandomINT (Math.floor(0,64*map.t)-2, Math.floor(0.64*map.t)+2)
                    }
                    
                    map.hauteur = map.t - map.largeur
                } while (map.hauteur <=2 || map.hauteur>= 10 || map.largeur <= 2 || map.largeur >= 17)
                
                porte.x = RandomINT(1, Math.ceil(map.largeur*0.20) ) + (RandomINT(0, Math.floor(map.largeur*0.20) ))
                porte.y = RandomINT(1, Math.ceil(map.hauteur*0.50) ) + (RandomINT(0, Math.floor(map.hauteur*0.50) ))
                Larcin.x = RandomINT(1, Math.ceil(map.largeur*0.20) ) + (RandomINT(0, Math.floor(map.largeur*0.20) )) + Math.floor(0.60*map.largeur) 
                Larcin.y = RandomINT(1, Math.ceil(map.hauteur*0.50) ) + (RandomINT(0, Math.floor(map.hauteur*0.50) ))
                
                if (porte.y> map.hauteur) {porte.y= map.hauteur}
                if (Larcin.y> map.hauteur) {Larcin.y= map.hauteur}
                
                
                
                
                Larcin.dX = Larcin.x 
                Larcin.dY = Larcin.y
                
                //console.log (Larcin.x)
                //console.table(map)
                
                
                
                distPorte = Math.abs(Larcin.x - porte.x) + Math.abs(Larcin.y - porte.y)
                
            } while (distPorte <= 7  )
            
            
            map.nbCase = map.hauteur* map.largeur -2
            oX= 1200/2 - 64*map.largeur/2 -64
            oY= 675/2 - 64*map.hauteur/2 -64
            
            
            
            //------------------------------------------------ mise en place des lasers
            
            
            do // REBOOT 
            {
                
                Secu=0
                laserCount=0
                matrix = []
                
                for ( let Sy = 1; Sy <= map.hauteur; Sy++ )
                {
                    map[Sy] = []
                    
                    
                    for (let Sx = 1; Sx <= map.largeur; Sx++)
                    {
                        map[Sy][Sx] = 1
                    }
                }
                
                map[Larcin.y][Larcin.x] = 4
                map[porte.y] [porte.x]  = 5
                
                do // MAP NOT OK = placement des lazers
                {
                    
                    do // lazer déjà sur la position
                    {
                        Ri = RandomINT(1,10)
                        if ( Ri <= 2)
                        {
                            Rx = RandomINT(porte.x, Larcin.x)
                            if (Larcin.y >=porte.y)
                            {
                                Ry = RandomINT(porte.y, Larcin.y)
                            }
                            else
                            {
                                Ry = RandomINT(Larcin.y, porte.y )
                            }
                        }
                        else
                        {
                            if ( Ri >= 7)
                            {
                                if(RandomINT(1,2)==1)
                                {
                                    if(RandomINT(1,map.hauteur+map.largeur-4) <= map.largeur-2) 
                                    {
                                        Rx = 1
                                    }
                                    else
                                    {
                                        Rx = map.largeur
                                    }
                                    Ry = RandomINT(1, map.hauteur)
                                }
                                else
                                {
                                    if(RandomINT(1,2)==1)
                                    {
                                        Ry = 1
                                    }
                                    else
                                    {
                                        Ry = map.hauteur
                                    }
                                    Rx = RandomINT(1,map.largeur)
                                }
                            }
                            else
                            {
                                Rx = RandomINT(1,map.largeur)
                                Ry = RandomINT(1, map.hauteur)
                            }
                        }
                    } 
                    
                    while (map[Ry][Rx] == 3  || map[Ry][Rx] == 5|| map[Ry][Rx] == 4)
                    
                    map[Ry][Rx] = 3
                    
                    
                    
                    for (let Sy = 0; Sy <= map.hauteur-1; Sy++ )
                    {
                        matrix[Sy] = []
                        for (let Sx = 0; Sx <= map.largeur-1; Sx++ )
                        {
                            if (map[Sy+1][Sx+1] == 3 )
                            {
                                matrix[Sy][Sx]  = 1
                            }
                            else
                            {
                                matrix[Sy][Sx] = 0
                            }
                        }
                    }
                    
                    
                    grid = new PF.Grid(matrix);
                    path = finder.findPath(Larcin.dX-1, Larcin.dY-1 , porte.x-1, porte.y-1, grid)
                    
                    
                    if (path.length == 0)
                    {
                        map[Ry][Rx]=1
                    }
                    else
                    {
                        laserCount++
                    }
                    Secu++
                }
                while (   (pDif) == "NO" )
            }
            while ( MapOK  (pDif) == "REBOOT" )
            
            let a = Math.floor(pDif/8)
            if (a > 12) {a=12}
            
            let b = Math.floor(pDif/12)
            if (b > 20) {a=20}
            
            
            Relement = RandomINT (15 - a ,30 -b )/100
            let S=1
            while (S <= Relement*(map.nbCase-laserCount ))
            {
                Rx = RandomINT(1,map.largeur)
                Ry = RandomINT(1, map.hauteur)
                
                if (map[Ry][Rx] == 1)
                {
                    map[Ry][Rx] = 2
                    
                    S++
                }
                
            }
    
            
        return map
        }
    
    
    
        function createDaylySeed ()
    {
        daylySeed.date= new Date.now
        daylySeed.precis=[]
        daylySeed.mortel=[]
        daylySeed.eclair=[]
        
        testDif = lvlDif.precis.base
    
        for ( let i = 0; i <50 ;  i++)
        {
            CreateMap(testDif)
            daylySeed.precis.push( codingSeed() )
            testDif += lvlDif.precis.inc
        }
    
        testDif = lvlDif.mortel.base
    
        for ( let i = 0; i <50 ;  i++)
        {
            CreateMap(testDif)
            daylySeed.mortel.push( codingSeed() )
            testDif += lvlDif.mortel.inc
        }
    
        testDif = lvlDif.eclair.base
    
        for ( let i = 0; i <50 ;  i++)
        {
            CreateMap(testDif)
            daylySeed.eclair.push( codingSeed() )
            testDif += lvlDif.eclair.inc
        }
    
    
    
    
    }
    
    






module.exports = {gen};
