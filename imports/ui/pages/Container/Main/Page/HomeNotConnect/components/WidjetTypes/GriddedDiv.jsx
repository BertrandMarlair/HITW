import React, { useState, Fragment, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import { withStyles, Paper } from '@material-ui/core'

import GriddedDivStyles from './GriddedDivStyles'
import Icon from '../CustomIcons/Icon'
import SmallTitle from '../Typography/SmallTitle'
import CustomModal from '../CustomModal/Modal'
import CustomMenu from '../CustomMenu/Popper'

import {
    DragIndicator as Drag,
    MoreVert as OpenMenuIcon,
    Fullscreen,
    FullscreenExit,
} from '@material-ui/icons'

const GridDiv = props => {

    const { classes, children, widgetTitle, selectFullSize, disableFullScreen, i, isFullScreen } = props
    const [ hover, setHover ] = useState(false)
    const [ openSettingModal, setOpenSettingModal ] = useState(false)
    const [ openMenu, setOpenMenu] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const anchorRef = useRef(null)

    const handleToggleMenu = () => setOpenMenu(!openMenu)
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return
        }
        setOpenMenu(false)
    }
    const hoverWidget = (state) => {
        if(!state){
            setOpenMenu(false)
        }
        setHover(state)
    }
    
    useEffect(() => {
        if(openMenu){
            setIsMenuOpen(openMenu)
        }else{
            setTimeout(()=>{
                setIsMenuOpen(openMenu)
            }, 100)
        }
    }, [openMenu])

    return (
        <Fragment>
            <Paper 
                className={classes.gridLayoutItem} 
                onMouseOver={() => hoverWidget(true)}
                onMouseLeave={() => hoverWidget(false)}
            >
                <div className={classes.gridLayoutItemContainer}>
                    <div className={classes.headerContainer}>
                        <header>
                            <div className={classes.titleWidget}>
                                <SmallTitle>{widgetTitle}</SmallTitle>
                            </div>
                            <div className={classes.leftIcon}>
                                {hover && !isFullScreen && 
                                    <nav className={classes.headerItem}>
                                        <Icon header className={classes.dragIcon} shadowed size={'sm'}>
                                            <Drag className={classes.icon} />
                                        </Icon>
                                    </nav>
                                }
                            </div>
                            <div className={classes.rightIcon}>
                                <div ref={anchorRef} onClick={handleToggleMenu} >
                                    {hover && 
                                        <div className={classes.headerItem}>
                                            <Icon header shadowed size={'sm'}>
                                                <OpenMenuIcon className={classes.icon} />
                                            </Icon>
                                        </div>
                                    }
                                </div>
                                {hover && 
                                    <div className={classes.headerItem}>
                                        {isFullScreen ? (
                                            <Icon onClick={() => disableFullScreen(i)} header shadowed size={'sm'}>
                                                <FullscreenExit className={classes.icon} />
                                            </Icon>
                                        ) : (
                                            <Icon onClick={() => selectFullSize(i)} header shadowed size={'sm'}>
                                                <Fullscreen className={classes.icon} />
                                            </Icon>
                                        )}
                                    </div>
                                }
                            </div>
                        </header>
                    </div>
                    <div className={classes.gridContent}>
                        {children}
                    </div>
                </div>
            </Paper>
            <CustomModal
                open={openSettingModal}
                onClose={() => setOpenSettingModal(false)}
            >
                <div>Settings Modal Condig</div>
            </CustomModal>
        </Fragment>
    )
}

GridDiv.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(GriddedDivStyles)(GridDiv)