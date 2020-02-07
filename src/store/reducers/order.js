import * actionTypes from '../actions/actionTypes';


const initailState = {
   orders: [],
   loading: false
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.PURCHASE_BURGER_SUCCESS:
         const newOrder = {
            ...action.orderData,
            id: action.orderID
         };
         return {
            ...state,
            loading: false,
            orders: state.orders.concat(newOrder) //add orders immutably because concat returns a new array
         };
      case actionTypes.PURCHASE_BURGER_FAIL:
         return {
            ...state,
            loading: false
         };
      default:
         return state;
   }
};

export default reducer;