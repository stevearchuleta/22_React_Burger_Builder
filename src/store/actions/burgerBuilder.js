import * as actionTypes from './actionTypes';

export const addIngredient = (name) => { //action creator
   return {
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: name
   };
};

export const removeIngredient = (name) => { //action creator
   return {
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: name
   };
};