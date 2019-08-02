import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class NotConnected extends Component {
    redirect(){
        if(!Meteor.userId()){
            return <Redirect to='/' />
        }
    }

    render() { 
        return (
            <div>
                {this.redirect()}
            </div>
        )
    }
}
 
export default NotConnected;