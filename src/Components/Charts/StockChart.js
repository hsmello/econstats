import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import drilldown from 'highcharts/modules/drilldown'

export default function MyStockChart(props) {
    drilldown(Highcharts)
    const options = {
        title: {
            text: props.title
        },
        series: [{
            type: 'area',
            data: props.data,
            pointStart: Date.UTC(2018, 0, 1),
            pointInterval: 24 * 36e5
        }],
        xAxis: {
            type: 'datetime',
            labels: {
                format: '{value:%Y-%m-%d}',
                rotation: 45,
                align: 'left'
            },
            lineColor: 'white'
        },
    }

    return (
        <div className="container">
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'stockChart'}
                options={options}
            />
        </div>
    );
};
