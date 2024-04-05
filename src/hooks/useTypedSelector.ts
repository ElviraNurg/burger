import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/redusers";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";

export const useTypedSelector:TypedUseSelectorHook<RootState>=useSelector
export const useTypedDispatch=()=>useDispatch<AppDispatch>()