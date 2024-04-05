import { Dispatch } from "redux";
import { IngridientsAction, IngridientsActionTypes } from "../../types/burger";


const baseUrl: string = 'https://norma.nomoreparties.space/api';

export const fetchIngridients = () => {
    return (dispatch: Dispatch<IngridientsAction>) => {
        try {
            dispatch({ type: IngridientsActionTypes.FETCH_INGRIDIENTS })

            fetch(`${baseUrl}/ingredients`)
            .then(res => res.json())
            .then(json => dispatch({ type: IngridientsActionTypes.FETCH_INGRIDIENTS_SUCCESS, payload: json }))
            
            // dispatch({ type: IngridientsActionTypes.FETCH_INGRIDIENTS_SUCCESS, payload: (response.data.json()) })
        }
        catch (e) {
            dispatch({
                type: IngridientsActionTypes.FETCH_INGRIDIENTS_ERROR,
                payload: 'Не удалось загрузить данные'
            })
        }
    }
}