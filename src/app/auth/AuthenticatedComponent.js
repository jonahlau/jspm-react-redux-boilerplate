import React from 'react';
import { connect } from 'react-redux';

export default function requireAuthentication(component) {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps() {
      this.checkAuth();
    }

    checkAuth() {
      const { isAuthenticated, location, history } = this.props;

      if (!isAuthenticated) {
        const redirectAfterLogin = location.pathname;
        history.pushState(null, '/login', { next: redirectAfterLogin });
      }
    }

    render() {
      const { isAuthenticated } = this.props;

      return (
        <div>
          { isAuthenticated ? <component { ...this.props } /> : <div>Not allowed sorry</div> }
        </div>
      );
    }
  }

  function mapStateToProps(state) {
    return {
      token: state.auth.token,
      username: state.auth.username,
      isAuthenticated: state.auth.isAuthenticated,
    };
  }

  return connect(mapStateToProps)(AuthenticatedComponent);
}
