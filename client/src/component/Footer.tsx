
import './../style/balise.css';
import './../style/classStyle.css';




const Footer = () => {

    return (
        <div style={{ margin: "0" }} >


            <div className='footer-bandeau'></div>


            <footer>
                <div className='footer-content'>
                    <div className='footer-container' >
                        {/* <div style={{ display: "flex", alignContent: "flex-end" }} > */}
                        <div>
                            Créateur : <h2> françois BRIAS  </h2>
                        </div>
                        <div>
                            site internet : <a href="francois-brias.xyz"> francois-brias.xyz </a> <br></br>
                            prototype : <a href="https://half-squid.itch.io/larcin-lazer-challenges"> larcin-lazer-challenges </a>
                        </div>
                    </div>
                    <div className='footer-container' >
                        <div>
                            concept original: <h2> Géraud Zuchini (@DrGeraud) </h2>
                        </div>

                        <div>
                            studio : <a href="https://tambouillestudio.com/"> tambouille studio </a>
                        </div>

                    </div>

                </div>
            </footer>


        </div>
    );
};

export default Footer;
