import styles from './orders.module.css';
import { useTypedDispatch } from '../../hooks/useTypedSelector';
import { useEffect } from 'react';
import { getUserOrders } from '../../store/auth/authSlice';
const Orders=()=>{
const dispatch=useTypedDispatch();
const token=localStorage.getItem('token');

useEffect(()=>{
    token&&dispatch(getUserOrders(token))
},[])
console.log('user==>', );

    return(<>
    <p>Orders</p>
    </>)
}

export default Orders