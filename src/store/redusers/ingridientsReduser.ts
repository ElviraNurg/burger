import { IngridientsState, IngridientsAction, IngridientsActionTypes } from "../../types/burger"

const InitialState: IngridientsState = {
    ingridients: {
        success: false,
        data: []
    },
    loading: false,
    error: null
}
export const ingridientsReducer = (state = InitialState, action: IngridientsAction): IngridientsState => {
    switch (action.type) {
        case IngridientsActionTypes.FETCH_INGRIDIENTS:
            return {
                loading: true,
                error: null,
                ingridients: {
                    success: false,
                    data: []
                }
            }
        case IngridientsActionTypes.FETCH_INGRIDIENTS_SUCCESS:
            return { loading: false, error: null, ingridients: action.payload }
        case IngridientsActionTypes.FETCH_INGRIDIENTS_ERROR:
            return {
                loading: false, error: action.payload, ingridients: {
                    success: false,
                    data: []
                }
            }
        default:
            return state
    }
}