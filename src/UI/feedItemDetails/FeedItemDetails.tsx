import { FeedListItemProps } from '../../types/feed';
import TitleModal from '../title-modal/TitleModal';
import styles from './feeditemdetails.module.css';
import { Dispatch } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { IIngredientType } from '../../types/burger';
import PriceIcon from '../../assets/icons/price-icon.svg?react'
import { showDateTime } from '../../utils/functions/functions';
import { useResize } from '../../hooks/useResize';
interface IFeedItemDetails {
    currentOrder?: FeedListItemProps;
    setActive: Dispatch<React.SetStateAction<boolean>>;
}
interface IFeedItem {
    count: number,
    item: IIngredientType
}
const FeedItemDetails = ({ currentOrder, setActive }: IFeedItemDetails) => {
    if (!currentOrder) return <></>
    const size = useResize()
    const { data } = useTypedSelector(state => state.ingridients.ingridients);
    const statusClass = currentOrder && currentOrder.status === 'done' ? `${styles.feeditemdetails__status} ${styles.feeditemdetails__status__done}` : `${styles.feeditemdetails__status}`
    ///Получение ингредиентов заказа по id которые пришли через WS
    const getCount = (arr: IIngredientType[]) => {
        let obj: { [name: string]: IFeedItem } = {}
        for (const item of arr) {
            // если элемент уже был, то прибавляем 1, если нет - устанавливаем 1
            obj[item._id] = obj[item._id] ? { count: obj[item._id].count + 1, item } : { count: 1, item };
        }
        return Object.values(obj)
    }
    const getIngredients = (obj: FeedListItemProps, data: IIngredientType[]) => {
        let ingredients: IIngredientType[] = []
        for (let i = 0; i < obj.ingredients.length; i++) {
            let filterEl = data.find(el => el._id === obj.ingredients[i])
            filterEl && ingredients.push(filterEl)
        }
        const totalInfo = getCount(ingredients);
        console.log('totalInfo', totalInfo);

        return totalInfo
    }

    const ingredients = data && currentOrder ? getIngredients(currentOrder, data) : [];
    const createdDate = currentOrder ? showDateTime(currentOrder.createdAt) : null
    const num = currentOrder.number.toString()

    return (<>
        <TitleModal text={size.isScreenS ? 'Детали заказа' : `#${num}`} setActive={setActive} parent='FeedItemDetails' />
        <section className={styles.feeditemdetails}>
            {size.isScreenS && <div className={styles.feeditemdetails__number}>#{num}</div>}
            <h2 className={styles.feeditemdetails__name}>{currentOrder.name}</h2>
            <div className={`${statusClass}`}>{currentOrder.status === 'done' ? 'Выполнен' : 'Готовится'}</div>
            <div className={styles.feeditemdetails__structure__box}>
                <p className={styles.feeditemdetails__structure__name}>Состав:</p>
                <ul className={styles.feeditemdetails__structure__list}>{
                    ingredients && ingredients.map(el =>
                        <li className={styles.feeditemdetails__box} >
                            <img className={styles.feeditemdetails__img} src={el.item.image_mobile} width={32} height={32} />
                            <p className={styles.feeditemdetails__ingredient__name}>{el.item.name}</p>
                            <div>
                                <p className={styles.feeditemdetails__price}>{el.item.price}x{el.count}<PriceIcon /></p>
                            </div>
                        </li>)
                }
                </ul>
            </div>
            
        </section>
        <div className={styles.feeditemdetails__footer}>
                <p className={styles.feeditemdetails__footer__date}>{createdDate ? createdDate.toString() : currentOrder.createdAt}</p>
                <p className={styles.feeditemdetails__footer__totalprice}>{ingredients.reduce((acc, el) => acc + el.count * el.item.price, 0)}<PriceIcon/></p>
            </div>
    </>)
}

export default FeedItemDetails