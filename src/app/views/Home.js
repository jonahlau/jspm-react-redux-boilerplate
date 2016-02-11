import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div>This is the Home view.</div>
        <Link to="/protected">Protected</Link>
      </div>
    );
  }
}

export default Home;
