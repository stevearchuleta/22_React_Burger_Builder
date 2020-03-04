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

export const purchaseBurger = (orderData, token) => { //asynchronous action creator 
   return dispatch => {
      dispatch(purchaseBurgerStart());
      axios.post( '/orders.json?auth=' + token, orderData )
      .then(response => {
         // console.log(response.data);
         dispatch( purchaseBurgerSuccess(response.data.name, orderData) ) ;
      } )
      .catch(error => {
         dispatch( purchaseBurgerFail(error) );
      } );
   };
};

export const purchaseInit = () => { //action creator
   return {
      type: actionTypes.PURCHASE_INIT
   };
};

export const fetchOrdersSuccess = (orders) => { //action creator
   return {
      type: actionTypes.FETCH_ORDERS_SUCCESS,
      orders: orders
   };
};

export const fetchOrdersFail = (error) => { //action creator
   return {
      type: actionTypes.FETCH_ORDERS_FAIL,
      error: error
   };
};

export const fetchOrdersStart = () => { //action creator
   return {
      type: actionTypes.FETCH_ORDERS_START
      
   };
};

export const fetchOrders = (token, userId) => { //asynchronous action creator
   return (dispatch, getState) => {
      dispatch(fetchOrdersStart());
      const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
      axios.get('/orders.json' + queryParams) //refers to Firebase orders.json node - reminder: I already set the base url as an axios instance in the imported file above.
      .then(res => {
         // console.log(res.data); //retruns the JS order object from Firebase
         const fetchedOrders = [];
         for (let key in res.data) {
               fetchedOrders.push({
                  //push a NEW object onto the fetchedOrders array by using the spread operator ... to distribute all of the properties of the JS order object from Firebase.
                  ...res.data[key], 
                  id: key //and add an id property whose value is the key of the order object (this unique key was created by Firebase and fetched herein. 
                  } );
         } 
         dispatch(fetchOrdersSuccess(fetchedOrders))
      } )
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
   };
};