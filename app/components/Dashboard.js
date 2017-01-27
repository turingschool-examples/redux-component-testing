import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Dashboard extends Component {
  render() {
    const { username } = this.props;

    return (
      <div id="dashboard">
        <p>Welcome to the dashboard <b>{username}</b></p>
        { !username && <p>Please <Link to="login">login</Link></p>}
      </div>
    )
  }
}
