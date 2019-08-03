import React, { Component }         from 'react';
import { NavLink }                  from 'react-router-dom';
import Toolbar                      from '@material-ui/core/Toolbar';
import Typography                   from '@material-ui/core/Typography';
import IconButton                   from '@material-ui/core/IconButton';
import MenuIcon                     from '@material-ui/icons/Menu';
import ColorLensIcon                from '@material-ui/icons/ColorLens';
import CompareIcon                  from '@material-ui/icons/Compare';
import Button                       from '@material-ui/core/Button';
import { withStyles }               from '@material-ui/core/styles' ;
import Menu                         from '@material-ui/core/Menu';
import MenuItem                     from '@material-ui/core/MenuItem';
import MoreVertIcon                 from '@material-ui/icons/MoreVert';
import AccountCircle                from '@material-ui/icons/AccountCircle';
import LockIcon                     from '@material-ui/icons/Lock';
import LockOpenIcon                 from '@material-ui/icons/LockOpen';
import { ChromePicker }             from 'react-color';
import Modal                        from 'react-responsive-modal';
import MediaQuery                   from 'react-responsive';
import compose                      from 'recompose/compose';
import { withTracker }              from 'meteor/react-meteor-data';
import Avatar                       from '@material-ui/core/Avatar';
import { ToastContainer, toast }    from 'react-toastify';
import PermContactCalendarIcon      from '@material-ui/icons/PermContactCalendar';
import { Redirect }                 from 'react-router-dom';

const styles = theme => ({
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
        fontSize: "15px",
        fontWeight: "300",
    },
    flexOpen: {
        flexGrow: 1,
        fontSize: "15px",
        fontWeight: "300",
        marginLeft: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(5),
        },
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    link: {
        textDecoration: "none",
        color: "unset",
    },
    titleColor:{
        margin: 10,
    },
    icon:{
        marginRight: 20,
    },
    buttonRigth:{
        float: "right",
    },
    image: {
        width: 65,
    }
});

class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            openModal: false,
            backgroundMain: this.checkHexadecimal(localStorage.getItem("colorEditingMain")) ? localStorage.getItem("colorEditingMain") : "#0499e5" ,
            backgroundSecond: this.checkHexadecimal(localStorage.getItem("colorEditingSecond")) ? localStorage.getItem("colorEditingSecond") : "#bf41b8",
            anchorEl: null,
            anchorNotif: null,
        }
    }
    
    handleClick = event => {this.setState({ anchorEl: event.currentTarget })};

    handleClose = () => {this.setState({ anchorEl: null })};
    
    checkHexadecimal(color){return /^#[0-9A-F]{6}$/i.test(color)}

    handleColorOpen(){this.setState({ openModal: true })}

    handleColorClose() {this.setState({ openModal: false })}
    
    handleNotif = event => {this.setState({ anchorNotif: event.currentTarget })};

    handleCloseNotif = () => {this.setState({ anchorNotif: null })};

    notifyError = (message) => toast.error(message, {position: "top-right",autoClose: 500000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,});
        
    notifyInfo = (message) => toast.info(message, {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,});
    
    notifySuccess = (message) => toast.success(message, {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,});
    
    handleChangeCompleteMain = (color) => {
        this.setState({ backgroundMain: color.hex });
        this.props.editColor(this.state.backgroundMain, this.state.backgroundSecond);
    };

    handleChangeCompleteSecond = (color) => {
        this.setState({ backgroundSecond: color.hex });
        this.props.editColor(this.state.backgroundMain, this.state.backgroundSecond);
    };

    resetColorDefault(){
        let colorMain={hex: "#2196f3"}
        let colorSecond={hex: "#c51162"}
        this.setState({ backgroundMain: colorMain.hex });
        this.setState({ backgroundSecond: colorSecond.hex });
        this.props.editColor(colorMain.hex, colorSecond.hex);
    }

    Logout = () => {
        Meteor.logout((err) => {
            if(err){
                Materialize.toast(err.reason, 4000);
                this.notifyError(err.reason)
            }else{
                this.setState({isLoggedIn: !this.state.isLoggedIn});
                this.notifySuccess("Logout Succefull !")
            }
        });
        localStorage.setItem("openMenu", false);
        setTimeout(() => { this.forceUpdate(); }, 200);
        document.location.replace("/");
    }

    loadNotif = (notif) => {
        Meteor.call('deleteNotificationOne', notif.createdAt);
        this.setState({redirect: notif.link});
    }

    render() {
        const { classes, menuOpen, handleDrawerOpen, handleDrawerToggle, themeConfig } = this.props;
        const { anchorEl, anchorNotif, openModal, backgroundMain, backgroundSecond, redirect } = this.state;
        if(redirect && redirect !== ""){
            let redirection = redirect;
            this.setState({redirect: ""})
            this.setState({anchorNotif: false})
            return <Redirect to={redirection} />
        }
        const openNotif = Boolean(anchorNotif);
        let MenuBig = (<div></div>)
        let MenuSmall = (<div></div>)
        let NavIconNotif = (<div></div>)
        if(this.props.users && this.props.users.length > 0){
            let user = this.props.users[0];
            MenuBig= (
                <MediaQuery minWidth={900}>
                    <IconButton
                        color="inherit"
                        aria-label="More"
                        aria-owns={anchorEl ? 'long-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}>
                        {user.profile.avatar ? <Avatar alt="Avatar" src={user.profile.avatar} /> : <AccountCircle />}
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}>
                        <NavLink to='/profile' className={classes.link}><MenuItem><PermContactCalendarIcon className={classes.icon} /> Profile </MenuItem></NavLink>
                        <NavLink to='/connect' className={classes.link}><MenuItem onClick={this.Logout}><LockIcon className={classes.icon} /> Logout </MenuItem></NavLink>
                    </Menu>            
                </MediaQuery>
            );
            MenuSmall = (
                <MediaQuery maxWidth={900}>
                    <IconButton
                        color="inherit"
                        aria-label="More"
                        aria-owns={anchorEl ? 'long-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}>
                        {user.profile.avatar ? <Avatar alt="Avatar" src={user.profile.avatar} /> : <AccountCircle />}
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}>
                        <NavLink to='/profile' className={classes.link}><MenuItem><PermContactCalendarIcon className={classes.icon} /> Profile </MenuItem></NavLink>
                        <NavLink to='/connect' className={classes.link}><MenuItem onClick={this.Logout}><LockIcon className={classes.icon} /> Logout </MenuItem></NavLink>
                    </Menu>
                </MediaQuery>         
            )
        }else{
            MenuBig = (
                <MediaQuery minWidth={900}>
                    <NavLink to='/connect' className={classes.link}><Button color="inherit">Connection</Button></NavLink>
                </MediaQuery>
            );
            MenuSmall = (
                <MediaQuery maxWidth={900}>
                    <IconButton
                        color="inherit"
                        aria-label="More"
                        aria-owns={anchorEl ? 'long-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}>
                        <MoreVertIcon/>
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}>
                        <NavLink to='/connect' className={classes.link}><MenuItem onClick={this.handleClose}><LockOpenIcon className={classes.icon} /> Connection </MenuItem></NavLink>
                    </Menu>
                </MediaQuery>      
            )
        }
        return( 
            <Toolbar style={{borderLeft: "none", paddingLeft: "12px"}} disableGutters={!menuOpen}>
                {this.props.users && this.props.users.length > 0 ?
                    this.props.menuType == 'big' ? 
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={handleDrawerOpen}
                            className={classes.navIconHide}
                            style={{display: menuOpen ? 'none' : 'block'}}
                        >
                            <MenuIcon />
                        </IconButton>
                    :
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={handleDrawerToggle}
                            className={classes.navIconHide}
                        >
                            <MenuIcon />
                        </IconButton>
                : "" }
                <img src="/assets/img/closethegap.png" className={classes.image} />
                <IconButton
                    color="inherit"
                    aria-label="Switch Theme"
                    onClick={this.handleColorOpen.bind(this)}
                >
                    <ColorLensIcon />
                </IconButton>      
                <IconButton
                    color="inherit"
                    aria-label="Switch Theme"
                    onClick={themeConfig}
                >
                    <CompareIcon />
                </IconButton>     
                {NavIconNotif} 
                {MenuBig}
                {MenuSmall}     
                <Modal classNames={{ modal: 'custom-modal' }} open={openModal} onClose={this.handleColorClose.bind(this)} little>
                    <div className="row modal">
                        <div className="col m6 s12">
                            <div className="colorPickerModal">
                                <Typography variant="h6" color="inherit" align="center" className={classes.titleColor}>
                                    Principal Color
                                </Typography>
                                <ChromePicker
                                    color={backgroundMain}
                                    onChangeComplete={this.handleChangeCompleteMain}
                                    disableAlpha={true}
                                />
                            </div>
                        </div>
                        <div className="col m6 s12">
                            <div className="colorPickerModal">
                                <Typography variant="h6" color="inherit" align="center" className={classes.titleColor}>
                                    Secondary Color
                                </Typography>
                                <ChromePicker
                                    color={backgroundSecond}
                                    onChangeComplete={this.handleChangeCompleteSecond}
                                    disableAlpha={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col s12">
                        <Button color="secondary" onClick={this.resetColorDefault.bind(this)} className={classes.button}>
                            Reset Color Default
                        </Button>
                        <Button variant="contained" color="primary" onClick={this.handleColorClose.bind(this)} className={classes.buttonRigth}>
                            Save
                        </Button>
                    </div>
                </Modal>
                <ToastContainer />
            </Toolbar>

        )
    }
}

export default compose(
    withTracker(props => {
        if(Meteor.user()){
            Meteor.subscribe('ownUser');
            return {
                users: Meteor.users.find({}).fetch(),
            };
        }else{
            return {
                users: []
            };
        }
    }
),withStyles(styles, { withTheme: true }))(Header);
