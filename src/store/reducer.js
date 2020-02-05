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

const INGREDIENT_PRICES = {
   lettuce: 0.5,
   bacon: 0.7,
   cheese: 0.4,
   meat: 1.3
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.ADD_INGREDIENT:
         return {
            ...state,
            ingredients: {
               ...state.ingredients,
               [action.ingredientName]: state.ingredients[action.ingredientName] + 1 //either lettuce, bacon, cheese, or meat will be added when receiving a new action
            },
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
         };
      case actionTypes.REMOVE_INGREDIENT:
         return {
            ...state,
            ingredients: {
               ...state.ingredients,
               [action.ingredientName]: state.ingredients[action.ingredientName] - 1 //either lettuce, bacon, cheese, or meat will be removed when receiving a new action
            },
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
         };
      default:
         return state;
   }
};

export default reducer;