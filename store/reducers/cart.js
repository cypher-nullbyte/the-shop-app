import CartItem from "../../models/cart-item";
import { ADD_TO_CART } from "../actions/cart";

const initialState={
    items: {},
    totalAmount: 0,

};


export default cartReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case ADD_TO_CART:
            const addedProduct=action.product;
            const prodPrice=addedProduct.price;
            const prodTitle=addedProduct.title;

            let updatedOrNewCarItem;

            if(state.items[addedProduct.id]){
                updatedOrNewCarItem=new CartItem(
                    state.items[addedProduct.id].quantity+1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum+prodPrice
                );
                
            }
            else{
                updatedOrNewCarItem=new CartItem(1,prodPrice,prodTitle,prodPrice);
            } 
            return{
                ...state,
                items:{...state.items,[addedProduct.id]:updatedOrNewCarItem},
                totalAmount:state.totalAmount+prodPrice,
            }      
    }
    return state;
};