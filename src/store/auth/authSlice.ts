import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../utils/constants/constants";
import { RootState } from '../index';

interface ISetValues {
    [name: string]: any
}

interface IRegValue {
    name: string,
    email: string,
    password: string
}

interface AuthState {
    loading: boolean;
    error: any;
    authUser: boolean;
    regValue: ISetValues;
}

const InitialState: AuthState = {
    loading: false,
    error: '',
    authUser: false,
    regValue: {
        name: '',
        email: '',
        password: ''
    }
}
export const reg = createAsyncThunk(
    'reg',
    async function (action: ISetValues, { rejectWithValue, getState }) {
        /*  const value = getState().auth.regValue as RootState
         console.log(value); */
         const {auth} = getState()  as RootState
         console.log('getState()',auth.regValue);

        try {
            const response = await fetch(`${config.baseUrl}${config.registration}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(action)
            })
            if (!response.ok) {
                throw new Error('404 - Error')
            }
            console.log('response.json()', response.json());

            const data = await response.json()
            return data;

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    })

export const auth = createAsyncThunk(
    'auth',
    async function (action: ISetValues, { rejectWithValue }) {
        try {
            const response = await fetch(`${config.baseUrl}${config.authorization}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(action)
            })
            if (!response.ok) {
                throw new Error('404 - Error')
            }
            console.log('response.json()', response.json());

            const data = await response.json()
            return data;

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    })

const authSlice = createSlice({
    name: 'auth',
    initialState: InitialState,
    reducers: {
        addRegValue: (state, action: PayloadAction<ISetValues>) => {
            state.regValue = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(reg.pending, (state) => {
            state.loading = true
        })
        builder.addCase(reg.fulfilled, (state, action) => {
            state.loading = false;

        })
        builder.addCase(reg.rejected, (state, action) => {
            state.error = action.payload

        })
    }
})


export const { addRegValue } = authSlice.actions

export default authSlice.reducer
