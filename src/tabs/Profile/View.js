import React from 'react';
import Header from '../Header';
import firebase from '../../firebase';

const authenticateWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}


class View extends React.Component {
  render() {
    const { photoURL } = firebase.auth().currentUser;
    return (
      <div>
        <Header headerClasses="bb" headerStyles={{ borderColor: '#'}}>
          <h3 className="tc mb0 mt0">Profile</h3>
        </Header>
        <div className="flex flex-column ph3 pt4">
          <div className="flex justify-between">
            <h3>Photo</h3>
            <img src={photoURL} height="100" width="100"/>
          </div>
          <button onClick={authenticateWithFacebook}>Link Facebook</button>
        </div>
      </div>
    );
  }
}

export default View;
