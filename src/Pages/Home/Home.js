import React from 'react';
import './Home.css'

import Chart from '../../Components/AreaChart/AreaChart'
import { interpolateRgbBasis } from 'd3';

export default function About() {
    
    const options = {
        series: [{
            type: 'bar',
            data: [10, 30, 40]
        }]
    }

    const data = [10, 30, 25]
    const xAxis = ['2000', '2001', '2002']
    
    return (
        <div className="">
            Home
            <Chart 
                data={data}
                xAxis={xAxis}
                color='white'
                title='my title'
                type='area'
                height='400px'    
            />
        </div>
    )
}