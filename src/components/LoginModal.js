import React from 'react';
import { connect } from 'react-redux'
import { startLoginGoogle, startLoginFacebook } from '../actions/authentication';
const facebook = require('../images/facebook.svg');
const google = require('../images/google.svg');


const LoginModal = (props) => (

  <div className="modal-container">
    <div className="modal-container__background"
         onClick={props.handleLoginModal} >
      <div className="login-modal">

        <h2>Choose a sign in method</h2>

        <button className="login-modal__button login-modal__button--facebook"
                onClick={props.startLoginFacebook}>
          <img src={facebook} alt="" className="login-modal__image--facebook"/>
          <p>Login with Facebook</p>
        </button>

        <button className="login-modal__button login-modal__button--google"
                onClick={props.startLoginGoogle}>
          <img src={google} alt="" className="login-modal__image--google"/>
          <p>Login with Google</p>
        </button>

        {/*<button className="login-modal__close"*/}
                {/*onClick={props.handleLoginModal}>*/}
          {/*Close*/}
        {/*</button>*/}
      </div>
    </div>
  </div>

);

const mapDispatchToProps = dispatch => ({
  startLoginGoogle: () => dispatch(startLoginGoogle()),
  startLoginFacebook: () => dispatch(startLoginFacebook()),
});

export default connect(undefined, mapDispatchToProps)(LoginModal);