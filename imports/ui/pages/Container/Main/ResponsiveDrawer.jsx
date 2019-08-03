import React                from 'react';
import PropTypes            from 'prop-types';
import classNames           from 'classnames';
import { withStyles }       from '@material-ui/core/styles';
import Drawer               from '@material-ui/core/Drawer';
import AppBar               from '@material-ui/core/AppBar';
import List                 from '@material-ui/core/List';
import ListItem             from '@material-ui/core/ListItem';
import ListItemIcon         from '@material-ui/core/ListItemIcon';
import ListItemText         from '@material-ui/core/ListItemText';
import Tooltip              from '@material-ui/core/Tooltip';
import Fade                 from '@material-ui/core/Fade';
import Divider              from '@material-ui/core/Divider';
import IconButton           from '@material-ui/core/IconButton';
import ChevronLeftIcon      from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon     from '@material-ui/icons/ChevronRight';
import Header               from './Header/Header';
import { NavLink }          from 'react-router-dom';
import Typography           from '@material-ui/core/Typography';
import Hidden               from '@material-ui/core/Hidden';
import MenuConnectedAll     from '../../../Helpers/Menu/MenuListAll';
import compose              from 'recompose/compose';
import { withTracker }      from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Switch }   from 'react-router-dom';

import Home                 from './Page/Home/Home';
import Form                 from './Page/Form/Form';
import HomeNotConnect       from './Page/HomeNotConnect/HomeNotConnect';
import Connection           from './Page/Connection/Connection';
import Logout               from './Page/Logout/Logout';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    minHeight: "100vh",
  },
  appBar: {
    background: 'white',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: 'none',
    position: 'fixed',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'fixed',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  drawerPaperMobile: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: 'white',
    width: "100%",
  },
  a: {
    textDecoration: "none"
  },
  titleMenu:{
    marginLeft: "12px",
    fontWeight: "400",
  },
  textLink:{
    fontSize: "14px",
    fontWeight: "400",
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
});

const drawerWidth = 240;

class ResponsiveDrawer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: localStorage.getItem("openMenu") === null ? false : localStorage.getItem("openMenu") == "true" ? true : false,
      size: "auto",
      mobileOpen: false,
      menuType: 'big',
    };
  }

  componentDidMount(){
    this.closeMenuOnResize();
    window.addEventListener('resize', this.closeMenuOnResize.bind(this));
  }

  closeMenuOnResize(){
    if(document.body.clientWidth < 960){
      this.handleDrawerClose();
      this.setState({menuType: 'small'})
    }else{
      this.setState({menuType: 'big'})
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
    localStorage.setItem("openMenu", true);
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
    localStorage.setItem("openMenu", false);
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleDrawerCloseMobile = () => {
    if(this.state.mobileOpen){
      this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    }
  };

  editColor(colorMain, colorSecond){
    this.props.colorEditing(colorMain, colorSecond);
  }

  render() {
    const { classes, theme } = this.props;
    const { open, mobileOpen, menuType } = this.state;
    const drawerAll = (
      <div>
        {MenuConnectedAll.map((category, index)=> {
          return(
            <List key={'list/'+index}>
              {open || mobileOpen ? 
                <Typography className={classes.titleMenu} variant="h6" color="default">
                  {category.cathegoryName}
                </Typography>
              : ""  }
              {category.pages.map((page, indexPage)=>{
                return(
                  <NavLink className={classes.a} activeClassName="active" key={'page/'+indexPage} to={page.path}>
                    <Tooltip title={!open && !mobileOpen ? page.name : "" } placement="right" TransitionComponent={Fade}>
                    <ListItem button onClick={this.handleDrawerCloseMobile}>
                      <ListItemIcon>
                        <i className="material-icons">{page.icon}</i>                    
                      </ListItemIcon>
                      <ListItemText className={classes.textLink} primary={page.name} />
                    </ListItem>
                    </Tooltip>
                  </NavLink>
                )
              })}
              <Divider />
            </List>
          )
        })}
      </div>
    );
    return (
      <Router>
        <div className={classes.root}>
            <AppBar
              position="absolute"
              className={classNames(classes.appBar, open && classes.appBarShift)}>
              <Header 
                marginTitle={theme.spacing(3.5)}
                menuOpen={open}
                handleDrawerOpen={this.handleDrawerOpen}
                handleDrawerToggle={this.handleDrawerToggle.bind(this)} 
                themeConfig={this.props.themeConfig}
                editColor={this.editColor.bind(this)}
                menuType={menuType}
              />
            </AppBar>
            {this.props.users && this.props.users.length > 0 ?
              <div>
                <Hidden mdUp>
                  <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={this.handleDrawerToggle}
                    classes={{
                      paper: classes.drawerPaperMobile,
                    }}
                    ModalProps={{
                      keepMounted: true,
                    }}
                  >
                    <div className={classes.toolbar}>
                      {open || mobileOpen ?
                        "coucou"
                      :""}
                      <IconButton onClick={this.handleDrawerToggle}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                      </IconButton>
                    </div>
                  </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                  <Drawer
                    variant="permanent"
                    classes={{
                      paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}>
                    <div className={classes.toolbar}>
                      {open || mobileOpen ?
                        "coucou"
                      :""}
                      <IconButton onClick={this.handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                      </IconButton>
                    </div>
                  </Drawer>
                </Hidden>
              </div>
            : ""}
            <main className={classes.content + " containerWithMenu"}>
              <div className="mainContent">
                <Switch>
                  <Route exact path='/' render={(props) => <HomeNotConnect menuOpen={open} {...props} />} />
                  <Route exact path='/home' render={(props) => <Home menuOpen={open} {...props} />} />
                  <Route exact path='/form' render={(props) => <Form menuOpen={open} {...props} />} />
                  <Route exact path='/form/:id' render={(props) => <Form menuOpen={open} {...props} />} />
                  <Route exact path='/connect' render={(props) => <Connection menuOpen={open} {...props} />} />
                  <Route exact path='/logout' render={(props) => <Logout menuOpen={open} {...props} />} />
                </Switch>
              </div>
            </main>
        </div>
      </Router>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

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
),withStyles(styles, { withTheme: true }))(ResponsiveDrawer);
