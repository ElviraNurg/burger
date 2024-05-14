import { createSlice } from "@reduxjs/toolkit";
import { FeedListItemProps } from "../../types/feed";

interface ConstructorState {
    connect: boolean
    orderlist: any[],
    currentOrder: FeedListItemProps | null,
    feedsModal: boolean,
}

const InitialState: ConstructorState = {
    orderlist: [],
    connect: false,
    currentOrder: null,
    feedsModal: false,
}


const feedsSlice = createSlice({
    name: 'feeds',
    initialState: InitialState,
    reducers: {
        onConnect: (state) => {
            state.connect = true;
            //      console.log('state.connect', state.connect);

        },
        onClose: (state) => {
            state.connect = false;
        },
        getOrdersList: (state, action) => {
            state.orderlist = action.payload;
            // console.log('orders',  action.payload);

        },
        addCurrentOrder: (state, action) => {
           // console.log(action.payload);
            state.currentOrder = action.payload
        },
        toggleFeedsModal: (state, action) => {
            state.feedsModal = action.payload
        }
    },
})


export const { onConnect, onClose, getOrdersList, addCurrentOrder, toggleFeedsModal } = feedsSlice.actions

export default feedsSlice.reducer
