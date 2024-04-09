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
    user: IRegValue;
    forgotPassStatus: boolean;
}

const InitialState: AuthState = {
    loading: false,
    error: '',
    authUser: false,
    regValue: {
        name: '',
        email: '',
        password: ''
    },
    user: {
        email: '',
        name: '',
        password: ''
    },
    forgotPassStatus: false,
}

export const resetPass = createAsyncThunk(
    'resetPass',
    async function (action: ISetValues, { rejectWithValue, getState }) {
        try {
            const response = await fetch(`${config.baseUrl}${config.reset}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(action)
            })
            if (!response.ok) {
                throw new Error('404 - Error')
            }
            const data = await response.json()
            return data;

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    })

export const forgotPass = createAsyncThunk(
    'forgotPass',
    async function (action: ISetValues, { rejectWithValue, getState }) {
        try {
            const response = await fetch(`${config.baseUrl}${config.forgot}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(action)
            })
            if (!response.ok) {
                throw new Error('404 - Error')
            }
            //console.log('response.json()', response.json());

            const data = response.json()
            return data;

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    })
export const reg = createAsyncThunk(
    'reg',
    async function (action: ISetValues, { rejectWithValue, getState }) {
        /*  const value = getState().auth.regValue as RootState
         console.log(value); */
        const { auth } = getState() as RootState
        console.log('getState()', auth.regValue);

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

export const checkToken = createAsyncThunk(
    'checkToken',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(`${config.baseUrl}${config.token}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
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
        //checkToken
        builder.addCase(checkToken.pending, (state) => {
            state.loading = true
        })
        builder.addCase(checkToken.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload);

            state.authUser = true;
        })
        builder.addCase(checkToken.rejected, (state, action) => {
            state.error = action.payload

        })
        //auth
        builder.addCase(auth.pending, (state) => {
            state.loading = true
        })
        builder.addCase(auth.fulfilled, (state, action) => {
            state.loading = false;
            console.log('auth');

           // console.log('actionPayload.accessToken', action.payload.accessToken);

          //  localStorage.setItem('token', JSON.stringify(action.payload.accessToken))
        })
        builder.addCase(auth.rejected, (state, action) => {
            state.error = action.payload

        })
        //registr
        builder.addCase(reg.pending, (state) => {
            state.loading = true
        })
        builder.addCase(reg.fulfilled, (state, action) => {
            state.loading = false;
            console.log('actionPayload.accessToken', action.payload.accessToken);

            localStorage.setItem('token', JSON.stringify(action.payload.accessToken))
        })
        builder.addCase(reg.rejected, (state, action) => {
            state.error = action.payload

        })
        //forgotPas
        builder.addCase(forgotPass.pending, (state) => {
            state.loading = true
        })
        builder.addCase(forgotPass.fulfilled, (state, action) => {
            state.loading = false;
            state.forgotPassStatus = action.payload.success
            console.log(state.forgotPassStatus);


        })
        builder.addCase(forgotPass.rejected, (state, action) => {
            state.error = action.payload
        })

        //resetPas
        builder.addCase(resetPass.pending, (state) => {
            state.loading = true
        })
        builder.addCase(resetPass.fulfilled, (state, action) => {
            state.loading = false;
            console.log('reset');
            console.log("action.payload", action.payload);

        })
        builder.addCase(resetPass.rejected, (state, action) => {
            state.error = action.payload
        })
    }
})


export const { addRegValue } = authSlice.actions

export default authSlice.reducer
