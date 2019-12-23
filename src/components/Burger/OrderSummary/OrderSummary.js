import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
      //componentWillUpdate is no longer recommended by react, but this lifecycle hook was added as a testing/learning activity. Therefore, this particular component could be changed back into a functional component. 
      componentWillUpdate() {
         console.log('[OrderSummary] WillUpdate');
      }
  
         render() {

   const ingredientSummary = Object.keys(this.props.ingredients)  //transofrm the expected ingredients from an object to an array
   .map(igKey => {
   return (
      <li key={igKey}>
         <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
      </li> );
   });

     return (
      <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
         {ingredientSummary}
      </ul>
<p><strong>TOTAL PRICE: ${this.props.price.toFixed(2)}</strong></p>
      <p>Would you like to continue to the checkout page?</p>
     <Button btnType="Danger" clicked={this.props.purchaseCancelled}>C A N C E L</Button>
     <Button btnType="Success" clicked={this.props.purchaseContinued}>C O N T I N U E</Button>
   </Aux>
     )
  }
}

export default OrderSummary;