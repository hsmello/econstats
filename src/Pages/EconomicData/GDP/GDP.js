import React, { useState, useLayoutEffect, useRef } from 'react';
import './GDP.css'
import DataFetch from '../../../Components/DataFetch/DataFetch';
import { useEffect } from 'react';
import gdpCsv from '../../../Data/gdp.csv'
import { csv } from 'd3';

import MyMultipleSelect from '../../../Components/Imports/MultipleSelect';
import SingleSelect from '../../../Components/Imports/SingleSelect';
import MenuItem from '@material-ui/core/MenuItem';

import '../../../../node_modules/react-vis/dist/style.css';
import { XAxis, YAxis, XYPlot, VerticalBarSeries } from 'react-vis';

export default function GDP() {
    // Life EXP SP.DYN.LE00.IN
    // Pop SP.POP.TOTL
    // GDP pc NY.GDP.PCAP.KD
    const yearOptions = ["1960", "1961", "1962", "1963", "1964", "1965", "1966", "1967", "1968", "1969", "1970", "1971", "1972", "1973", "1974", "1975", "1976", "1977", "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"]
    const countryOptions = ['Arab World', 'Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'China', 'Euro area', 'European Union', 'France', 'Germany', 'India', 'Indonesia', 'Italy', 'Japan', 'Korea, Rep.', 'Mexico', 'Netherlands', 'Nigeria', 'Norway', 'Poland', 'Russian Federation', 'Saudi Arabia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'United Kingdom', 'United States']
    // const countryOptions = ['Aruba', 'Afghanistan', 'Angola', 'Albania', 'Andorra', 'Arab World', 'United Arab Emirates', 'Argentina', 'Armenia', 'American Samoa', 'Antigua and Barbuda', 'Australia', 'Austria', 'Azerbaijan', 'Burundi', 'Belgium', 'Benin', 'Burkina Faso', 'Bangladesh', 'Bulgaria', 'Bahrain', 'Bahamas, The', 'Bosnia and Herzegovina', 'Belarus', 'Belize', 'Bermuda', 'Bolivia', 'Brazil', 'Barbados', 'Brunei Darussalam', 'Bhutan', 'Botswana', 'Central African Republic', 'Canada', 'Central Europe and the Baltics', 'Switzerland', 'Channel Islands', 'Chile', 'China', "Cote d'Ivoire", 'Cameroon', 'Congo, Dem. Rep.', 'Congo, Rep.', 'Colombia', 'Comoros', 'Cabo Verde', 'Costa Rica', 'Caribbean small states', 'Cuba', 'Curacao', 'Cayman Islands', 'Cyprus', 'Czech Republic', 'Germany', 'Djibouti', 'Dominica', 'Denmark', 'Dominican Republic', 'Algeria', 'East Asia & Pacific (excluding high income)', 'Early-demographic dividend', 'East Asia & Pacific', 'Europe & Central Asia (excluding high income)', 'Europe & Central Asia', 'Ecuador', 'Egypt, Arab Rep.', 'Euro area', 'Eritrea', 'Spain', 'Estonia', 'Ethiopia', 'European Union', 'Fragile and conflict affected situations', 'Finland', 'Fiji', 'France', 'Faroe Islands', 'Micronesia, Fed. Sts.', 'Gabon', 'United Kingdom', 'Georgia', 'Ghana', 'Gibraltar', 'Guinea', 'Gambia, The', 'Guinea-Bissau', 'Equatorial Guinea', 'Greece', 'Grenada', 'Greenland', 'Guatemala', 'Guam', 'Guyana', 'High income', 'Hong Kong SAR, China', 'Honduras', 'Heavily indebted poor countries (HIPC)', 'Croatia', 'Haiti', 'Hungary', 'IBRD only', 'IDA & IBRD total', 'IDA total', 'IDA blend', 'Indonesia', 'IDA only', 'Isle of Man', 'India', 'Not classified', 'Ireland', 'Iran, Islamic Rep.', 'Iraq', 'Iceland', 'Israel', 'Italy', 'Jamaica', 'Jordan', 'Japan', 'Kazakhstan', 'Kenya', 'Kyrgyz Republic', 'Cambodia', 'Kiribati', 'St. Kitts and Nevis', 'Korea, Rep.', 'Kuwait', 'Latin America & Caribbean (excluding high income)', 'Lao PDR', 'Lebanon', 'Liberia', 'Libya', 'St. Lucia', 'Latin America & Caribbean', 'Least developed countries: UN classification', 'Low income', 'Liechtenstein', 'Sri Lanka', 'Lower middle income', 'Low & middle income', 'Lesotho', 'Late-demographic dividend', 'Lithuania', 'Luxembourg', 'Latvia', 'Macao SAR, China', 'St. Martin (French part)', 'Morocco', 'Monaco', 'Moldova', 'Madagascar', 'Maldives', 'Middle East & North Africa', 'Mexico', 'Marshall Islands', 'Middle income', 'North Macedonia', 'Mali', 'Malta', 'Myanmar', 'Middle East & North Africa (excluding high income)', 'Montenegro', 'Mongolia', 'Northern Mariana Islands', 'Mozambique', 'Mauritania', 'Mauritius', 'Malawi', 'Malaysia', 'North America', 'Namibia', 'New Caledonia', 'Niger', 'Nigeria', 'Nicaragua', 'Netherlands', 'Norway', 'Nepal', 'Nauru', 'New Zealand', 'OECD members', 'Oman', 'Other small states', 'Pakistan', 'Panama', 'Peru', 'Philippines', 'Palau', 'Papua New Guinea', 'Poland', 'Pre-demographic dividend', 'Puerto Rico', 'Korea, Dem. People’s Rep.', 'Portugal', 'Paraguay', 'West Bank and Gaza', 'Pacific island small states', 'Post-demographic dividend', 'French Polynesia', 'Qatar', 'Romania', 'Russian Federation', 'Rwanda', 'South Asia', 'Saudi Arabia', 'Sudan', 'Senegal', 'Singapore', 'Solomon Islands', 'Sierra Leone', 'El Salvador', 'San Marino', 'Somalia', 'Serbia', 'Sub-Saharan Africa (excluding high income)', 'South Sudan', 'Sub-Saharan Africa', 'Small states', 'Sao Tome and Principe', 'Suriname', 'Slovak Republic', 'Slovenia', 'Sweden', 'Eswatini', 'Sint Maarten (Dutch part)', 'Seychelles', 'Syrian Arab Republic', 'Turks and Caicos Islands', 'Chad', 'East Asia & Pacific (IDA & IBRD countries)', 'Europe & Central Asia (IDA & IBRD countries)', 'Togo', 'Thailand', 'Tajikistan', 'Turkmenistan', 'Latin America & the Caribbean (IDA & IBRD countries)', 'Timor-Leste', 'Middle East & North Africa (IDA & IBRD countries)', 'Tonga', 'South Asia (IDA & IBRD)', 'Sub-Saharan Africa (IDA & IBRD countries)', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Tuvalu', 'Tanzania', 'Uganda', 'Ukraine', 'Upper middle income', 'Uruguay', 'United States', 'Uzbekistan', 'St. Vincent and the Grenadines', 'Venezuela, RB', 'British Virgin Islands', 'Virgin Islands (U.S.)', 'Vietnam', 'Vanuatu', 'World', 'Samoa', 'Kosovo', 'Yemen, Rep.', 'South Africa', 'Zambia', 'Zimbabwe']

    const firstUpdate = useRef(true);
    const [rawData, setRawData] = useState([])
    const [chartData, setChartData] = useState([])

    const [selectedYear, setSelectedYear] = useState('2010')
    const [selectedCountries, setSelectedCountries] = useState([])

    useEffect(() => {
        csv(gdpCsv).then(csvData => {
            setRawData(csvData)
        });
    })

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false
            return;
        } else {
            chartData.splice(0, chartData.length)
            for (var i = 0; i < rawData.length; i++) {
                if (selectedCountries.includes(rawData[i].CountryName)) {
                    if (!(rawData[i].CountryName in chartData)) {
                        var newCountryKeyValue = Object.create(null)
                        newCountryKeyValue.x = rawData[i].CountryName
                        newCountryKeyValue.y = rawData[i][selectedYear] / 1000000000

                        chartData.push(newCountryKeyValue);

                        setChartData([...chartData])
                    }
                }
                if (!selectedCountries.includes(rawData[i].CountryName) && (rawData[i].CountryName in chartData)) {
                    delete chartData[rawData[i].CountryName]
                }
            }
            console.log(chartData)
        }

    }, [selectedCountries, selectedYear])

    function onYearChange(e) {
        setSelectedYear(e.target.value)
        setChartData([...chartData])
    }

    function onCountryChange(e) {
        setSelectedCountries(e.target.value)
    }

    return (
        <div className="">
            <div className="gdp_page_title">
                GDP in USD Billion
            </div>
            <div className="gpdControls">

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
                <MyMultipleSelect
                    handleChange={(e) => onCountryChange(e)}
                    value={selectedCountries}
                    label="Countries"
                    options={countryOptions.map((name) => (
                        <MenuItem key={name} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                />

            </div>

            <div className="gdp_chart">
                <XYPlot
                    height={300}
                    width={1000}
                    xType='ordinal'
                >
                    <VerticalBarSeries data={chartData} />
                    <XAxis />
                    <YAxis
                        title='USD Billions'
                    />
                </XYPlot>

            </div>

        </div>
    )
}