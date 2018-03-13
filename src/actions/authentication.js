import { firebase, googleAuthProvider, facebookAuthProvider } from '../firebase/firebase';

export const login = uid => ({
  type: 'LOGIN',
  uid
});

export const startLoginGoogle = () => {
  return dispatch => {
    return firebase.auth().signInWithRedirect(googleAuthProvider);
  };
};

export const startLoginFacebook = () => {
  return dispatch => {
    return firebase.auth().signInWithRedirect(facebookAuthProvider);
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return dispatch => {
    return firebase.auth().signOut()
      .then(() => {
        window.location.replace("http://thedapperdeveloper.com");
      });
  };
};
