import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// nodejs library to set properties for components
import PropTypes from 'prop-types'

// material-ui components
import withStyles from '@material-ui/core/styles/withStyles'

import MenuStyle from './MenuStyle'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

function MenuCustom({ ...props }) {
  const {
    classes,
    children,
    disabled,
    className,
    muiClasses,
    open,
    onClose,
    anchorEl,
    ...rest
  } = props
  const btnClasses = classNames({
    [classes.Icon]: true,
    [classes.disabled]: disabled,
    [className]: className,
  })

  return ( 
    <Popper 
      {...rest} 
      classes={muiClasses} 
      className={btnClasses}
      open={open}
      anchorEl={anchorEl.current} 
      keepMounted 
      transition 
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper className={classes.menu}>
            <ClickAwayListener onClickAway={onClose}>
              <MenuList>
                {children.map((item, index) => (
                  <MenuItem key={`menuItem/${index}`} onClick={onClose} className={classes.menuItem}>
                    {item}
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
}

MenuCustom.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  muiClasses: PropTypes.object,
  open: PropTypes.bool.isRequired, 
  onClose: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired
}

export default withStyles(MenuStyle)(MenuCustom)
