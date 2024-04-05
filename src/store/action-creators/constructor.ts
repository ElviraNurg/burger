/* import { Dispatch } from "redux";
import { ConstructorAction, ConstructorActionTypes } from "../../types/constructor";
import { IIngredientType } from "../../types/burger";


const baseUrl: string = 'https://norma.nomoreparties.space/api';

export const addOrderItem=(item:IIngredientType)=>{
    return (dispatch: Dispatch<ConstructorAction>) => {
        
        dispatch({ type: ConstructorActionTypes.CONSTRUCTOR_ADD_ITEM}, payload: item)
    }
}

export const fetchIngridients = () => {
    return (dispatch: Dispatch<ConstructorAction>) => {
        try {
            dispatch({ type: ConstructorActionTypes.FETCH_CONSTRUCTOR })

            fetch(`${baseUrl}/order`)
            .then(res => res.json())
            .then(json => dispatch({ type: ConstructorActionTypes.FETCH_CONSTRUCTOR_SUCCESS, payload: json }))
    
        }
        catch (e) {
            dispatch({
                type: ConstructorActionTypes.FETCH_CONSTRUCTOR_ERROR,
                payload: 'Не удалось загрузить данные'
            })
        }
    }
} */ 