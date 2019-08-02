import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// nodejs library to set properties for components
import PropTypes from 'prop-types'

// material-ui components
import withStyles from '@material-ui/core/styles/withStyles'

import MenuStyle from './MenuStyle'
import { Menu, MenuItem } from '@material-ui/core'

function MenuCustom({ ...props }) {
  const {
    classes,
    children,
    disabled,
    className,
    muiClasses,
    onClose,
    ...rest
  } = props
  const menuClasses = classNames({
    [classes.disabled]: disabled,
    [className]: className,
  })
  return ( 
    <Menu 
      {...rest} 
      classes={muiClasses} 
      className={menuClasses}
      onClick={onClose}
      onClose={onClose}
    >
      <div className={classes.menu}>
        {children.map((item, index) => (
          <MenuItem className={classes.menuItem} key={`menuItem/${index}`} onClick={onClose} component="div">
            {item}
          </MenuItem>
        ))}
      </div>
    </Menu>
  )
}

MenuCustom.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  muiClasses: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired
}

export default withStyles(MenuStyle)(MenuCustom)
