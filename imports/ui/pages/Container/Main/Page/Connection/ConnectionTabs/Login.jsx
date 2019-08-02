import React, { Component }         from 'react';
import { withStyles }               from '@material-ui/core/styles';
import Button                       from '@material-ui/core/Button';
import NavigationIcon               from '@material-ui/icons/Navigation';
import Typography                   from '@material-ui/core/Typography';
import CircularProgress             from '@material-ui/core/CircularProgress';
import PropTypes                    from 'prop-types';
import firebase                     from 'firebase/app';
import FirebaseConnect              from '../../../../../../Helpers/Firebase/base';
import { Redirect }                 from 'react-router-dom';
import { Accounts }                 from 'meteor/accounts-base'
import axios                        from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.background.paper,
        borderRadius: "3px",
    },
    topCard:{
        background: "linear-gradient(60deg, "+theme.palette.secondary.main+", "+theme.palette.secondary.main+"b0"+");"
    },
    button: {
        margin: theme.spacing(1),
    },
    progress: {
        margin: theme.spacing(2),
    },
});

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            onGithubLoading: false,
            open: false
        };
    }

    componentDidMount(){
        let self = this;
        window.addEventListener('keydown', function(event) {
            if (event.keyCode == 13){
                if (event.shiftKey) {
                    self.setState({open: !self.state.open});
                }
            }
        });
    }

    onSubmit(email, password){
        if(password != "" && email != ""){
            this.setState({buttonState: 'loading'});
            Meteor.loginWithPassword(email, password, (err)=>{
                if(err){
                    this.props.notifyError(err.reason);
                    this.setState({onGithubLoading: false});
                }else{
                    this.props.notifySuccess("Logged In");
                    this.setState({onGithubLoading: false});
                    this.setState({redirect: true});
                }
            });
        }else{
            this.props.notifyError("Can't access to user information");
        }
    };

    GithubLogin(e){
        e.preventDefault();
        var provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('repo');
        let self = this;
        this.setState({onGithubLoading: true});
        firebase.auth().signInWithPopup(provider).then((result) => {
            var user = result.user;
            let userData = {
                email: user.providerData[0].email,
                avatar: user.providerData[0].photoURL,
                password: user.providerData[0].uid,
            }
            self.onSubmit(userData.email, userData.password);
        }).catch((error) => {
            let notification;
            var errorCode = error.code;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                notification = 'You have signed up with a different provider for that email.';
            } else if(errorCode === 'auth/web-storage-unsupported'){
                notification = 'You cannot connnect to my.becode.org if you disable cookie';
            }else{
                console.log(error)
                notification = error.message;
            }
            self.setState({onGithubLoading: false});
            self.props.notifyError(notification ? notification : 'No Internet Connection');
        });
    }

    onSubmitTest(e){
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;
        if(password != "" && email != ""){
            Meteor.loginWithPassword(email, password, (err)=>{
                if(err){
                    this.props.notifyError(err.reason);
                    console.log(err)
                    this.setState({buttonState: 'error'});
                }else{
                    this.props.notifySuccess("Account Authentified !");
                    this.setState({buttonState: 'success'});
                    this.setState({redirect: true});
                }
            });
        }else{
            this.props.notifyError("Insert your login and password !");
        }
    };

    onSubmitForgot(e){
        e.preventDefault();
        let email = e.target.email.value;
        if(email != ""){
            Accounts.forgotPassword({email}, (err)=>{
                if(err){
                    console.log(err)
                }
            })
        }else{
            this.props.notifyError("Insert your login and password !");
        }
    };

    handleClick(e){
        e.preventDefault();
        this.props.changeValue(1);
    }

    render() {
        const { classes } = this.props;
        const { redirect } = this.state;
        return(
            <div className={classes.paper + " cardLog"}>
                {redirect ? <Redirect to='/home' /> : ""}
                <div className={classes.topCard + " topCard"}>
                    <Typography align='center' variant="h5" gutterBottom>
                        Login
                    </Typography>
                </div>
                <div className="registerLink">
                    {!this.state.onGithubLoading ? 
                        <div>
                            <Button color="secondary" onClick={this.GithubLogin.bind(this)} variant="extendedFab" aria-label="Github" className={classes.button}>
                                <NavigationIcon className={classes.extendedIcon} />
                                Log in with Github
                            </Button>
                            <Typography align='center' variant="subtitle1" gutterBottom style={{marginTop: "100px"}}>
                                <Button className={classes.button} onClick={this.handleClick.bind(this)}>
                                    If you haven't a account, please register first
                                </Button>
                            </Typography>
                        </div>
                    :
                        <CircularProgress className={classes.progress} size={50} />
                    }
                </div>
                {this.state.open ? 
                    <div>
                        <form className="col s12" id="loginForm" onSubmit={this.onSubmitForgot.bind(this)}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="root_email" name="email" type="email" className="validate" autoComplete="email"/>
                                    <label htmlFor="root_email">Email</label>
                                </div>
                            </div>
                            <button>
                                Forgot
                            </button>
                        </form>
                        <form className="col s12" id="loginForm" onSubmit={this.onSubmitTest.bind(this)}>
                            <div className="row">
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="root_email" name="email" type="email" className="validate" autoComplete="email"/>
                                        <label htmlFor="root_email">Email</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="password" name="password" type="password" className="validate" autoComplete="new-password"/>
                                        <label htmlFor="password">Confirm Password</label>
                                    </div>
                                </div>
                                <button>
                                    Go!
                                </button>
                            </div>
                        </form>
                    </div>
                :""}
            </div>
        )
    }
}
 
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles, { withTheme: true })(Login)
