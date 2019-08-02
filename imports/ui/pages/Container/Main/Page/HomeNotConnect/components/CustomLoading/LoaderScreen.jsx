import React from 'react'
import { withStyles } from '@material-ui/core'
import CustomLoadingStyle from './CustomLoadingStyle'

const LoaderScreen = ({classes}) => {
    return (
        <div className={classes.loaderScreen}>
            <div className={classes.loader}>
                <div className={classes.inner}></div>
            </div>
        </div>
    )
}

export default withStyles(CustomLoadingStyle)(LoaderScreen)