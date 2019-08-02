import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'

import typographyStyle from './typographyStyle'

function SmallTitle({ ...props }) {
  const { classes, children, centered, error, white, big, className } = props
  const normalClasses = classNames({
    [className]: className,
    [classes.defaultFontStyle]: true,
    [classes.smallTitleText]: true,
    [classes.error]: error,
    [classes.white]: white,
    [classes.big]: big,

  })
  return <div className={normalClasses} style={centered && {textAlign: 'center'}}>{children}</div>
}

SmallTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.bool,
  white: PropTypes.bool,
  big: PropTypes.bool,
}

export default withStyles(typographyStyle)(SmallTitle)
