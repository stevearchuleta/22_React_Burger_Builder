import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => { //action creator
   return {
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: name //payload
   };
};

export const removeIngredient = (name) => { //action creator
   return {
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: name //payload
   };
};

export const setIngredients = (ingredients) => { //action creator
   return {
      type: actionTypes.SET_INGREDIENTS,
      ingredients: ingredients //payload
   }
};

export const fetchIngredientsFailed = () => {
   return {
      type: actionTypes.FETCH_INGREDIENTS_FAILED, //action creator
   }
};

export const initIngredients = () => { //async action creator
   return dispatch => {
      axios.get('https://react-my-burger-5e060.firebaseio.com/ingredients.json')
      .then(response => {
         dispatch(setIngredients(response.data));
      } )
      .catch( error => {
         dispatch(fetchIngredientsFailed())
         });
   };
};