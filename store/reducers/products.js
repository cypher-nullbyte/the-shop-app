import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "../actions/products";

const initalState={
    availableProducts:PRODUCTS,
    userProducts:PRODUCTS.filter(prod=>prod.ownerId==='u1'),
};


export default productsReducer=(state=initalState,action)=>{
    switch(action.type)
    {
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts:state.userProducts.filter(product=>product.id!==action.pid),
                availableProducts:state.availableProducts.filter(product=>product.id!==action.pid),
            };
        case CREATE_PRODUCT:
            const newProduct=new Product((new Date).toString(),'u1',action.productData.title,
                action.productData.imageUrl,action.productData.description,
                action.productData.price);
            return{...state,
                availableProducts:state.availableProducts.concat(newProduct),
                userProducts:state.userProducts.concat(newProduct),
            };
        case UPDATE_PRODUCT:
            const productIdx=state.userProducts.findIndex(prod=>prod.id===action.pid);
            const updatedProduct=new Product(action.pid,state.userProducts[productIdx].ownerId,
                action.productData.title,action.productData.imageUrl,
                action.productData.description,state.userProducts[productIdx].price);
            const updatedUserProducts=[...state.userProducts];
            updatedUserProducts[productIdx]=updatedProduct;
            const avlProdIdx=state.availableProducts.findIndex(prod=>prod.id===action.pid);    
            const updatedAvlProds=[...state.availableProducts]; 
            updatedAvlProds[avlProdIdx]=updatedProduct;
            return{
                ...state,
                availableProducts:updatedAvlProds,
                userProducts:updatedUserProducts,
            };
        
        default:
            return state;
    }
}