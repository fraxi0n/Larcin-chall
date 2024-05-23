import '../../style/balise.css';
import '../../style/home.css';

import precisImg from '../../asset/precis.png';
import mortelImg from '../../asset/mortel.png';
import rapideImg from '../../asset/rapide.png';

import larcinImg from '../../asset/larcin.png';
import planteImg from '../../asset/plante.png';
import porteImg from '../../asset/porte.png';
import lazerImg from '../../asset/laser.png';

import Header from '../Header';
import Footer from '../Footer';
import DynamicHR from '../DynamicHR';

const Home = () => {
  return (<>
    <div className="app">
      <Header></Header>
      <main style={{ padding: " 0 2rem " }}>
        <div> Chaque jour, jouez vous de la nouvelle sécurité et imposez vous comme le cambrioleur ultime</div>

        <section aria-label='Description du jeu Larcin Lazer original'>
          <h2>  Larcin Lazer, qu'est ce que c'est? </h2>
          <p> Il s'agit d'un jeu au concept original crée en Game Jam par
          Géraud Zuchini, <strong>alias doc Géraud</strong>.<br></br>
          Il est sortie en version finale et commerciale en début d'année 2023 sur steam, itch io et en version mobile sur android.<br></br>
          Dans ce jeu vous incarnez un cambrioleur, qui n'ayant plus de quoi nourir son chat est contraint
          d'aller voler de riches capitalistes.
          </p>
          <div style={{ maxWidth: "854px" }}>
            <figure >
              <div className='video-container'>
                <video controls autoPlay muted >
                  <source src="https://cdn.akamai.steamstatic.com/steam/apps/256926430/movie480_vp9.webm" type="video/mp4"></source>
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              </div>
              <figcaption className='teaser-legend' >Teaser de Larcin Lazer</figcaption>
            </figure>
          </div>
        </section>

        <section aria-label='Description de l adaptation du jeu sur le site'>
          <h2>Quelles nouveautés dans Larcin Challenges ?</h2>

          <p>
          
            Dans le jeu original, les niveaux sont crée manuellement et la vitesse d'execution n'importe pas. <br></br>
            Grace a la génération procédurale des niveaux, Larcin Challenges vous propose de comparer votre rapidité et fiabilité de mémorisation avec les autres joueur
            de la comunauté dans de nouveaux niveaux quotidiennement.<br></br>
            En outre, Larcin Challenges ne comporte que le la base des niveaux de Larcin Challenges, 
            des salle remplie de laser avec une sortie, sans la richesse des mécanisme, piège et créature du jeu original.
            <br></br>
            Pour comparer les aptitudes des voleurs du monde entier, 3 modes de jeux ont été inventé chaqu'un favorisant certain profils <strong> ce sont les  
            3 challenges : précis, mortel et rapide </strong> <br></br>
            </p>
        </section>

        <section aria-label='description et navigation vers les challenges'>
          <div className='challenge-box'>
            <img className='lazer-hr' src={lazerImg} alt='lazer deco' aria-describedby='desc-precis'></img>
            <img className='lazer-hr'src={lazerImg} alt='lazer deco' aria-describedby='desc-precis'></img>
            <img className='lazer-hr'src={lazerImg} alt='lazer deco' aria-describedby='desc-precis'></img>
            <h2>Les trois challenges : </h2>
            <p>Dans chacun des challenges, vous devez passer un maximum de tableaux avant le temps imparti. <br></br>
            Les niveau se complexifient à mesure que vous les traversez 
            </p>
          </div>
          <br></br>

          <DynamicHR img={larcinImg}>
            <div className="list-img-run blue" >
              <img src={precisImg} alt='Challenge : Lazer precis' aria-describedby='desc-precis'></img> <br></br>
              <div className='list-run'>
                <ul id='desc-precis'>
                  <li>temps de départ : 1 min 30</li>
                  <li>électrocution fait perdre 10 secondes au compteur </li>
                  <li>finir un niveau fait gagner 2 secondes au compteur </li>
                </ul>
                <button className='button button-lazer'
                aria-label='jouer au mode Lazer précis'
                onClick={() => { window.location.href = "/play#"; }}
                > RELEVER LE CHALLENGE </button>
              </div>
            </div>
            <p className='text-center'>Un défi complet, le joueur doit trouver son équilibre entre vitesse et préparation car les
            erreurs sont pénalisantes.
            </p>
          </DynamicHR>
          <br></br>
          <DynamicHR img={porteImg}>
            <div className="list-img-run red"  >
              <img src={mortelImg} alt='Challenge : Lazer mortel' aria-describedby='desc-mortel'></img> <br></br>
              <div className='list-run'>
                <ul id='desc-mortel'>
                  <li>temps de départ : 3min</li>
                  <li>électrocution fait perdre 10 secondes au compteur </li>
                  <li>finir un niveau fait gagner 2 secondes au compteur </li>
                </ul>
                <button className='button button-lazer'
                onClick={() => { window.location.href = "/play#"; }}
                aria-label='jouer au mode Lazer mortel'
                > RELEVER LE CHALLENGE </button>
              </div>
            </div>
            <p className='text-center'>Pas de précipitation ! Trois erreurs sont synonyme de fin pour Larcin.<br></br>
            la vitesse est secondaire ici, le but est de départager les joueurs au fur et à mesure
            que les tableaux se complexifient
            </p>
          </DynamicHR>
          <br></br>
          <DynamicHR img={planteImg}>
            <div className="list-img-run green"  >
              <img src={rapideImg} alt='Challenge : Lazer rapide' aria-describedby='desc-rapide' ></img> <br></br>
              <div className='list-run'>
                <ul id='desc-rapide'>
                  <li>temps de départ : 30sec</li>
                  <li>les lasers disparaissent automatiquement en une petite seconde</li>
                  <li> +1 sec si le niveau est réussi du premier coup </li>
                  <li>les tableaux commenceront facile et la difficulté à une faible croissance.</li>
                </ul>
                <button className='button button-lazer'
                onClick={() => { window.location.href = "/play#"; }}
                aria-label='jouer au mode Lazer rapide'
                > RELEVER LE CHALLENGE </button>
              </div>
            </div>
            <p className='text-center'>Même sans bouger, les lasers disparaissent au bout d’une petite seconde.<br></br>
            La mort est peu pénalisante et vous permet de consulter à nouveaux les lasers pendant 1 secondes.<br></br>
            Les niveaux sont simples et s’enchaîne vite : mode dédié pour les amateurs de speedrun et les mémoires flashs.
            </p>
          </DynamicHR>
          <br></br>
        </section>
      </main>
      <Footer></Footer>
    </div >
  </>
  )
}

export default Home;
