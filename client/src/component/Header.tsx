import React from 'react';

import './../style/classStyle.css';
import './../style/balise.css';

import { Link } from 'react-router-dom';

import Navbar from './Navbar';

const Header = () => {

    return (
        <header>


            <Link to="/" className='unvisited' style={{ color: "black" }}>


                <h1>LARCIN CHALLENGE</h1>
            </Link>
            <Navbar></Navbar>

        </header>

    );
};

export default Header;
