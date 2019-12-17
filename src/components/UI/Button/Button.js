import React from 'react';
import classes from './Button.css';

const button = ( props ) => (
   <button
   className={[classes.Button, classes[props.btnType]].join(' ')} //this is now a string list of classes with btnType referring to either Success button or Danger button.
      onClick={props.clicked} >{props.children}</button>
   
);

export default button;