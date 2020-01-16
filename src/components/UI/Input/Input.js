import React from 'react';
import classes from './Input.css';

const input = (props) => {
   let inputElement = null;
   
   switch ( props.elementType ) {
      case ('input'):
         inputElement = <input 
            className={classes.ImputElement}
            {...props.elementConfig}//distribute props on input element, because I expect to receive the attributes that I set on the state in ContactData.js file as elementConfig props for my input wrapper. In other words, I only need to set the elementType prop (in switch), then I pass any default HTML attributes from ContactData.js that I set on my Input component. 
            value={props.value}/>; 
         break;
      case ('textarea'):
         inputElement = <textarea 
            className={classes.ImputElement}
            {...props.elementConfig} //distribute props on textarea element, because I expect to receive the attributes that I set on the state in ContactData.js file as props for my textarea wrapper. In other words, I only need to set the elementType prop (in switch), then I pass any default HTML attributes from ContactData.js that I set on my Input component. 
            value={props.value}/>;
         break;
         case ('select'):
            inputElement = (
            <select 
               className={classes.ImputElement}
               value={props.value}>
              {props.elementConfig.options.map(option =>  (
                 <option value={option.value}>
                    {key.optionValue}
                    {option.displayValue}
                 </option>
              ))};
            </select>
            );
         break;
      default:
         inputElement = <input 
            className={classes.ImputElement}
            {...props.elementConfig} 
            value={props.value}/>;
   }

   return(
   <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
   </div>

   )
};


export default input;