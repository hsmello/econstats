import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './EuroExchangeRate.css';
import numeral from 'numeral';
import Chart from '../../../Components/Charts/StockChart';

export default function EuroExchangeRate() {

    const [date, setDate] = useState();
    const [latestRatesKey, setLatestRatesKey] = useState([])
    const [latestRatesValue, setLatestRatesValue] = useState([])
    const [historicalChart, setHistoricalChart] = useState([])
    const [xAxisValue, setXAxisValue] = useState([]);

    useEffect(() => {
        async function getAPIData() {
            try {
                const response = await axios.get('https://api.exchangeratesapi.io/latest');
                setDate(response.data.date)
                setLatestRatesKey(Object.keys(response.data.rates))
                setLatestRatesValue(Object.values(response.data.rates))
            } catch (error) {
                console.log(error)
            }
        }
        getAPIData();
    }, [])

    useEffect(() => {

        async function getAPIChartData() {
            try {
                const response = await axios.get('https://api.exchangeratesapi.io/history?start_at=2017-01-01&end_at=2020-06-01&symbols=BRL');
                let dataSize = Object.keys(response.data.rates).length

                console.log(dataSize)

                //Create the dates array
                // for (var i = 0; i < dataSize; i++) {
                //     xAxisValue.push(Object.keys(response.data.rates)[i])
                //     setXAxisValue(...xAxisValue)
                // }

                for (var i = 0; i < dataSize; i++) {
                    let date = Object.keys(response.data.rates)[i]

                    historicalChart.push(response.data.rates[date].BRL)
                    setHistoricalChart(...historicalChart)
                }

                console.log(historicalChart)

            } catch (error) {
                console.log(error)
            }
        }
        getAPIChartData();
    }, [])




    return (
        <div className="eer_page">
            <div className="development">
                In development. <br /> Latest values.
            </div>
            <div className="eer_page_title">
                EURO exchange rate as of {date}
            </div>

            <div className="eer_rates bg_common bg_shadow">

                {latestRatesValue ?
                    latestRatesKey.map((value, index) => {
                        return (
                            <div className='rate-container'>
                                <div className='pair-key' >
                                    {value}
                                </div>
                                <div className='pair-value' >
                                    {numeral(latestRatesValue[index]).format('0,0.00[0000]')}
                                </div>
                            </div>
                        )
                    })
                    : ''}

            </div>




            {historicalChart ?
                ''
                : ''}

        </div>
    )
}