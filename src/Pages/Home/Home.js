import React from 'react';
import './Home.css'

import { Link } from 'react-router-dom';

export default function Home() {

    return (
        <div className="home_page">
            WELCOME!
            <br/>
            The Home Page is still in development. 
            <br />
            Click <Link to='/country_analysis'>here</Link> to see the first dashboard.
        </div>
    )
}
