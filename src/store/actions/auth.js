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

export const auth = (email, password, isSignup) => {
  
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
         dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch(err => {
         // console.log(err);
         dispatch(authFail(err.response.data.error));
      });
   };
};