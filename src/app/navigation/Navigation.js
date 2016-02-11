import React, { Component } from 'react';
import { Navbar, NavBrand, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import actions from '../../redux/actions';
import { connect } from 'react-redux';

class Navigation extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { dispatch, history } = this.props;
    dispatch(actions.logOut(history));
  }

  render() {
    const { isAuthenticated } = this.props.auth.toObject();
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Boilerplate App</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <li>
              { isAuthenticated ?
                  <a onClick={this.handleLogout}>Logout</a> :
                    <Link to="/login">Login</Link> }
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default connect()(Navigation);
