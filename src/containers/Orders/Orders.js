import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

   state = {
      orders: [],
      loading: true,

   }

   componentDidMount = () => {
      axios.get('/orders.json') //refers to Firebase orders.json node - reminder: I already set the base url as an axios instance in the imported file above.
         .then(res => {
            console.log(res.data); //retruns the JS order object from Firebase
            const fetchedOrders = [];
            for (let key in res.data) {
                  fetchedOrders.push({
                     //push a NEW object onto the fetchedOrders array by using the spread operator ... to distribute all of the properties of the JS order object from Firebase.
                     ...res.data[key], 
                     id: key //and add an id property whose value is the key of the order object (this unique key was created by Firebase and fetched herein. 
                     } 
                  )
            } 
            this.setState( {loading: false, orders: fetchedOrders} );
         })
         .catch(err => {
            this.setState( {loading: false} );
         });
   }

   render() {
      return (
         <div>
            <Order />
            <Order />
         </div>
      );
   }
}

export default withErrorHandler(Orders, axios);
