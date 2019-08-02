import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// nodejs library to set properties for components
import PropTypes from 'prop-types'

// material-ui components
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'

import IconStyle from './iconStyle'

function RegularIcon({ ...props }) {
  const {
    classes,
    color,
    children,
    fullWidth,
    disabled,
    size,
    className,
    muiClasses,
    centered,
    icon,
    white,
    shadowed,
    header,
    noPadding,
    ...rest
  } = props
  const btnClasses = classNames({
    [classes.Icon]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.disabled]: disabled,
    [classes.icon]: icon,
    [classes.white]: white,
    [classes.shadowed]: shadowed,
    [classes.header]: header,
    [classes.noPadding]: noPadding,
    [className]: className,
  })
  return ( 
    <IconButton {...rest} classes={muiClasses} className={btnClasses} style={ centered ? { margin: 'auto', display: 'block'} : {}}>
      {children}
    </IconButton>
  )
}

RegularIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'dark',
    'info',
    'success',
    'warning',
    'danger',
    'rose',
    'white',
    'twitter',
    'facebook',
    'google',
    'linkedin',
    'pinterest',
    'youtube',
    'tumblr',
    'github',
    'behance',
    'dribbble',
    'reddit',
    'transparent',
    'unselect',
  ]),
  size: PropTypes.oneOf(['sm', 'lg']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  muiClasses: PropTypes.object,
  icon: PropTypes.bool,
  white: PropTypes.bool,
  shadowed: PropTypes.bool,
  header: PropTypes.bool,
  noPadding: PropTypes.bool,
}

export default withStyles(IconStyle)(RegularIcon)
