import { IIngredientType } from "./burger";

export interface ConstructorState {
    orderItems:IIngredientType[]
    loading: boolean;
    error: null | string;
}

export enum ConstructorActionTypes{
    FETCH_CONSTRUCTOR = 'FETCH_CONSTRUCTOR',
    FETCH_CONSTRUCTOR_SUCCESS = 'FETCH_CONSTRUCTOR_SUCCESS',
    FETCH_CONSTRUCTOR_ERROR = 'FETCH_CONSTUCTORS_ERROR',
    CONSTRUCTOR_ADD_ITEM = 'CONSTRUCTOR_ADD_ITEM',
    CONSTRUCTOR_DELETE_ITEM='CONSTRUCTOR_DELETE_ITEM'
}


interface FetchConstructorAction {
    type: ConstructorActionTypes.FETCH_CONSTRUCTOR;
}

interface FetchConstructorSuccessAction {
    type: ConstructorActionTypes.FETCH_CONSTRUCTOR_SUCCESS;
    payload: IIngredientType[],
    }

interface FetchConstructorErrorAction {
    type: ConstructorActionTypes.FETCH_CONSTRUCTOR_ERROR;
    payload:string;
}

interface ConstructorAddItem{
    type:ConstructorActionTypes.CONSTRUCTOR_ADD_ITEM;
    payload:IIngredientType[]
}

interface ConstructorDeleteItem{
    type:ConstructorActionTypes.CONSTRUCTOR_DELETE_ITEM
}

export type ConstructorAction= FetchConstructorAction|FetchConstructorSuccessAction|FetchConstructorErrorAction|ConstructorAddItem|ConstructorDeleteItem
