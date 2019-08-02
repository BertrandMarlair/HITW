import React            from 'react';
import PropTypes        from 'prop-types';
import { withStyles }   from '@material-ui/core/styles';
import AppBar           from '@material-ui/core/AppBar';
import Tabs             from '@material-ui/core/Tabs';
import Tab              from '@material-ui/core/Tab';
import Typography       from '@material-ui/core/Typography';
import Toolbar          from '@material-ui/core/Toolbar';
import Register         from './ConnectionTabs/Register';
import Login            from './ConnectionTabs/Login';
import SwipeableViews   from 'react-swipeable-views';
import ConnectedArea    from '../../../../../Helpers/Connected/ConnectedArea';
import { ToastContainer, toast } from 'react-toastify';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
    },
    AppBar:{
        boxShadow: "0 4px 10px -2px grey",
    },
});

class Connection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: 0,
            firstTabs: '',
        };
    }

    componentDidMount(){ document.title = "My Becode | Connection";window.scroll(0, 0) }

    handleChange = (event, value) => {this.setState({ value })};

    handleChangeIndex = index => {this.setState({ value: index })};

    notifyError = (message) => toast.error(message, {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,});
        
    notifyInfo = (message) => toast.info(message, {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,});
    
    notifySuccess = (message) => toast.success(message, {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,});

    changeValue= (value) => this.setState({value: value})

    render() {
        const { classes, theme, menuOpen } = this.props;
        const { value } = this.state;
        return (
            <div className={classes.root}>
                <ConnectedArea/>
                <AppBar position="absolute" color="primary" className="FirstHeader">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Connection
                        </Typography>
                    </Toolbar>
                </AppBar>
                <AppBar position="absolute" color="primary" className="SecondHeader">
                    <Tabs 
                        value={value} 
                        onChange={this.handleChange}
                        indicatorColor="secondary"
                        scrollable
                        scrollButtons="off">
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={this.handleChangeIndex}
                    style={{transition: "0.5s", height: "84vh", marginTop: 0}}
                >
                    <TabContainer dir={theme.direction}>
                        <Login
                            changeValue={this.changeValue.bind(this)}
                            notifyError={this.notifyError.bind(this)}
                            notifyInfo={this.notifyInfo.bind(this)}
                            notifySuccess={this.notifySuccess.bind(this)}
                        />
                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        <Register
                            changeValue={this.changeValue.bind(this)}
                            notifyError={this.notifyError.bind(this)}
                            notifyInfo={this.notifyInfo.bind(this)}
                            notifySuccess={this.notifySuccess.bind(this)}
                        />
                    </TabContainer>
                </SwipeableViews>
                <ToastContainer />
            </div>
        );
    }
}

Connection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Connection);