//import styles from './orders.module.css';
import useWebSocket from 'react-use-websocket';
const Orders=()=>{

//const token=localStorage.getItem('token')?localStorage.getItem('token').split(' '):'';
//const SOCKET_URL: string = `wss://norma.nomoreparties.space/orders/${token[1]}`;
const SOCKET_URL: string = `wss://norma.nomoreparties.space/orders`
const processMessages = (event: WebSocketEventMap['message']) => {
    const orders = JSON.parse(event.data)
    console.log('orders====>', orders);
    console.log('event', event);
    
}


const { } = useWebSocket(SOCKET_URL, {
    onOpen: ()=>console.log('connect'),
    onClose: () => console.log('No connect'),
    shouldReconnect: () => true,
    onMessage: (event: WebSocketEventMap['message']) => processMessages(event)
});


    return(<>
    <p>Orders</p>
    </>)
}

export default Orders