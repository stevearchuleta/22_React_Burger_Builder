import * as actionTypes from './actions';

const initialState = {
   ingredients: {
      lettuce: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
   },
   totalPrice: 4
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.ADD_INGREDIENT:
         return {
            ...state,
            ingredients: {
               ...state.ingredients,
               [action.ingredientName]: state.ingredients[action.ingredientName] + 1 //either lettuce, bacon, cheese, or meat will be added when receiving a new action
            }
         };
      case actionTypes.REMOVE_INGREDIENT:
         return {
            ...state,
            ingredients: {
               ...state.ingredients,
               [action.ingredientName]: state.ingredients[action.ingredientName] - 1 //either lettuce, bacon, cheese, or meat will be removed when receiving a new action
            }
         };
      default:
         return state;
   }
};

export default reducer;