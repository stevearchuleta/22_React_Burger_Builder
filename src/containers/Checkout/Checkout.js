import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import  { connect } from 'react-redux';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
   // state ={
   //    ingredients: null,
   //    price: 0
   //    }

   // componentWillMount() {
   //    const query = new URLSearchParams(this.props.location.search); //extract the query parameters (ingredients) that were written to the URL by the purchaseContinueHandler method in the BurgerBuilder container, thereby parsing the user selected ingredients. URLSearchParams is a constructor method that returns a URLSearchParams object instance.
   //    const ingredients = {}; //add new ingredients object to store in the state
   //    let price = 0;
   //    for (let param of query.entries()) { // loop through the different query param strings (ingredients) such that each entry will have a key/value format in the new ingredients array, which allows for iteration through all key/value pairs contained in the new object instance.
   //       // E.g.: ['salad': '1']
         
   //       if (param[0] === 'price') {
   //          price = param[1]; // price is part of my query params in the URL (it was pushed there in the purchaseContinueHandler in the BurgerBuilder container), but I do not want to add price to the ingredients object, hence this conditional if statement.
   //       } else {
   //          ingredients[param[0]] = +param[1] //convert ingredient into a proper object format ([param[0]] is a property name that is added to the ingredient object; + turns a string into a number)
   //       }
   //    }
   //    this.setState( { ingredients: ingredients, totalPrice: price } );
   // };

   checkoutCancelledHandler = () => {
      this.props.history.goBack()
   }

   checkoutContinuedHandler = () => {
      this.props.history.replace('/checkout/contact-data');
   }

   render() {
      return(
         <div>
            <CheckoutSummary 
               ingredients={this.props.ings} 
               checkoutCancelled={this.checkoutCancelledHandler}
               checkoutContinued={this.checkoutContinuedHandler} />
               <Route 
                  path={this.props.match.path + '/contact-data'} 
                  component={ContactData}
                  // render={(props) => (
                     // <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>//props from this render method contains the history property (which is used in the axios.post method inside the ContactData.js file -- to redirect the user back to the BurgerBuilder home page after submitting order); therefore, I distribute all props into this ContactData component {...props} in order to use the history prop for the redirect
                  // )} 
                  />
         </div>
      )
   }
}

const mapStatetoProps = state => {
   return {
      ings: state.ingredients,
   }
}

export default connect(mapStatetoProps)(Checkout);