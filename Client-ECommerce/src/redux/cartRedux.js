import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name:'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action)=>{
            const found = state.products.find(
                element => element._id === action.payload._id
            )
            if(found){
                found.quantity += action.payload.quantity
            }
            else{
                state.products.push(action.payload)
            }
            state.quantity += action.payload.quantity;
            state.total += action.payload.price * action.payload.quantity;
        }
    }
})

export const {addProduct} = cartSlice.actions
export default cartSlice.reducer;