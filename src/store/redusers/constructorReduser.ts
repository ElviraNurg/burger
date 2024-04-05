/* import { ConstructorState, ConstructorAction, ConstructorActionTypes } from "../../types/constructor"

const InitialState: ConstructorState = {
    orderItems: [],
    loading: false,
    error: null
}
export const constructorReducer = (state = InitialState, action: ConstructorAction): ConstructorState => {
    switch (action.type) {
        case ConstructorActionTypes.FETCH_CONSTRUCTOR:
            return {
                loading: true, error: null, orderItems: []
            }
        case ConstructorActionTypes.FETCH_CONSTRUCTOR_SUCCESS:
            return {
                loading: false, error: null, orderItems: action.payload
            }
        case ConstructorActionTypes.FETCH_CONSTRUCTOR_ERROR:
            return {
                loading: false, error: action.payload, orderItems: []
            }
        case ConstructorActionTypes.CONSTRUCTOR_ADD_ITEM:
            return {
                loading: true, error: null, orderItems: [...state.orderItems, action.payload]
            }
        default:
            return state
    }
} */