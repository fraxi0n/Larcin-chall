import React from 'react';
import Navbar from '../Navbar';
import '../../App.css';
import precisImg from '../../asset/precis.png';
import mortelImg from '../../asset/mortel.png';
import rapideImg from '../../asset/rapide.png';
import { Link } from 'react-router-dom';


const Home = () => {
  return (<>

    <div className="app">

      <Navbar></Navbar>

      <div style={{ padding: " 0 2rem " }}>

        <h1> Larcin Challenge </h1>
        <h3> Chaque jour, jouez vous de la nouvelle sécurité et imposez vous comme le cambrioleur ultime</h3>

        <p> Connaissez vous Larcin Lazer ?<></>

          Il s'agit d'un jeu au concept original crée en Game Jam par
          Géraud Zuchini, alias <a href="https://docgeraud.itch.io/" > doc Géraud</a>.<br></br>
          Il est sortie en version finale et commerciale en début d'année 2023 sur steam, itch io et en version mobile sur android.<br></br>

          Dans ce jeu vous incarnez un cambrioleur, qui n'ayant plus de quoi nourir son chat est contraint
          d'aller voler de riche capitaliste.
        </p>

        <div style={{ maxWidth: "854px" }}
        >
          <div className='video-container'>
            <video controls autoPlay muted >
              <source src="https://cdn.akamai.steamstatic.com/steam/apps/256926430/movie480_vp9.webm" type="video/mp4"></source>
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          </div>
          <h2 > Teaser de larcin Lazer </h2>

        </div>


        <p>Dans le jeu original, les niveaux sont crée manuellement et que la vitesse d'execution n'importe pas. <br></br>
          Larcin Challenge vous propose de comparer votre rapidité et fiabilité de mémorisation avec les autres joueur
          de la comunauté dans des niveau généré quotidiennement.<br></br>
          Trois mods de jeux sont disponible et il faut compter 5 a 6 min pour tout compléter.<br></br>

          <hr></hr>

          <h3>Les challenges :
          </h3>
          <br></br>

          Le but des défis est de passer un maximum de niveau avant le temps imparti. <br></br>
          Les niveau se complexifient a mesure que vous les traversez <br></br>
          <br></br>
          <br></br>



          <div className="list-img-run"  >
            <img src={precisImg} alt='Challenge : Lazer precis'></img> <br></br>
            <div className='list-run'>
              <ul>
                <li>temps de départ : 1 min 30</li>
                <li>électrocution fait perdre 10 secondes au compteur </li>
                <li>finir un niveau fait gagner 2 secondes au compteur </li>
              </ul>
              <Link style={{ paddingLeft: "5rem" }} to="/play#">
                <button className='button'
                > RELEVER LE CHALLENGE </button>
              </Link>
            </div>
          </div>
          <br></br>

          Un défi complet, le joueur doit trouver son équilibre entre vitesse et préparation car les
          erreurs sont pénalisantes. <br></br>

          <hr></hr>








          <div className="list-img-run"  >
            <img src={mortelImg} alt='Challenge : Lazer mortel'></img> <br></br>

            <div className='list-run'>
              <ul>
                <li>temps de départ : 3min</li>
                <li>électrocution fait perdre 10 secondes au compteur </li>
                <li>finir un niveau fait gagner 2 secondes au compteur </li>
              </ul>
              <Link style={{ paddingLeft: "5rem" }} to="/play">
                <button className='button'
                > RELEVER LE CHALLENGE </button>
              </Link>
            </div>
          </div>
          <br></br>

          Pas de précipitation ! Trois erreurs sont synonyme de fin pour Larcin.<br></br>
          la vitesse est secondaire ici, le but est de départager les joueurs au fur et à mesure
          que les tableaux se complexifient <br></br>

          <hr></hr>






          <div className="list-img-run"  >
            <img src={rapideImg} alt='Challenge : Lazer rapide'></img> <br></br>
            <div className='list-run'>
              <ul>
                <li>temps de départ : 30sec</li>
                <li>les lasers disparaissent automatiquement en une petite seconde</li>
                <li> +1 sec si le niveau est réussi du premier coup </li>
                <li>les tableaux commenceront facile et la difficulté à une faible croissance.</li>
              </ul>
              <Link style={{ paddingLeft: "5rem" }} to="/play">
                <button className='button'
                > RELEVER LE CHALLENGE </button>
              </Link>
            </div>
          </div>
          <br></br>
          Même sans bouger, les lasers disparaissent au bout d’une petite seconde.<br></br> La mort est peu pénalisante et vous permet de consulter à nouveaux les lasers pendant 1 secondes.<br></br>
          Les niveaux sont simples et s’enchaîne vite : mode dédié pour les amateurs de speedrun et les mémoires flashs.
          <br></br>
          <hr></hr>
        </p>
      </div>

    </div>
  </>

  )
}

export default Home;
