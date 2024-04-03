import { createStore,combineReducers,applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import Axios from "axios";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
const persistConfig = {
    key: 'root',
    storage,
  }
   
   
const initialState={
    products:[],
    cart:[],
    matcheditems:[]
};
export const addProducts=(data)=>{
    return{
        type:"ADD_PRODUCTS",
        payload:data
    }
}
export const searchMatchedItems=(data)=>{
    return{
        type:"SEARCH_MATCHEDITEMS",
        payload:data,
    }
}
export const logOutState=()=>
{
    return{
        type: 'LOG_OUT'
    }
}
export const addProductsToCart=(data,count)=>
{
    return{
        type:"ADD_PRODUCTS_TO_CART",
        payload:{data,count}
    }
}
export const removeProductsFromCart=(data,count)=>
{
    return{
        type:"REMOVE_PRODUCTS_FROM_CART",
        payload:{data,count}
    }
}
const addProductsReducers=(state=initialState,action)=>
{
    switch(action.type)
    {
        case "ADD_PRODUCTS":
            return {
                ...state,
                products:action.payload,
            }
        case "ADD_PRODUCTS_TO_CART":
            if(action.payload.count>1)
            {
                let index=state.cart.findIndex(val=>val.title===action.payload.data.title)
                let updatedCart = [...state.cart];
                
                if (index !== -1) {
                    updatedCart[index] = {
                        ...action.payload.data,
                        count: action.payload.count
                    };
                } else {
                    updatedCart = [...state.cart, { ...action.payload.data, count: action.payload.count }];
                }

                return {
                    ...state,
                    cart: updatedCart
                };
            }
            return{
                ...state,
                cart:[...state.cart,{...action.payload.data,count:action.payload.count}]
            }
        case "REMOVE_PRODUCTS_FROM_CART":
            if(action.payload.count===0)
            {
                let index=state.cart.findIndex(val=>val.title===action.payload.data.title)
                let updatedCart=[...state.cart]
                updatedCart.splice(index,1)
                return{
                    ...state,
                    cart:updatedCart
                }
            }
            else
            {
                let index=state.cart.findIndex(val=>val.title===action.payload.data.title)
                let updatedCart=[...state.cart]
                updatedCart[index].count=action.payload.count
                return{
                    ...state,
                    cart:updatedCart
                }
            }
        case "SEARCH_MATCHEDITEMS":
            let regex=new RegExp(action.payload,"i");
            let matcheditemsarr=state.products.filter((val)=>regex.test(val.title));
            return{
                ...state,
                matcheditems:matcheditemsarr
            }
        case 'LOG_OUT':
            return {
                ...state,
                cart:[],
                matcheditems:[]
            };
        default:
            return state
    }
    
}

const rootReducer=combineReducers({
    product:addProductsReducers,
})


const persistedReducer = persistReducer(persistConfig, rootReducer);
export const productstore=createStore(persistedReducer,applyMiddleware(thunk));
export let persistor = persistStore(productstore);

const getAllProducts=()=>
{
    return dispatch=>
    {
        Axios.get("https://fakestoreapi.com/products").then(output=>
        {
            const prodarray=output.data.map((val)=>
            {
                return {...val,price:Math.floor(val.price*85)}
            })
            dispatch(addProducts(prodarray))
            
        })
    }
}

productstore.dispatch(getAllProducts())

console.log(productstore.getState());