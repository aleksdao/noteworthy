import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';

class AuthenticatedRoute extends Component {
  render() {
    const { isAuthed, component: Component, ...rest } = this.props;
    console.log(this.props, rest);
    return (
      <Route
        {...rest}
        render={props => (isAuthed ? <Component {...props} /> : <Redirect to="login" />)}
      />
    );
  }
}

export default AuthenticatedRoute;
