import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import './CountryAnalysis.css'
import SingleSelect from '../../Components/Imports/SingleSelect';
import { csv } from 'd3';
import MenuItem from '@material-ui/core/MenuItem';

import gdppcCsv from '../../Data/gdppc.csv'
import hdiCsv from '../../Data/hdi.csv'
import populationCsv from '../../Data/population.csv'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';


export default function CounryAnalysis() {
    
    const firstUpdate = useRef(true);
    const yearOptions = ['1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018']
    const countryOptions = ['Angola', 'Argentina', 'Australia', 'Austria', 'Belgium', 'Bolivia', 'Brazil', 'Canada', 'Chile', 'China', 'Colombia', 'Denmark', 'Ethiopia', 'Finland', 'France', 'Germany', 'Ghana', 'Greece', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Luxembourg', 'Madagascar', 'Malaysia', 'Mexico', 'Morocco', 'Myanmar', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Pakistan', 'Poland', 'Portugal', 'Russian Federation', 'Saudi Arabia', 'Senegal', 'South Africa', 'Spain', 'Sweden', 'Switzerland', 'Thailand', 'Tunisia', 'Turkey', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay']

    const [populationData, setPopulationData] = useState([])
    const [hdiData, setHdiData] = useState([])
    const [gdpPcData, setGdpPcData] = useState([])

    const [selectedCountry, setSelectedCountry] = useState('Brazil')
    const [selectedYear, setSelectedYear] = useState('2008')
    const [population, setPopulation] = useState('10')
    const [hdi, setHdi] = useState(1)
    const [gdppc, setGdppc] = useState('10350')

    function onYearChange(e) {
        setSelectedYear(e.target.value)
    }
    function onCountryChange(e) {
        setSelectedCountry(e.target.value)
    }

    useEffect(() => {
        // csv(gdppcCsv).then(csvData => {
        //     setGdpPcData(csvData)
        // });
        // csv(hdiCsv).then(csvData => {
        //     setHdiData(csvData)
        // });
        csv(populationCsv).then(csvData => {
            setPopulationData(csvData)
        });
    })

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false
            return;
        } else {
            var index = countryOptions.indexOf(selectedCountry)
            setPopulation(populationData[index][selectedYear])
            console.log(populationData[index])
        }
    }, [selectedCountry, selectedYear])

    return (
        <div className='ca_page'>
            <div className="ca_header">
                <div className="ca_country_title bg_shadow">
                    <SingleSelect
                        handleChange={(e) => onCountryChange(e)} 
                        label='Country'
                        width='220px'
                        value={selectedCountry}
                        options={countryOptions.map((country) => (
                            <MenuItem key={country} value={country}>
                                {country}
                            </MenuItem>
                        ))}
                    />
                </div>
                <div className="ca_header_options bg_shadow">
                    <SingleSelect
                        handleChange={(e) => onYearChange(e)} 
                        label='Year'
                        value={selectedYear}
                        options={yearOptions.map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    />
                    <div className="ca_header_year">
                        {selectedYear}
                    </div>
                </div>
            </div>

            <div className="ca_cards">
                <div className="ca_first ca_wrap_card">
                    <div className="ca_card_background bg_shadow">
                        <div className="card_background_top">
                            <div className="card_backgound_top_title">
                                Population
                            </div>
                            <div className="card_backgound_top_body">
                                {(population/1000000).toFixed(2)} M
                            </div>
                        </div>
                        <div className="card_background_body">
                            asdasd
                        </div>
                    </div>
                    <div className="first_front ca_card_front front_shadow">
                        <AccountCircleIcon fontSize='inherit' />
                    </div>
                </div>

                <div className="ca_second ca_wrap_card">
                    <div className="ca_card_background bg_shadow">
                        <div className="card_background_top">
                            <div className="card_backgound_top_title">
                                HDI
                            </div>
                            <div className="card_backgound_top_body">
                                {/* {hdi} */}
                                1
                            </div>
                        </div>
                        <div className="card_background_body">
                            {hdi > 0.74 ?
                            'Above the selected group average of 0.74':
                            'Below the selected group average of 0.74'}
                        </div>
                    </div>
                    <div className="second_front ca_card_front front_shadow">
                        {hdi > 0.74 ?
                        <InsertEmoticonIcon fontSize='inherit' /> :
                        <SentimentVeryDissatisfiedIcon fontSize='inherit' />}
                    </div>
                </div>

                <div className="ca_third ca_wrap_card">
                    <div className="ca_card_background bg_shadow">
                        <div className="card_background_top">
                            <div className="card_backgound_top_title">
                                GDP per capita
                            </div>
                            <div className="card_backgound_top_body">
                                {/* $ {gdppc.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} */}
                                10,234
                            </div>
                        </div>
                        <div className="card_background_body">
                            asdasd
                        </div>
                    </div>
                    <div className="third_front ca_card_front front_shadow">
                        <AttachMoneyIcon fontSize='inherit' />
                    </div>
                </div>
            </div>

            <div className="ca_charts">
                <div className="ca_first_chart_wrap">
                    <div className="first_chart_background bg_shadow">

                    </div>
                    <div className="ca_first_chart front_shadow">

                    </div>
                </div>
                <div className="ca_second_chart_wrap">
                    <div className="second_chart_bacgorund bg_shadow">

                    </div>
                    <div className="ca_second_chart front_shadow">
                        
                    </div>

                </div>
            </div>

        </div>
    )
}