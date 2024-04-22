import { combineReducers } from "redux";
import { ingridientsReducer } from "./ingridientsReduser";
import constructorSlice from '../constructor/constroctorSlice'
import authSlice from "../auth/authSlice";
import loctionSlice from "../location/location"

export const rootReducer=combineReducers({
    ingridients: ingridientsReducer,
    consrtructor: constructorSlice,
    auth:authSlice,
    location: loctionSlice,
})

export type RootState= ReturnType<typeof rootReducer>
