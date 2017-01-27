import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class Login extends Component {
  constructor() {
    super();
    this.state = { 
      email: '',
      password: '',
      error: ''
    };
  }

  login(e) {
    const { signIn } = this.props;
    const { email, password } = this.state;

    if (!this.validateEmail(email)) {
      this.setState({
        error: 'Invalid Email'
      });
    } else {
      fetch('http://localhost:3001/authenticate', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
      })
      .then(response => {
        if (!response.ok) {
          this.setState({
            error: 'Invalid Credentials'
          });
        }
        else {
          response.json().then(user => signIn(user));
          browserHistory.push('/dashboard');
        }
      })
      .catch(error => {
        signInFailed(error);
      });
    }
  }

  validateEmail(email) {
    return email.includes('foo');
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({[name]: value });
  }

  render() {
    const { email, password, error } = this.state;
    const { user } = this.props;

    return (
      <div id="login">
        { error && <p className='errorMessage'>{error}</p>}
        <label>
          Email: <br/>
          <input type='text' value={email || user.email} name='email' onChange={this.handleChange.bind(this)}/>
        </label>
        <label>
          Password: <br/>
          <input type='text' value={password} name='password' onChange={this.handleChange.bind(this)}/>
        </label>
        <button onClick={this.login.bind(this)}>Login</button>
      </div>
    )
  }
}
