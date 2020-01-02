import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
         lettuce: 0.5,
         bacon: 0.7,
         cheese: 0.4,
         meat: 1.3
}

class BurgerBuilder extends Component {
   
   // constructor(props) {
   // super(props)
   // this.state = {...}
   // }
   state = {
      ingredients: {
         lettuce: 0,
         bacon: 0,
         cheese: 0,
         meat: 0
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false
   }


   purchaseHandler = () => {
      this.setState({purchasing: true});
   }

   purchaseCancelHandler = () => {
      this.setState({purchasing: false});
   }

   purchaseContinueHandler = () => {
      // alert("You Continue!")
      this.setState({ loading: true });
      const order = {
         ingredients: this.state.ingredients,
         price: this.state.totalPrice,
         customer: {
            name: 'Steve Archuleta',
            address: {
               streetAddress: '6958 Treasure Way',
               city: 'Sacramento',
               state: 'California' 
            },
         email: 'stevearchuleta@me.com'
         },
         deliveryMethod: 'Uber Eats'

      }
      
      axios.post('/orders.json', order)
         .then(response => {
            this.setState({ loading: false, purchasing: false });
         } )
         .catch(error => {
            this.setState({ loading: false, purchasing: false });
         } );

   }

   updatePurchaseState (ingredients) {
      const sum = Object.keys(ingredients) //in order to sum up all of the ingreients, I first convert the ingredients object into an array of string entries ('salad', 'bacon', 'cheese', 'meat').
         .map(igKey => {
            return ingredients[igKey] // yeilds an array of values (a particular value for a given key).
         })
         .reduce((sum, el) => {
            return sum + el; //reduce the array to a single number: the sum that represents a total amount of ingredients.
         }, 0); //zero (the second argument) is the starting number...
      this.setState({purchasable: sum > 0});
   }

   addIngreientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
         ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
      this.updatePurchaseState(updatedIngredients);
   }

   removeIngreientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      if(oldCount <= 0) {
         return; //now nothing will happen if user tries to reduce an ingredient into negative territory (I do not want a negative array length error).
      }
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
         ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceDeduction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
      this.updatePurchaseState(updatedIngredients);
   }

   render() {
      const disabledInfo = {
         ...this.state.ingredients //immutable clone of ingredients object
      };
      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0 //loop through all of the keys in disabledInfo to check if any are less than or equal to zero. if so, a true value will disable the button
      }
      //form of my restructured object {salad: true, meat: false, etc...}
      
      let orderSummary = <OrderSummary 
      ingredients={this.state.ingredients}
      price={this.state.totalPrice}
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler} />

      if (this.state.loading) {
         orderSummary = <Spinner />
      }

      return (
         <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
               {orderSummary}
            </Modal>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls 
               ingredientAdded={this.addIngreientHandler}
               ingredientRemoved={this.removeIngreientHandler}
               disabled={disabledInfo}
               purchasable={this.state.purchasable}
               ordered={this.purchaseHandler}
               price={this.state.totalPrice}
               /> 
         </Aux>
      );
   }
}

export default withErrorHandler(BurgerBuilder, axios);