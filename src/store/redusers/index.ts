import { combineReducers } from "redux";
import { ingridientsReducer } from "./ingridientsReduser";
import constructorSlice from '../constructor/constroctorSlice'
import authSlice from "../auth/authSlice";

export const rootReducer=combineReducers({
    ingridients: ingridientsReducer,
    consrtructor: constructorSlice,
    auth:authSlice,
})

export type RootState= ReturnType<typeof rootReducer>
