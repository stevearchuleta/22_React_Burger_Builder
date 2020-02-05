import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {
   
   // constructor(props) {
   // super(props)
   // this.state = {...}
   // }
   state = {
      purchasing: false,
      loading: false,
      error: false
   }

   componentDidMount() {
      console.log(this.props); //notice in DevTools that I have access to the history, location, and match props...this is because the Route object loads the BurgerBuilder component in App.js
      // axios.get('https://react-my-burger-5e060.firebaseio.com/ingredients.json')
      //    .then(response => {
      //       this.setState( { ingredients: response.data } );
      //    })
      //       .catch(error => {
      //          this.setState({error: true})
      //       });
   }

   purchaseHandler = () => {
      this.setState({purchasing: true});
   }

   purchaseCancelHandler = () => {
      this.setState({purchasing: false});
   }

   purchaseContinueHandler = () => {
      // // alert("You Continue!")
      //const queryParams = []; 
      //now push ingredients into this array in an encoded manner; i is the key (property names of the ingredients - meat, cheese, lettuce, bacon).
      // for (let i in this.state.ingredients) {
      //    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
      // } 
      //use JS helper method (encodedURIComponent), so that the user-selected ingredients can be coded into the URL; i is the key (property names of the ingredients - meat, cheese, lettuce, bacon): therefore... property name string = property value string.
      // queryParams.push('price=' + this.state.totalPrice);
      // const queryString = queryParams.join('&') //join strings.
      this.props.history.push('/checkout');
      // this.props.history.push({
      //    pathname: '/checkout',
      //    search: '?' + queryString //push queryString to the history URL
      // });
   }

   updatePurchaseState (ingredients) {
      const sum = Object.keys(ingredients) //in order to sum up all of the ingreients, I first convert the ingredients object into an array of string entries ('salad', 'bacon', 'cheese', 'meat').
         .map(igKey => {
            return ingredients[igKey] // yeilds an array of values (a particular value for a given key).
         })
         .reduce((sum, el) => {
            return sum + el; //reduce the array to a single number: the sum that represents a total amount of ingredients.
         }, 0); //zero (the second argument) is the starting number...
      return sum > 0;
   }
   
   render() {
      const disabledInfo = {
         ...this.props.ings
      };
      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0 //loop through all of the keys in disabledInfo to check if any are less than or equal to zero. if so, a true value will disable the button
      }
      //form of my restructured object {salad: true, meat: false, etc...}
      
      let orderSummary = null;
      let burger = this.state.error ? <p>Ingredients cannot be loaded at this time.</p> : <Spinner />
      
      if (this.props.ings) {
         burger = (
            <Aux>
   
               <Burger ingredients={this.props.ings} />
               <BuildControls 
               ingredientAdded={this.props.onIngredientAdded}
               ingredientRemoved={this.props.onIngredientRemoved}
               disabled={disabledInfo}
               purchasable={this.updatePurchaseState(this.props.ings)}
               ordered={this.purchaseHandler}
               price={this.props.price} />
            
            </Aux>
         );
         orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            price={this.props.price}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
      }

      if (this.state.loading) {
         orderSummary = <Spinner />
      }

      return (
         <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
               {orderSummary}
            </Modal>
            {burger}
          
         </Aux>
      );
   }
}

const mapStateToProps = state => {
   return {
      ings: state.ingredients,
      price: state.totalPrice
   };
}

const mapDispatchToProps = dispatch => {
   return {
      onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
      onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));