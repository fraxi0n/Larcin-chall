import './../style/classStyle.css';
import './../style/balise.css';

import { Link } from 'react-router-dom';

import Navbar from './Navbar';

const Header = () => {

    return (
        <header>
            <Link to="/" style={{ color: "black" }} aria-label="page d'accueil" >
                <h1>LARCIN CHALLENGE</h1>
            </Link>
            <Navbar></Navbar>
        </header>
    );
};

export default Header;