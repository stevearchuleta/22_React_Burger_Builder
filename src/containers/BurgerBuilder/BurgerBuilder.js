import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
         salad: 0.5,
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
         salad: 0,
         bacon: 0,
         cheese: 0,
         meat: 0
      },
      totalPrice: 4,
      
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
      this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
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
      this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
   }

   render() {
      const disabledInfo = {
         ...this.state.ingredients //immutable clone of ingredients object
      };
      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0 //loop through all of the keys in disabledInfo to check if any are less than or equal to zero. if so, a true value will disable the button
      }
      //form of my restructured object {salad: true, meat: false, etc...}
      
      return (
         <Aux>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls 
               ingredientAdded={this.addIngreientHandler}
               ingredientRemoved={this.removeIngreientHandler}
               disabled={disabledInfo}
               />
         </Aux>
      );
   }
}

export default BurgerBuilder;