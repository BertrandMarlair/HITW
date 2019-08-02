import React from 'react'
import { withStyles } from '@material-ui/core'
import ChartStyle from './ChartStyle'
import Chart from 'react-apexcharts'

class BarChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    stacked: true,
                    stackType: '100%'
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    },
                },
                stroke: {
                    width: 1,
                    colors: ['#fff']
                },
                title: {
                    text: '100% Stacked Bar'
                },
                xaxis: {
                    categories: ["sex"],
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val + "K"
                        }
                    }
                },
                fill: {
                    opacity: 1
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left',
                    offsetX: 40
                }
            },
        }
    }

    render() {
        return (
            <div>
                <div id="chart">
                    <Chart options={this.state.options} series={[{name: 'Male',data: [this.props.male]}, {name: 'Female',data: [this.props.female]}, {name: 'Orther',data: [this.props.orther]}]} type="bar" height="200" />
                </div>
                {this.props.fullscreen && (
                    <div>
                        orther things
                    </div>
                )}
            </div>
        );
    }
}
export default withStyles(ChartStyle, { withTheme: true })(BarChart)