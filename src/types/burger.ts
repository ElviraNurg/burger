export interface IngridientsState {
    ingridients: {
        success:boolean,
        data:IIngredientType[]
    };
    loading: boolean;
    error: null | string;
}

export enum IngridientsActionTypes{
    FETCH_INGRIDIENTS = 'FETCH_INGRIDIENTS',
    FETCH_INGRIDIENTS_SUCCESS = 'FETCH_INGRIDIENTS_SUCCESS',
    FETCH_INGRIDIENTS_ERROR = 'FETCH_INGRIDIENTS_ERROR'
}

export interface  IIngredientType {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
} 
interface FetchIngridientsAction {
    type: IngridientsActionTypes.FETCH_INGRIDIENTS
}

export interface FetchIngridientsSuccessAction {
    type: IngridientsActionTypes.FETCH_INGRIDIENTS_SUCCESS;
    payload:  { 
        success:boolean,
        data: IIngredientType[],
    } ;
}

interface FetchIngridientsErrorAction {
    type: IngridientsActionTypes.FETCH_INGRIDIENTS_ERROR;
    payload:string;
}

export type IngridientsAction= FetchIngridientsAction|FetchIngridientsSuccessAction|FetchIngridientsErrorAction
