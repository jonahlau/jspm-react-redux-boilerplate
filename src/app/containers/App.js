import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <nav>Navbar</nav>
        <div className="container">
          { this.props.children }
        </div>
      </div>
    )
  }
}

App.contextTypes = {
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(App);