import styles from './totalprice.module.css';
import Button from '../button/button';
import PriceIcon from '../../assets/icons/price-icon.svg?react';
import { Dispatch } from 'react';
interface ITotalPrice {
    totalPrice: number;
    text: string;
    handleClickLookOrder?: Dispatch<React.SetStateAction<boolean>>;
    handleClickOrder?: any
}
const TotalPrice = ({ totalPrice, text, handleClickLookOrder, handleClickOrder }: ITotalPrice) => {

    const handleClick = () => {
        handleClickLookOrder && handleClickLookOrder(!false);
        handleClickOrder && handleClickOrder()
    }
    return (
        <div className={styles.consrtructor__price_box}>
            <div className={styles.consrtructor__totalprice}>
                <span> {totalPrice}</span>
                <PriceIcon />
            </div>
            <Button type='button' onClick={() => handleClick()} text={text} />
        </div>
    )
}

export default TotalPrice