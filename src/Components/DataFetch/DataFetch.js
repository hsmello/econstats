import React, { useState } from 'react';
import { csv } from 'd3';
import { useEffect } from 'react';

import gdpcsv from '../../Data/gdp.csv'

const DataFetch = () => {

    const [data, setData] = useState([])
    
    useEffect(() => {
        csv(gdpcsv).then(thisData => {
            console.log(thisData)
        });
    });
    
    return (data);
} 

export default DataFetch;