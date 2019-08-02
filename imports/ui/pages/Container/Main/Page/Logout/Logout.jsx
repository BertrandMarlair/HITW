import React, { Component } from 'react'

class Logout extends Component{
    componentDidMount(){
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

    render(){
        return(
            <div>Logout</div>
        )
    }
}

export default Logout