import React, { useState, useRef, useEffect, Suspense } from 'react';

import PropTypes from 'prop-types';
import GridLayout from 'react-grid-layout'
import { withStyles } from '@material-ui/core/styles';

import styles from './HomeStyle'
import GriddedDiv from './components/WidjetTypes/GriddedDiv'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import compose from 'recompose/compose';
import { withTracker } from 'meteor/react-meteor-data';
import { Maps } from '../../../../../../api/MapsCollection';

import MapsComp from './components/Widget/Maps/maps'
import ChartBar from './components/Widget/ChartBar/ChartBar'
import Chart from './components/Widget/Chart/Chart'
import Radius from './components/Widget/Radius/Radius'
import Perf from './components/Widget/Perf/Perf'

const layout = [
    {
        i: "1",
        x: 0,
        y: 0,
        w: 6,
        h: 12,
        minW: 2,
        maxW: 12,
        minH: 2,
        maxH: 30,
        static: false,
        widgetTitle: 'Maps 1',
        widgetVisible: true,
        component: MapsComp,
    },
    {
        i: "2",
        x: 0,
        y: 7,
        w: 6,
        h: 7,
        minW: 2,
        maxW: 12,
        minH: 2,
        maxH: 12,
        static: false,
        widgetTitle: 'Maps 2',
        widgetVisible: true,
        component: Chart,
    },
    {
        i: "3",
        x: 7,
        y: 7,
        w: 6,
        h: 11,
        minW: 2,
        maxW: 12,
        minH: 2,
        maxH: 12,
        static: false,
        widgetTitle: 'Maps 3',
        widgetVisible: true,
        component: ChartBar,
    },
    {
        i: "4",
        x: 7,
        y: 7,
        w: 6,
        h: 11,
        minW: 2,
        maxW: 12,
        minH: 2,
        maxH: 12,
        static: false,
        widgetTitle: 'Maps 4',
        widgetVisible: true,
        component: Radius,
    },
    {
        i: "5",
        x: 7,
        y: 7,
        w: 6,
        h: 10,
        minW: 2,
        maxW: 12,
        minH: 2,
        maxH: 12,
        static: false,
        widgetTitle: 'Maps 5',
        widgetVisible: true,
        component: Perf,
    },
];

const Home = ({ classes, menuOpen, computer}) => {
    const dashboardLayoutEL = useRef(null)
    const [dashboardSise, setDashboardSize] = useState(0)
    const [targetFullScreen, setTargetFullScreen] = useState(null)

    const [maps, setMaps] = useState([])
    const [performance, setPerformance] = useState([])
    const [usage, setUsage] = useState([])
    const [state, setState] = useState([])
    const [male, setMale] = useState(0)
    const [female, setFemale] = useState(0)
    const [orther, setOrther] = useState(0)
    
    const gridLayout = layout
    const categories = [
        'gender',
        'education',
        'innovation',
        'digital',
        'social',
        'migration',
        'healthcare',
    ]
    const stateCat = ["fulltime", "occasionnel", "disponnible", "broken to fix", "broken to recycle"]
    
    useEffect(() => {
        if (dashboardLayoutEL && dashboardLayoutEL.current) {
            setDashboardSize(dashboardLayoutEL.current.clientWidth)
        }
        window.addEventListener('resize', resizeWindow)
        return () => {
            window.removeEventListener('resize', resizeWindow)
        }
    }, [])

    useEffect(() => {
        organiseData()
    }, [computer])

    const organiseData = () => {
        const mapData = []
        let perfCount = 0
        let usageValue = [0, 0, 0, 0, 0, 0]
        let stateValue = [0, 0, 0, 0, 0]
        let maleCount = 0
        let femaleCount = 0
        let ortherCount = 0
        computer.forEach(comp => {
            mapData.push(comp.map)
            perfCount += comp.performance
            const i = categories.findIndex((i) => i === comp.usage)
            usageValue[i] = usageValue[i] + 1
            const j = stateCat.findIndex((i) => i === comp.state)
            stateValue[j] = stateValue[j] + 1
            if (comp.sexe == "male") {maleCount += 1}
            if (comp.sexe == "female") {femaleCount += 1}
            if (comp.sexe == "orther") {ortherCount += 1}
        })
        console.log(maleCount, femaleCount)
        setMale(maleCount)
        setFemale(femaleCount)
        setOrther(ortherCount)
        setMaps(mapData)
        setPerformance(perfCount/computer.length)
        setUsage(usageValue)
        setState(stateValue)
    }

    const selectFullSize = (id) => {
        const itemSelect = gridLayout.findIndex(item => item.i === id)
        setTargetFullScreen([{
            ...gridLayout[itemSelect],
            x: 0,
            y: 0,
            w: 12,
            h: 30,
            static: true,
        }])
    }

    const disableFullScreen = () => {
        setTargetFullScreen(null)
    }

    const resizeWindow = () => {
        setDashboardSize(dashboardLayoutEL.current.clientWidth)
    }

    const renderGrid = () => {
        if (targetFullScreen) {
            return targetFullScreen.map((item, index) => <div key={`${item.i}`} style={{ zIndex: gridLayout.length - index + 1000 }}>{gridContainer(item)}</div>)
        }
        return gridLayout.map((item, index) => <div key={`${item.i}`} style={{ zIndex: gridLayout.length - index + 1000 }}>{gridContainer(item)}</div>)
    }

    const gridContainer = (item) => {
        const isFullScreen = targetFullScreen ? targetFullScreen[0].i === item.i : false
        const Comp = item
        return (
            <GriddedDiv
                {...item}
                selectFullSize={selectFullSize}
                disableFullScreen={disableFullScreen}
                isFullScreen={isFullScreen}
            >
                <Comp.component maps={maps} performance={performance} usage={usage} state={state} computer={computer} male={male} female={female} orther={orther} />
            </GriddedDiv>
        )
    }

    const targetLayout = () => {
        if (targetFullScreen) {
            return targetFullScreen
        }
        return gridLayout
    }

    return (
        <div className={!menuOpen ? classes.flex : classes.flexOpen}>
            <div ref={dashboardLayoutEL} className={classes.gridContainer}>
                <GridLayout
                    className="layout"
                    cols={12}
                    rowHeight={30}
                    width={dashboardSise}
                    layout={targetLayout()}
                    draggableHandle={'nav, nav *'}
                >
                    {renderGrid()}
                </GridLayout>
            </div>
        </div>
    )
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withTracker(props => {
        Meteor.subscribe('allMaps');
        return {
            computer: Maps.find({}).fetch()
        };
    }),
    withStyles(styles)
)(Home);