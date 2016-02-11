import React, { PropTypes } from 'react';
import { Input, ButtonInput } from 'react-bootstrap';
import actions from '../../redux/actions';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const email = this.refs.input__username.getValue();
    const password = this.refs.input__password.getValue();
    dispatch(actions.logInUser(email, password, this.props.history));
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <form>
          <Input ref="input__username" type="text" label="Username" />
          <Input ref="input__password" type="password" label="Password" />
          <ButtonInput type="submit" onClick={ (e) => this.handleSubmit(e) } />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Login);
