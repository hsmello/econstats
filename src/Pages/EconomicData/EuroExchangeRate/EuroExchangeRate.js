import React, { useState, useRef, useEffect } from 'react';
import './EuroExchangeRate.css';
import LoadingCircular from '../../../Components/Imports/Loading'
import SingleSelect from '../../../Components/Imports/SingleSelect'
import Chart from '../../../Components/Charts/StockChart';

import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import numeral from 'numeral';

export default function EuroExchangeRate() {

    const [isLoading, setIsLoading] = useState(false)
    const [date, setDate] = useState();
    const [latestRatesKey, setLatestRatesKey] = useState([])
    const [latestRatesValue, setLatestRatesValue] = useState([])
    const [historicalChart, setHistoricalChart] = useState([])
    const [xAxisValue, setXAxisValue] = useState([]);
    const [dateUTC, setDateUTC] = useState([]);
    const [chartCurrency, setChartCurrency] = useState('BRL')

    const currencyOptions = ['BRL', 'CAD', 'USD']

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
                const response = await axios.get('https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=2020-07-01&symbols=' + chartCurrency);
                let dataSize = Object.keys(response.data.rates).length
                console.log(response.data.rates)
                console.log(dataSize)

                // Create the dates array
                for (var i = 0; i < dataSize; i++) {
                    let newDate = new Date(Object.keys(response.data.rates)[i]),
                        newDateUTC = Date.UTC(newDate.getYear() + 1900, newDate.getMonth() + 1, newDate.getDate())

                    xAxisValue.push(newDate)

                    let newDataUTCOrder = dateUTC.sort((a, b) => a - b)

                    dateUTC.push(newDateUTC)
                    setDateUTC([...newDataUTCOrder])

                    let newAxisValue = xAxisValue.sort((a, b) => a - b)

                    // console.log(newAxisValue)
                    setXAxisValue([...newAxisValue])
                }
                console.log(dateUTC)

                for (var i = 0; i < dataSize; i++) {
                    // let date = Object.keys(response.data.rates)[i]
                    let completeDate = xAxisValue[i],
                        realMonth = completeDate.getMonth() + 1,
                        month = realMonth < 9 ? '0' + realMonth : realMonth,
                        date = completeDate.getDate() < 10 ? '0' + completeDate.getDate() : completeDate.getDate(),
                        year = completeDate.getYear() + 1900

                    // console.log(month, date, year)
                    let finalDate = `${year}-${month}-${date}`
                    // console.log(finalDate)
                    historicalChart.push(response.data.rates[finalDate][chartCurrency])
                }

                setHistoricalChart([...historicalChart])
                console.log(historicalChart)

            } catch (error) {
                console.log(error)
            }
            setIsLoading(false)
        }
        getAPIChartData();
    }, [chartCurrency])

    function onCurrencyChange(e) {
        setChartCurrency(e.target.value)
        setHistoricalChart([])
        setIsLoading(true)
    }

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
                            <div key={index} className='rate-container'>
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
            <div >
                <SingleSelect
                    handleChange={(e) => onCurrencyChange(e)}
                    label='Currency'
                    width='220px'
                    value={chartCurrency}
                    options={currencyOptions.map((currency) => (
                        <MenuItem key={currency} value={currency}>
                            {currency}
                        </MenuItem>
                    ))}
                />
                {isLoading ? 
                    'Loading API data'
                : '' 
                }
                {historicalChart ?
                    <Chart
                        data={historicalChart}
                        // data={Object.values(historicalChart)}
                        xAxis={dateUTC}
                        // width='500'
                        height='395px'
                        type='area'
                        color='white'
                    />
                    : ''}
            </div>

        </div>
    )
}