import React from 'react'
import { withStyles } from '@material-ui/core'
import ChartStyle from './ChartStyle'
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Area,
    YAxis,
    XAxis
} from 'recharts'


const getRandomData = (length, min, max, multiplier = 10, maxDiff = 10) => {
    const array = new Array(length).fill()
    let lastValue

    return array.map((item, index) => {
        let randomValue = Math.floor(Math.random() * multiplier + 1)

        while (
            randomValue <= min ||
            randomValue >= max ||
            (lastValue && randomValue - lastValue > maxDiff)
        ) {
            randomValue = Math.floor(Math.random() * multiplier + 1)
        }

        lastValue = randomValue

        return { value: randomValue }
    })
}

const getMainChartData = () => {
    const resultArray = []
    const tablet = getRandomData(31, 3500, 6500, 7500, 1000)
    const desktop = getRandomData(31, 1500, 7500, 7500, 1500)
    const mobile = getRandomData(31, 1500, 7500, 7500, 1500)

    for (let i = 0; i < tablet.length; i++) {
        resultArray.push({
            tablet: tablet[i].value,
            desktop: desktop[i].value,
            mobile: mobile[i].value
        })
    }

    return resultArray
}

const mainChartData = getMainChartData()

const Chart = ({ classes, theme, fullscreen }) => {
    return (
        <div className={classes.chartContainer}>
            {console.log('re update')}
            <ResponsiveContainer>
                <ComposedChart
                    margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                    data={mainChartData}
                >
                    <YAxis
                        ticks={[0, 2500, 5000, 7500]}
                        tick={{ fill: theme.palette.text.hint + '80', fontSize: 14 }}
                        stroke={theme.palette.text.hint + '80'}
                        tickLine={false}
                    />
                    <XAxis
                        tickFormatter={i => i + 1}
                        tick={{ fill: theme.palette.text.hint + '80', fontSize: 14 }}
                        stroke={theme.palette.text.hint + '80'}
                        tickLine={false}
                    />
                    <Area
                        type="natural"
                        dataKey="desktop"
                        fill={theme.palette.background.light}
                        strokeWidth={0}
                        activeDot={false}
                    />
                    <Line
                        type="natural"
                        dataKey="mobile"
                        stroke={theme.palette.primary.main}
                        strokeWidth={2}
                        dot={false}
                        activeDot={false}
                    />
                    <Line
                        type="linear"
                        dataKey="tablet"
                        stroke={'red'}
                        strokeWidth={2}
                        dot={{
                            stroke: 'black',
                            strokeWidth: 2,
                            fill: 'blue'
                        }}
                    />
                </ComposedChart>
            </ResponsiveContainer>
            {fullscreen && (
                <div>
                    orther things
                </div>
            )}
        </div>
    )
}

export default withStyles(ChartStyle, { withTheme: true })(Chart)