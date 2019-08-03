import React from 'react'
import { withStyles } from '@material-ui/core'
import ChartStyle from './ChartStyle'
import Chart from 'react-apexcharts'
import CustomLoading from '../../CustomLoading/CustomLoading'

var colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'];

class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                    events: {
                        click: function (chart, w, e) {
                            console.log(chart, w, e)
                        }
                    },
                },
                colors: colors,
                plotOptions: {
                    bar: {
                        columnWidth: '45%',
                        distributed: true
                    }
                },
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    categories: [
                        'gender',
                        'education',
                        'innovation',
                        'digital',
                        'social',
                        'migration',
                        'healthcare',
                    ],
                    labels: {
                        style: {
                            colors: colors,
                            fontSize: '14px'
                        }
                    }
                }
            },
            series: [{
                data: props.usage
            }],
            display: false,
        }
    }

    componentDidMount(){
        setTimeout(()=> {
            this.setState({display: true})
        }, 1000)
    }

    render() {
        return (
            <div id="chart">
                {this.state.display ? (
                    <Chart options={this.state.options} series={[{data: this.props.usage}]} type="bar" height="350" />
                ) : (
                    <CustomLoading />
                )}
            </div>
        );
    }
}

export default withStyles(ChartStyle, { withTheme: true })(BarChart)