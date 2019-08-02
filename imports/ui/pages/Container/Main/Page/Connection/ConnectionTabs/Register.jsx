import React, { Component }         from 'react';
import { withStyles }               from '@material-ui/core/styles';
import Button                       from '@material-ui/core/Button';
import NavigationIcon               from '@material-ui/icons/Navigation';
import TextField                    from '@material-ui/core/TextField';
import InputAdornment               from '@material-ui/core/InputAdornment';
import AccountCircle                from '@material-ui/icons/AccountCircle';
import CircularProgress             from '@material-ui/core/CircularProgress';
import Typography                   from '@material-ui/core/Typography';
import PropTypes                    from 'prop-types';
import firebase                     from 'firebase/app';
import axios                        from 'axios';
import { slugify }                  from '../../../../../../Helpers/Text/slugify';
import { Redirect }                 from 'react-router-dom';
import Radio                        from '@material-ui/core/Radio';
import RadioGroup                   from '@material-ui/core/RadioGroup';
import FormControlLabel             from '@material-ui/core/FormControlLabel';
import FormControl                  from '@material-ui/core/FormControl';
import FormLabel                    from '@material-ui/core/FormLabel';
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
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    progress: {
        margin: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(3),
    },
    group: {
        margin: `${theme.spacing(1)}px 0`,
    },
});

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSignedIn: false, // Local signed-in state.
            userData: {},
            openModal: false,
            first_name: '',
            last_name: '',
            promotion: '',
            redirect: false,
            onGithubLoading: false,
            isStaff: '',
        };
    }

    componentWillMount() {
        axios.get('https://inside.becode.org/api/v1/users.json?from=0&amount=1000',{header:{
            "cache-control":"no-cache",
            "content-type":"text/html; charset=utf-8"
        }})
        .then((response) => {
            this.setState({users: response.data.data})
        })
        .catch((error) => {
            this.setState({error: error})
        })
    }
    
    handleModalOpen() {this.setState({ openModal: true })};
    
    handleModalClose() {this.setState({ openModal: false, onGithubLoading: false})};

    submitForm() {this.onSubmitGithubWithoutInside()}

    handleChange = name => event => {this.setState({[name]: event.target.value,})};
    
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
            self.setState({userData: userData});
            self.onSubmitGithub();
        }).catch((error) => {
            let errorCode = error.code;
            let notification;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                notification = 'You have signed up with a different provider for that email.';
            } else if(errorCode === 'auth/web-storage-unsupported'){
                notification = 'You cannot connnect to my.becode.org if you disable cookie';
            }else{
                notification = error.message;
            }
            self.setState({onGithubLoading: false});
            self.props.notifyError(notification ? notification : 'No Internet Connection');
        });
    }

    loadingUser(email){
        let users = this.state.users;
        if(users && users.length > 0 && email){
            for(let i in users){
                if(users[i].email === email){
                    return users[i];
                }
            }
            if(!this.state.user){
                return null
            }
        }
    }

    onSubmitGithub(){
        if(this.state.userData.email != ""){
            let user = this.loadingUser(this.state.userData.email);
            if(user){
                let accountInfo = {
                    email: this.state.userData.email,
                    password: this.state.userData.password,
                    profile: {
                        username: user.firstname,
                        lastname: user.lastname,
                        avatar: user.portrait,
                        promotion: user.promo_name,
                        role: "student",
                        promo_slug: slugify(user.promo_name)
                    }
                }
                Accounts.createUser(accountInfo, (err) => {
                    if(err){
                        this.props.notifyError(err.reason);
                        this.setState({onGithubLoading: false});
                    }else{
                        this.props.notifySuccess('Registered Successfully');
                        this.setState({ redirect: true })
                        this.setState({onGithubLoading: false});
                    }
                })
            }else{
                this.setState({ openModal: true });
            }
        }else{
            this.props.notifyError("We can't acces to your mail from GitHub");
            this.setState({onGithubLoading: false});
        }
    }

    onSubmitGithubWithoutInside(e){
        if(this.state.userData.email != ""){
            if(this.state.first_name != "" && this.state.last_name != "" && this.state.promotion != ""){
                let accountInfo = {
                    email: this.state.userData.email,
                    password: this.state.userData.password,
                    profile: {
                        username: this.state.first_name,
                        lastname: this.state.last_name,
                        avatar: this.state.userData.avatar,
                        role: "student",
                        promo_slug: slugify(this.state.promotion)
                    }
                }
                Accounts.createUser(accountInfo, (err) => {
                    if(err){
                        this.props.notifyError(err.reason);
                    }else{
                        this.props.notifySuccess('Registered Successfully');
                        this.setState({ redirect: true });
                    }
                })
            }else{
                this.props.notifyError("Complete the form");
            }
        }else{
            this.props.notifyError("Complete the form");
        }
    }

    handleClick(e){
        e.preventDefault();
        this.props.changeValue(0);
    }

    render() {
        const { openModal, redirect } = this.state;
        const { classes } = this.props;
        return(
            <div className={classes.paper + " cardLog"}>
                {redirect ? <Redirect to='/home' /> : ""}
                <div className={classes.topCard + " topCard"}>
                    <Typography align='center' variant="h5" gutterBottom>
                        Register
                    </Typography>
                </div>
                {!openModal ? 
                    <div className="registerLink">
                        {!this.state.onGithubLoading ? 
                            <div>
                                <Button color="secondary" onClick={this.GithubLogin.bind(this)} variant="extendedFab" aria-label="Github" className={classes.button}>
                                    <NavigationIcon className={classes.extendedIcon} />
                                    Sign in with Github
                                </Button>
                                <Typography align='center' variant="subtitle1" gutterBottom style={{marginTop: "100px"}}>
                                    <Button className={classes.button} onClick={this.handleClick.bind(this)}>
                                        You already got a accounts, please log in
                                    </Button>
                                </Typography>
                            </div>
                        :    
                            <CircularProgress className={classes.progress} size={50} />
                        }
                    </div>
                : 
                    this.githubModal()
                }
            </div>
        )
    }

    handleChangeStaff = event => {
        this.setState({ isStaff: event.target.value });
    };    

    githubModal = () =>{
        if(this.state.userData.email){
            let user = this.state.userData;
            let isStaff = this.state.isStaff;
            const { classes } = this.props;
            return(
                <div className="modalRegister">
                    <div className="formRegister">
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Are you part of the staff</FormLabel>
                            <RadioGroup
                                aria-label="staff"
                                name="staff"
                                className={classes.group}
                                value={isStaff}
                                onChange={this.handleChangeStaff}
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                        {isStaff === 'yes' ? 
                            <div className="row">
                                <form className="col s12" id="formRegister">
                                    <div className="imageGithub">
                                        <img src={user.avatar} alt="avatar" />
                                    </div>
                                    <div className="userGithub">
                                        <span className="emailGithub">
                                            {user.email}
                                        </span>
                                    </div>
                                    <TextField
                                        id="first_name"
                                        label="First Name"
                                        className={classes.textField}
                                        value={this.state.first_name}
                                        onChange={this.handleChange('first_name')}
                                        margin="normal"
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                <AccountCircle />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        id="last_name"
                                        label="Last Name"
                                        className={classes.textField}
                                        value={this.state.last_name}
                                        onChange={this.handleChange('last_name')}
                                        margin="normal"
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                <AccountCircle />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Button variant="contained" color="secondary" onClick={this.submitForm.bind(this)} className={classes.button}>
                                        Submit
                                    </Button>
                                    <Button component="span" onClick={this.handleModalClose.bind(this)} className={classes.button} style={{float: "right"}}>
                                        Cancel
                                    </Button>
                                </form>
                            </div>
                        :
                            isStaff === 'no' ?
                                <div style={{fontSize: "14px", textAlign: "justify"}}>
                                    Your account went bad. Please contact your coaches to check your account. When registering, you must not have a form to fill out.
                                </div>
                            : 
                                <div style={{fontSize: "14px", textAlign: "justify"}}>
                                    Any abuse is punishable, be correct
                                </div>
                        }
                    </div>
                </div>
            )
        }else{
            return(
                <div className="modalRegister">
                    Loader
                </div>
            )
        }
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Register)
