import styles from './feed.module.css';
import { useState, useEffect} from 'react';
import useWebSocket from "react-use-websocket"
import { useTypedDispatch, useTypedSelector } from '../../hooks/useTypedSelector';
import { getOrdersList, onClose, onConnect } from '../../store/feeds/feedsSlice';
import FeedListItem from '../../UI/feedListItem/FeedListItem';
import { FeedListItemProps } from '../../types/feed';
import AppHeader from '../../components/header/AppHeader';
import { useResize } from '../../hooks/useResize';

const SOCKET_URL: string = "wss://norma.nomoreparties.space/orders/all";

const Feed = () => {
    const dispatch = useTypedDispatch();
    const orderList = useTypedSelector(store => store.feeds.orderlist);
    const status = useTypedSelector(store => store.feeds.connect);
    const size = useResize()
    const processMessages = (event: WebSocketEventMap['message']) => {
        const orders = JSON.parse(event.data);
       
        
        status && dispatch(getOrdersList(orders.orders));
    }
   
    const { getWebSocket} = useWebSocket(SOCKET_URL, {
        onOpen: () => dispatch(onConnect()),
        onClose: () => dispatch(onClose()),
        shouldReconnect: (closeEvent) => true,
        onMessage: (event: WebSocketEventMap['message']) => processMessages(event)
    });

    useEffect(() => {

    }, [orderList])

    /* useEffect(()=>{
    console.log('change');
    
    
    },[getWebSocket]) */
    const [activeTab, setActiveTab] = useState('orders');
    const onChangeTab = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setActiveTab(value);
    }
    return (
        <div>
            <AppHeader />
            <h1 className={styles.title}> Лента заказов</h1>
            {size.isScreenS ?
                <div>
                    <div className={styles.feed__tabs}>
                        <input onChange={onChangeTab} type='radio' name='tab' id='orders' value='orders' className={styles.feed__input} />
                        <label className={styles.feed__label} htmlFor="orders">Заказы</label>
                    </div>
                    <div className={styles.feed__tabs}>
                        <input onChange={onChangeTab} type='radio' name='tab' id='statistics' value='statistics' className={styles.feed__input} />
                        <label className={styles.feed__label} htmlFor="statistics">Статистика</label>
                    </div>
                    {activeTab === 'orders' &&
                        <ul className={styles.feeds}>
                            {orderList.map((item: FeedListItemProps, index) => <li className={styles.feeds__item} key={item._id} >
                                <FeedListItem item={item} parent='Feed'/></li>)}
                        </ul>}
                    {activeTab === 'statistics' &&
                        <div>statistics</div>}
                </div>
                :
            <div className={styles.feed__wrapper__desktop}>
                <ul className={styles.feeds}>
                    {orderList.map((item: FeedListItemProps, index) => <li className={styles.feeds__item} key={index} >
                        <FeedListItem item={item} parent='Feed'/></li>)}
                </ul>
                <div>statistics</div>
            </div>}
            



        </div>
    );
};

export default Feed;