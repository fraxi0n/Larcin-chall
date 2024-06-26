
import './../style/balise.css';
import './../style/classStyle.css';

const Footer = () => {
    
    return (
        <div style={{ margin: "0" }} >
            <div className='footer-bandeau'></div>
            <footer>
                <div className='footer-content'>
                    <div className='footer-container' >
                        <div className='footer-container-2'>
                            Créateur : <strong> François BRIAS  </strong>
                        </div>
                        <div className='footer-container-2'>
                            site internet : <a href="https://francois-brias.xyz"> francois-brias.xyz </a> <br></br>
                            prototype : <a href="https://half-squid.itch.io/larcin-lazer-challenges"> Larcin-Lazer-Challenges </a>
                        </div>
                    </div>
                    <div className='footer-container' >
                        <div className='footer-container-2'>
                            concept original: <strong> Géraud Zuchini (@DrGeraud) </strong>
                        </div>
                        <div className='footer-container-2'>
                            studio : <a href="https://tambouillestudio.com/"> tambouille studio </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
