import React, { Component } from "react"
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Markers,
    Marker,
} from "react-simple-maps"
import compose from 'recompose/compose';
import { withTracker } from 'meteor/react-meteor-data';
import { Maps } from '../../../../../../../../../api/MapsCollection';

const wrapperStyles = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto",
}

class ZoomPan extends Component {
    constructor() {
        super()
        this.state = {
            center: [0, 20],
            zoom: 1,
        }
        this.handleCitySelection = this.handleCitySelection.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }
    handleCitySelection(evt) {
        const cityId = evt.target.getAttribute("data-city")
        const city = this.props.cities[cityId]
        this.setState({
            center: city.coordinates,
            zoom: 2,
        })
    }
    handleReset() {
        this.setState({
            center: [0, 20],
            zoom: 1,
        })
    }
    render() {
        console.log(this.props)
        const { cities } = this.props
        if (cities && cities.length > 0) {
            return (
                <div>
                    <div style={wrapperStyles}>
                        {cities.map((city, i) => (
                            <button
                                key={i}
                                className="btn px1"
                                data-city={i}
                                onClick={this.handleCitySelection}
                            >
                                {city.name}
                            </button>
                        ))}
                        <button onClick={this.handleReset}>
                            {"Reset"}
                        </button>
                    </div>
                    <div style={wrapperStyles}>
                        <ComposableMap
                            projectionConfig={{
                                scale: 205,
                            }}
                            width={980}
                            height={551}
                            style={{
                                width: "100%",
                                height: "auto",
                            }}
                        >
                            <ZoomableGroup center={this.state.center} zoom={this.state.zoom}>
                                <Geographies geography="/static/world.json">
                                    {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                                        <Geography
                                            key={i}
                                            geography={geography}
                                            projection={projection}
                                            style={{
                                                default: {
                                                    fill: "#ECEFF1",
                                                    stroke: "#607D8B",
                                                    strokeWidth: 0.75,
                                                    outline: "none",
                                                },
                                                hover: {
                                                    fill: "#607D8B",
                                                    stroke: "#607D8B",
                                                    strokeWidth: 0.75,
                                                    outline: "none",
                                                },
                                                pressed: {
                                                    fill: "#FF5722",
                                                    stroke: "#607D8B",
                                                    strokeWidth: 0.75,
                                                    outline: "none",
                                                },
                                            }}
                                        />
                                    ))}
                                </Geographies>
                                <Markers>
                                    {cities.map((city, i) => (
                                        <Marker key={i} marker={city}>
                                            <circle
                                                cx={0}
                                                cy={0}
                                                r={6}
                                                fill="#FF5722"
                                                stroke="#DF3702"
                                            />
                                        </Marker>
                                    ))}
                                </Markers>
                            </ZoomableGroup>
                        </ComposableMap>
                    </div>
                </div>
            )
        }else {
            return (
                <div>Loading...</div>
            )
        }
    }
}

export default compose(
    withTracker(props => {
        Meteor.subscribe('allMaps');
        return {
            cities: Maps.find({}).fetch()
        };
    }),
)(ZoomPan);