import React from 'react';

export default class SignIn extends React.Component {
  constructor() {
    super();
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('SUBMITTING.!!!..');
    // TODO: handle authentication with backend DB

    const self = this;
    // TODO: Refactor to use RxJS
    let username = document.getElementById('username-input').value || 'temp username';
    let password = document.getElementById('password-input').value || 'temp password'

    let url = 'http://localhost:3000/signin';
    let options = {
      method: 'POST', 
      body: JSON.stringify({username: username, pw: password}),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(url, options)
      .then(res => { 
        if (res.status === 200) {
          console.log('user creds check out')
          // TODO: redirect to profile page 
          window.location.href = 'http://localhost:3000/profile';
        } else {
          console.log('user creds do NOT check out')
          // TODO: handle error
        }
      })
      .catch(self.handleError);
  }

  handleError(e) {
    console.log('[ERROR] Error submitting : ', e);
  }

  render() {
    return (
      <div id='auth-form-container'>
        <div id='app-logo'>GoRep</div>
        <div id="login-form-title">Log In </div>
        <form id='login-form' onSubmit={this.handleSubmit.bind(this)}>
          <input id='username-input' placeholder='username' />
          <input id='password-input' placeholder='password' />
          <button id='login-button' type='submit'> Submit </button>
        </form>
      </div>
    )
  }
}