import React from 'react'
import { withStyles } from '@material-ui/core'
import RadiusStyle from './RadiusStyle'
import Chart from 'react-apexcharts'
import CustomLoading from '../../CustomLoading/CustomLoading';

var colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'];

class Radius extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        },
                    }
                }],
                labels: ["fulltime", "occasionnel", "disponnible", "broken to fix", "broken to recycle"],
            },
            display: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ display: true })
        }, 1000)
    }

    render() {
        return (
            <div id="chart">
                {this.state.display ? (
                    <Chart options={this.state.options} series={this.props.state} type="donut" height="380" />
                ) : (
                    <CustomLoading />
                )}
            </div>
        );
    }
}

export default withStyles(RadiusStyle, { withTheme: true })(Radius)