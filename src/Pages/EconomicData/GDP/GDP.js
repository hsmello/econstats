import React, { useState, useEffect, useRef } from 'react';
import './GDP.css'
import axios from 'axios';

export default function GDP() {
    // Life EXP SP.DYN.LE00.IN
    // Pop SP.POP.TOTL
    // GDP pc NY.GDP.PCAP.KD

    useEffect(() => {

        async function getAPIData() {
            try {
                const response = await axios.get('http://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?format=json');
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        getAPIData();

    }, [])

    return (
        <div className="gdp_page">
            In development
        </div>
    )
}