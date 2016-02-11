import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navigation from '../navigation/Navigation';

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <Navigation auth = {this.props.auth} history = { this.props.history } />
        <div className="container">
          { this.props.children }
        </div>
      </div>
    );
  }
}

App.contextTypes = {
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(App);
