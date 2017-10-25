import React from 'react';
import PropTypes from 'prop-types';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Redirect from 'react-router-dom/Redirect';
import Send from './Send';
import AuthenticatedRoute from './AuthenticatedRoute';
import Login from './Login';
import firebase, { firebaseAuth, ref } from './firebase';
import Feed from './Feed';
import Profile from './tabs/Profile';
import './App.css';

const createHeaders = token => new Headers({
  'Access-Control-Allow-Origin': '*',
  'GData-Version': 3.0,
  Authorization: 'Bearer ' + token
});
const getFetchOptions = headers => ({
  mode: 'cors',
  ...headers,
});

const profileFields = ['email', 'phoneNumber', 'photoUrl', 'displayName'];
class App extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };
  state = {
    authenticated: false,
    checkingAuthStatus: true,
  };
  componentDidMount() {
    this.setState({ checkingAuthStatus: true });
    firebaseAuth().onAuthStateChanged(user => {
      // console.log('we are logged in here?', {user})
      if (user) {
        const dbUser = ref.child(`users/${user.uid}`);
        const profileInfo = profileFields.filter(field => dbUser[field] || user[field]).reduce(
          (prev, field) => ({
            ...prev,
            [field]: dbUser[field] || user[field],
          }),
          {},
        );
        // user
        //   .getIdToken(true)
        //   .then(token => {
            
        //   })
        //   .then(result => console.log({resultsssss: result}) || result)
        //   .then(result => result.json())
        //   .then(result => console.log({ result }))
        //   .catch(err => console.log({ err }));
        this.setState({
          authenticated: true,
          checkingAuthStatus: false,
        });

        console.log('this user right here', { user });

        // only get this on redirect result on login. need to clear cache if want to get it again
        return dbUser
          .update({ profile: profileInfo })
          .then(() => firebase.auth().getRedirectResult())
          .then(result => {
            if (result.credential) {
              const { accessToken: token } = result.credential;
              const headers = createHeaders(token);
              const fetchOptions = getFetchOptions(headers);
              console.log({ 'from user on auth change': token });
              fetch(
                'https://people.googleapis.com/v1/people/me/connections?personFields=names,phoneNumbers&access_token=' + token,
                fetchOptions,
              ).then(result => result.json())
              .then(result => console.log({ result }))
            }
            console.log({ fromGetRedirectResult: result });
          });
      } else {
        this.setState({
          authenticated: false,
          checkingAuthStatus: false,
        });
      }
    });

    // TODO: if account wxists with different credentials, prompt user to log in with their originl account and then *LINK*
  }
  render() {
    const { authenticated, checkingAuthStatus } = this.state;
    return !checkingAuthStatus ? (
      <Switch>
        <AuthenticatedRoute isAuthed={authenticated} exact path="/" component={Feed} />
        <AuthenticatedRoute isAuthed={authenticated} exact path="/send" component={Send} />
        <AuthenticatedRoute isAuthed={authenticated} exact path="/profile" component={Profile} />
        <Route
          exact
          path="/login"
          render={props => (authenticated === true ? <Redirect to="/" /> : <Login {...props} />)}
        />
      </Switch>
    ) : null;
  }
}

export default App;
