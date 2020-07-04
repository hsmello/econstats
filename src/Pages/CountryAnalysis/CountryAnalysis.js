import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import './CountryAnalysis.css'
import SingleSelect from '../../Components/Imports/SingleSelect';
import { csv } from 'd3';
import MenuItem from '@material-ui/core/MenuItem';

import Chart from '../../Components/AreaChart/AreaChart'
import countryAnalysisCsv from '../../Data/countryanalysis.csv'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';


export default function CounryAnalysis() {

    const firstUpdate = useRef(true);
    const yearOptions = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018']
    const countryOptions = ['Angola', 'Argentina', 'Australia', 'Austria', 'Belgium', 'Bolivia', 'Brazil', 'Canada', 'Chile', 'China', 'Colombia', 'Denmark', 'Ethiopia', 'Finland', 'France', 'Germany', 'Ghana', 'Greece', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Luxembourg', 'Madagascar', 'Malaysia', 'Mexico', 'Morocco', 'Myanmar', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Pakistan', 'Poland', 'Portugal', 'Russian Federation', 'Saudi Arabia', 'Senegal', 'South Africa', 'Spain', 'Sweden', 'Switzerland', 'Thailand', 'Tunisia', 'Turkey', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay']
    const firstChartOptions = ['GPD per capita', 'HDI', 'Population']

    const [rawData, setRawData] = useState([])
    const [firstChartData, setFirstChartData] = useState([])

    const [selectedCountry, setSelectedCountry] = useState(countryOptions[Math.floor(Math.random() * countryOptions.length)])
    const [selectedYear, setSelectedYear] = useState(yearOptions[Math.floor(Math.random() * yearOptions.length)])
    const [population, setPopulation] = useState()
    const [hdi, setHdi] = useState()
    const [gdppc, setGdppc] = useState('0')
    const [firstChartOption, setFirstChartOption] = useState(firstChartOptions[Math.floor(Math.random() * firstChartOptions.length)])

    function onYearChange(e) {
        setSelectedYear(e.target.value)
    }
    function onCountryChange(e) {
        setSelectedCountry(e.target.value)
    }
    function onFirstChartChange(e) {
        setFirstChartOption(e.target.value)
    }

    useEffect(() => {
        async function csvRead() {
            let dataRead = await csv(countryAnalysisCsv)
            setRawData(dataRead)
        }
        csvRead();
    }, [1])

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false
            return;
        } else {
            firstChartData.splice(0, firstChartData.length)
            for (var i = 0; i < rawData.length; i++) {
                if (rawData[i].Country === selectedCountry) {
                    if (rawData[i].Index === 'gdppc') {
                        setGdppc(rawData[i][selectedYear])
                    }
                    if (rawData[i].Index === 'population') {
                        setPopulation(rawData[i][selectedYear])
                    }
                    if (rawData[i].Index === 'hdi') {
                        setHdi(rawData[i][selectedYear])
                    }

                    for (var year = 2000; year < 2019; year++) {
                        if (rawData[i].Index === 'gdppc' && firstChartOption === 'GPD per capita') {
                            firstChartData.push(Number(rawData[i][year]))
                        }
                        if (rawData[i].Index === 'population' && firstChartOption === 'Population') {
                            firstChartData.push(Number(rawData[i][year]))
                            console.log('ssdasdas')
                        }
                        if (rawData[i].Index === 'hdi' && firstChartOption === 'HDI') {
                            firstChartData.push(Number(rawData[i][year]))
                        }
                        setFirstChartData([...firstChartData])
                    }
                }
            }
        }
    }, [rawData, selectedCountry, selectedYear, firstChartOption])

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
                                {population} M
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
                                {hdi}
                            </div>
                        </div>
                        <div className="card_background_body">
                            {hdi > 0.74 ?
                                'Above' :
                                'Below'} this group's all time average (0.74)
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
                                {/* $ {formatNumber(gdppc)} */}
                                $ {gdppc.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
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

            {/* CHARTS  */}

            <div className="ca_charts">
                <div className="ca_first_chart_wrap">
                    <div className="first_chart_background bg_shadow">
                        <div className="first_chart_background_body">

                            <SingleSelect
                                handleChange={(e) => onFirstChartChange(e)}
                                label='Options'
                                width='200px'
                                value={firstChartOption}
                                options={firstChartOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            />
                        </div>
                    </div>
                    <div className="ca_first_chart front_shadow">
                                        
                        <Chart 
                            data={firstChartData}
                            xAxis={yearOptions}
                            height='295px'
                            type='area'
                            color='white'
                        />

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