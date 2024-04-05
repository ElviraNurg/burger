import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredientType } from "../../types/burger";
import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../utils/constants/constants";

interface ConstructorState {
    orderItems: {
        bun: IIngredientType[],
        otherIngridients: IIngredientType[]
    },
    orderNumber: { number: number | null },
    loading: boolean;
    error: any;
}

const InitialState: ConstructorState = {
    orderItems: {
        bun: [],
        otherIngridients: []
    },
    orderNumber: { number: null },
    loading: false,
    error: null
}
export const getOrder = createAsyncThunk(
    'getOrder',
    async function (action: {}, { rejectWithValue }) {
        try {
            const response = await fetch(`${config.baseUrl}${config.order}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ingredients: action
                })
            })

            if (!response.ok) {
                throw new Error('404 - Error')
            }
            const data = await response.json()

            return data;

        } catch (error: any) {
            console.log('error === > ', error);

            return rejectWithValue(error.message)
        }
    })

const constructorSlice = createSlice({
    name: 'constructor',
    initialState: InitialState,
    reducers: {
        addItem: (state, action: PayloadAction<IIngredientType>) => {
            //console.log(action.payload);

            action.payload.type === 'bun' ?
                state.orderItems.bun = [action.payload]
                : state.orderItems.otherIngridients = [...state.orderItems.otherIngridients, action.payload]
        },
        deleteItem: (state, action: PayloadAction<IIngredientType>) => {
            state.orderItems.otherIngridients = state.orderItems.otherIngridients.filter(el => el.__v !== action.payload.__v)
        },
        clearOrders: (state) => {
            state.orderItems.otherIngridients = [];
            state.orderItems.bun = []
        },
        clearOrderNum: (state) => {
            state.orderNumber.number = null
        },
        deleteItemOfType: (state, action) => {
            state.orderItems.otherIngridients = state.orderItems.otherIngridients.filter(el => el.type !== action.payload)
        },
        change: (state, action) => {
            //console.log(action.payload);
            
            state.orderItems.otherIngridients = action.payload;

        },

    },
    extraReducers: (builder) => {
        builder.addCase(getOrder.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.orderNumber = action.payload.order;
        })
        builder.addCase(getOrder.rejected, (state, action) => {
            state.error = action.payload;
            console.log(action.payload);

        })
    }
})


export const { addItem, deleteItem, clearOrders, clearOrderNum, deleteItemOfType, change } = constructorSlice.actions

export default constructorSlice.reducer
