import React from 'react';
import classes from './Input.css';

const input = (props) => {
   let inputElement = null;
   
   switch (props.inputtype) {
      case ('input'):
         inputElement = <input className={classes.ImputElement}{...props}/>; //distribute props on input element, because I expect to receive the attributes that I set on an input in ContactData.js file as props for my input wrapper. In other words, I only need to set the inputtype prop (in switch), then I pass any default HTML attributes from ContactData.js that I set on my Input component. 
         break;
      case ('textarea'):
         inputElement = <textarea className={classes.ImputElement}{...props}/>;//distribute props on textarea element, because I expect to receive the attributes that I set on a textarea in ContactData.js file as props for my textarea wrapper. In other words, I only need to set the inputtype prop (in switch), then I pass any default HTML attributes from ContactData.js that I set on my textarea. 
         break;
      default:
         inputElement = <input className={classes.ImputElement}{...props}/>;
   }

   return(
   <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
   </div>

   )
};


export default input;