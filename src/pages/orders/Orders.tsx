import styles from './orders.module.css';
import { useTypedDispatch } from '../../hooks/useTypedSelector';

import useWebSocket from 'react-use-websocket';
const Orders=()=>{
const dispatch=useTypedDispatch();
const token=localStorage.getItem('token').split(' ');
const SOCKET_URL: string = `wss://norma.nomoreparties.space/orders/${token[1]}`;


const processMessages = (event: WebSocketEventMap['message']) => {
    const orders = JSON.parse(event.data)
    console.log('orders====>', orders);
    console.log('event', event);
    
}


const { } = useWebSocket(SOCKET_URL, {
    onOpen: ()=>console.log('connect'),
    onClose: () => console.log('No connect'),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event: WebSocketEventMap['message']) => processMessages(event)
});


    return(<>
    <p>Orders</p>
    </>)
}

export default Orders