import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
   { ingredientLabel: 'Salad', type: 'salad' },
   { ingredientLabel: 'Bacon', type: 'bacon' },
   { ingredientLabel: 'Cheese', type: 'cheese' },
   { ingredientLabel: 'Meat', type: 'meat' }
];

const buildControls = ( props ) => (
   <div className={classes.BuildControls}>
      {controls.map(ctrl => (
         <BuildControl key={ctrl.label} ingredientLabel={ctrl.ingredientLabel} />
      ))}
   </div>
);

export default buildControls;