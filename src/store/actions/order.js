import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => { //syncronous action creator
   return {
      type: actionTypes.PURCHASE_BURGER_SUCCESS,
      orderID: id,
      orderData: orderData
   };
}; 

export const purchaseBurgerFail = (error) => { //syncronous action creator
   return {
      type: actionTypes.PURCHASE_BURGER_FAIL,
      error: error
   };
};

export const purchaseBurgerStart = () => { //action creator
   return {
         type: actionTypes.PURCHASE_BURGER_START
   };
};

export const purchaseBurger = (orderData) => { //asynchronous action creator 
   return dispatch => {
      dispatch(purchaseBurgerStart());
      axios.post( '/orders.json', orderData )
      .then(response => {
         console.log(response.data);
         dispatch( purchaseBurgerSuccess(response.data.name, orderData) ) ;
      } )
      .catch(error => {
         dispatch( purchaseBurgerFail(error) );
      } );
   };
};