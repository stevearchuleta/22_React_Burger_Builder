import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => { //could possibley show a spinner
   return {
      type: actionTypes.AUTH_START 
   };
};

export const authSuccess = (token, userId) => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      idToken: token,
      userId: userId
   };
};

export const authFail = (error) => {
   return {
      type: actionTypes.AUTH_FAIL,
      error: error
   };
};

export const logout = () => {
   localStorage.removeItem('token');
   localStorage.removeItem('expirationDate');
   localStorage.removeItem('userId');

   return {
      type: actionTypes.AUTH_LOGOUT
   }
}

export const checkAuthTimeout = (expirationTime) => {
   return dispatch => {
      setTimeout(() => {
         dispatch(logout());
      }, expirationTime * 1000);
   };
};

export const auth = (email, password, isSignup) => { //auth action creator
  
   return dispatch => {
      //...authenticate the user
      dispatch(authStart())
      const authData = {
         email: email,
         password: password,
         returnSecureToken: true
      };
      //the following directs the request to different urls for different signup or signin modes
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZPFeh52a9mEA6Wsc1MUU1qzQ8cTL4Yjs';
      if (!isSignup) {
         url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZPFeh52a9mEA6Wsc1MUU1qzQ8cTL4Yjs';
      }
      axios.post(url, authData)
      .then(response => {
         console.log(response);
         const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
         localStorage.setItem('token', response.data.idToken); //store token in local storage
         localStorage.setItem('expirationDate', expirationDate); //store expirationDate in local storage  whenever a token is aquired (persist signin mode accross sessions)
         localStorage.setItem('userId', response.data.localId); //store token in local storage
         dispatch(authSuccess(response.data.idToken, response.data.localId));
         dispatch(checkAuthTimeout(response.data.expiresIn))
      })
      .catch(err => {
         // console.log(err);
         dispatch(authFail(err.response.data.error));
      });
   };
};

export const setAuthRedirectPath = (path) => {
   return {
      type: actionTypes.SET_AUTH_REDIRECT_PATH,
      path: path
   }
};

export const authCheckState = () => { //a utility action creator with conditional dispatches
   return dispatch => {
      const token = localStorage.getItem('token');
      if (!token) {
         dispatch(logout());
      } else {
         const expirationDate = new Date(localStorage.getItem('expirationDate'));
         if (expirationDate <= new Date()) {
            dispatch(logout());
         } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)); //amount of time remaining until an automatic logout occurs - yields expiration time in seconds - future date minus current data
         }
      }
   }
}