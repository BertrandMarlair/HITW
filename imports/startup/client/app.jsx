import { Meteor } from 'meteor/meteor';
import React      from 'react';
import ReactDOM   from 'react-dom';
import Main   from '../../ui/pages/Container/Main';
import './assets/style.css';

Meteor.startup(() => {
  ReactDOM.render(<Main />,document.getElementById('app'));
});