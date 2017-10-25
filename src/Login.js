import React, { Component } from 'react';
import { firebaseAuth } from './firebase';

class Login extends Component {
  authenticateWithGoogle() {
    const provider = new firebaseAuth.GoogleAuthProvider();
    provider.addScope('https://www.google.com/m8/feeds');
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.addScope('https://www.googleapis.com/auth/user.phonenumbers.read');
    firebaseAuth()
      .signInWithRedirect(provider)
      .then(result => console.log({ resultHereWithId: result }));
  }

  authenticateWithFacebook() {
    const provider = new firebaseAuth.FacebookAuthProvider();
    firebaseAuth().signInWithRedirect(provider);
  }
  render() {
    return (
      <div>
        <h1>Please login</h1>
        <button onClick={this.authenticateWithGoogle}>Sign in with Google</button>
        <button onClick={this.authenticateWithFacebook}>Sign in with Facebook</button>
      </div>
    );
  }
}

export default Login;
