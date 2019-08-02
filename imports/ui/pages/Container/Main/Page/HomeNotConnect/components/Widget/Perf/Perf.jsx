import React from 'react'
import Chart from 'react-apexcharts'
import CustomLoading from '../../CustomLoading/CustomLoading';

class RadialChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                plotOptions: {
                    radialBar: {
                        startAngle: -135,
                        endAngle: 135,
                        dataLabels: {
                            name: {
                                fontSize: '16px',
                                color: undefined,
                                offsetY: 120
                            },
                            value: {
                                offsetY: 76,
                                fontSize: '22px',
                                color: undefined,
                                formatter: function (val) {
                                    return val + "%";
                                }
                            }
                        }
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        shadeIntensity: 0.15,
                        inverseColors: false,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 50, 65, 91]
                    },
                },
                stroke: {
                    dashArray: 4
                },
                labels: ['Median Ratio']
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
                    <Chart options={this.state.options} series={[this.props.performance]} type="radialBar" height="350" />
                ) : (
                    <CustomLoading />
                )}
            </div>
        );
    }
}

export default RadialChart