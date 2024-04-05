import TitleModal from '../title-modal/TitleModal'
import { Dispatch } from 'react';
import styles from './orderinfo.module.css'
import OKicon from '../../assets/icons/ok-icon.svg?react';
import { useResize } from '../../hooks/useResize';
interface IOrderInfo {
    orderNum: number | null;
    setActive: Dispatch<React.SetStateAction<boolean>>;
}

const OrderInfo = ({ orderNum, setActive }: IOrderInfo) => {


    const size = useResize();

    return (
        <>
            {size.isScreenS && <TitleModal text='Заказ оформлен' setActive={setActive} parent='orderInfo' />}
            <section className={styles.order__wrapper}>
                <div className={styles.order__box}>
                    <h2 className={styles.order__number}>{orderNum}</h2>
                </div>
                <div className={styles.order__box}>
                    <p className={styles.order__name}>идентификатор заказа</p>
                </div>
                <div className={styles.order__box}>
                    <button onClick={() => setActive(false)} className={styles.order__button}><OKicon className={styles.order__icon} /></button>
                </div>
                <div className={styles.order__box}>
                    <p className={styles.order__description}>Ваш заказ начали готовить</p>
                </div>
                <div className={styles.order__box}>
                    <p className={styles.order__description}>Дождитесь готовности<br /> на орбитальной станции</p>
                </div>
            </section>

        </>
    )
}
export default OrderInfo