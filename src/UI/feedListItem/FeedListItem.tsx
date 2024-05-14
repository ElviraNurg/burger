import { FeedListItemProps } from "../../types/feed"
import { useTypedDispatch, useTypedSelector } from "../../hooks/useTypedSelector";
import { IIngredientType } from "../../types/burger";
import styles from './feedlistitem.module.css'
import { Link } from "react-router-dom";
import { addCurrentOrder, toggleFeedsModal } from "../../store/feeds/feedsSlice";
import PriceIcon from '../../assets/icons/price-icon.svg?react';
import { getPrice, showDateTime } from "../../utils/functions/functions";
type OrderProps = {
    item: FeedListItemProps;
    parent: string;
}

const FeedListItem = ({ item, parent }: OrderProps) => {
    const { data } = useTypedSelector(state => state.ingridients.ingridients);
    const dispatch = useTypedDispatch()
    ///Получение ингредиентов заказа по id которые пришли через WS
    let ingredients: IIngredientType[] = []
    for (let i = 0; i < item.ingredients.length; i++) {
        let filterEl = data.find(el => el._id === item.ingredients[i])
        filterEl && ingredients.push(filterEl)
    }
   
    const price = ingredients.length > 0 ? getPrice(ingredients) : 0

    const onClick = (item: FeedListItemProps) => {
        dispatch(addCurrentOrder(item));
        dispatch(toggleFeedsModal(true))
    }
    

    
    const createdDate=showDateTime(item.createdAt)
    return (
        <>
            <Link className={styles.orderlistitem} to={`/feed/${item._id}`} onClick={() => onClick(item)} >
                <div className={styles.orderlistitem__box}>
                    <p className={styles.orderlistitem__num}>#{item.number}</p>
                    <p className={styles.orderlistitem__date}>{createdDate?.toString()}</p>
                </div>
                <div className={styles.orderlistitem__name__box}>
                    <h2 className={styles.orderlistitem__name}>{item.name}</h2>
                    <p className={parent === 'Feed' ? styles.orderlistitem__status__none : styles.orderlistitem__status} >
                        {item.status}
                    </p>
                </div>
                <div className={styles.orderlistitem__box}>
                    <div className={styles.orderlistitem__img__box}>{ingredients.map((el, index) =>
                        <img className={styles.orderlistitem__img}
                            src={el.image_mobile}
                            style={{ zIndex: ingredients.length - index }}
                        />)}
                    </div>
                    <div className={styles.orderlistitem__price}>
                        <p>{price}</p>
                        <PriceIcon />
                    </div>
                </div>
            </Link>
        </>
    )
}

export default FeedListItem