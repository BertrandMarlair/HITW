import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './HomeStyle'

class Home extends Component {

    render() {
        const { classes, menuOpen } = this.props;
        return (
            <div className={!menuOpen ? classes.flex : classes.flexOpen}>
                coucou
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);