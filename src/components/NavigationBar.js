import React from 'react';
import { Link } from 'react-router-dom';
import {startLoginGoogle, startLogout} from "../actions/authentication";
import { connect } from 'react-redux'
import { firebase } from "../firebase/firebase";
import LoginModal from './LoginModal';

class NavigationBar extends React.Component{

  state = {
    loginModal: false,
  };

  handleLoginModal = () => {this.setState((prevState) => ({ loginModal: !prevState.loginModal }))};

  handleLogout = () => {
    this.props.startLogout();
  };

  render(){
    return(
      <menu className="navigation">

        {
          this.props.uid ? (
            <button className="navigation__user">
              <img className="navigation__user--image"
                   onClick={this.handleLogout}
                   src={firebase.auth().currentUser.photoURL}/>
            </button>
          ) : (
            <button className="navigation__login"
                    onClick={this.handleLoginModal}>
              Sign in
            </button>
          )
        }

        <Link to="/">
          Run
        </Link>

        <Link to="/data">
          Data
        </Link>

        <Link to="/settings">
          Settings
        </Link>

        {this.state.loginModal &&
        <LoginModal handleLoginModal={this.handleLoginModal}/>}

      </menu>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
});

const mapStateToProps = (state) => ({
  uid: state.auth.uid
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)