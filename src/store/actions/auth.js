import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => { //could possibley show a spinner
   return {
      type: actionTypes.AUTH_START 
   };
};

export const authSuccess = (authData) => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      authData: authData
   };
};

export const authFail = (error) => {
   return {
      type: actionTypes.AUTH_FAIL,
      error: error
   };
};

export const auth = (email, password) => {
  
   return dispatch => {
      //...authenticate the user
      dispatch(authStart())
      const authData = {
         email: email,
         password: password,
         returnSecureToken: true
      };
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZPFeh52a9mEA6Wsc1MUU1qzQ8cTL4Yjs', authData)
      .then(response => {
         console.log(response);
         dispatch(authSuccess(response.data));
      })
      .catch(err => {
         console.log(err);
         dispatch(authFail(err));
      });
   };
};