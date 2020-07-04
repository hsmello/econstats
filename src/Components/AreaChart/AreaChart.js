import React from 'react';
import Highcharts, { chart, ColorAxis } from 'highcharts';
import HighchartReact from 'highcharts-react-official';
import drilldown from 'highcharts/modules/drilldown'

export default function AreaChart(props) {
    drilldown(Highcharts)

    const options: Highcharts.Options = {
        title: {
            text: props.title
        },
        series: [{
            type: props.type,
            data: props.data,
            color: props.color,
            lineColor: 'white',
            fillOpacity: '0.3'
        }],
        xAxis: {
            categories: props.xAxis,
            lineColor: 'white'
        },
        chart: {
            height: props.height,
            width: props.width,
            backgroundColor: 'transparent'
        },
        colorAxis: {
            maxColor: 'white',
            gridLineColor: 'black',
        },
        legend: false


    };

    return (
        <div id="container">
            <HighchartReact
                highcharts={Highcharts}
                options={options}
                {...props}
            />
        </div>
    )
}