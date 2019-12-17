import React from 'react'
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  
      const ingredientSummary = Object.keys(props.ingredients)  //transofrm the expected ingredients from object format to an array
         .map(igKey => {
         return (
            <li key={igKey}>
               <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li> );
         });
      
   return (
      <Aux>
         <h3>Your Order</h3>
         <p>A delicious burger with the following ingredients:</p>
         <ul>
            {ingredientSummary}
         </ul>
         <p>Would you like to continue to the checkout page?</p>
        <Button btnType="Danger" clicked={props.purchaseCancelled}>C A N C E L</Button>
        <Button btnType="Success" clicked={props.purchaseContinued}>C O N T I N U E</Button>
      </Aux>
   )
}

export default orderSummary;