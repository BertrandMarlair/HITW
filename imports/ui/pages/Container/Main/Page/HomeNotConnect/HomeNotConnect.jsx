import React, { useState, useRef, useEffect, Suspense } from 'react';

import PropTypes from 'prop-types';
import GridLayout from 'react-grid-layout'
import { withStyles } from '@material-ui/core/styles';

import styles from './HomeStyle'
import GriddedDiv from './components/WidjetTypes/GriddedDiv'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import Maps from './components/Widget/Maps/maps'
import Test from './components/Widget/Test/test'
import Chart from './components/Widget/Chart/Chart'

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
        maxH: 12,
        static: false,
        widgetTitle: 'Maps 1',
        widgetVisible: true,
        component: Maps,
    },
    {
        i: "2",
        x: 0,
        y: 7,
        w: 6,
        h: 6,
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
        h: 10,
        minW: 2,
        maxW: 12,
        minH: 2,
        maxH: 12,
        static: false,
        widgetTitle: 'Maps 3',
        widgetVisible: true,
        component: Test,
    },
];

const Home = ({ classes, menuOpen}) => {
    const dashboardLayoutEL = useRef(null)
    const [dashboardSise, setDashboardSize] = useState(0)
    const [targetFullScreen, setTargetFullScreen] = useState(null)
    const gridLayout = layout

    useEffect(() => {
        if (dashboardLayoutEL && dashboardLayoutEL.current) {
            setDashboardSize(dashboardLayoutEL.current.clientWidth)
        }
        window.addEventListener('resize', resizeWindow)
        return () => {
            window.removeEventListener('resize', resizeWindow)
        }
    }, [])

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
                <Comp.component />
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

export default withStyles(styles)(Home);