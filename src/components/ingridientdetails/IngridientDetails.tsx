import { useEffect, useState } from 'react';
import styles from './ingridientdetails.module.css';
import PriceIcon from '../../assets/icons/price-icon.svg?react';
import { IIngredientType } from '../../types/burger';
import { useTypedDispatch, useTypedSelector } from '../../hooks/useTypedSelector';
import { addItem } from '../../store/constructor/constroctorSlice';
import { useDrag } from 'react-dnd';
import { useResize } from '../../hooks/useResize';
interface IPropsIngridientDetails {
    item: IIngredientType;
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
    setcurrentItem: React.Dispatch<React.SetStateAction<null | IIngredientType>>;
}


const IngridientDetails = ({ item, setModalActive, setcurrentItem, }: IPropsIngridientDetails) => {
    const dispatch = useTypedDispatch();
    const size=useResize()
    const imageUrl = item.image_mobile;
    const orderItems = useTypedSelector(state => state.consrtructor.orderItems)
    const { data } = useTypedSelector(state => state.ingridients.ingridients);
    const [orderCount, setOrderCount] = useState(0)
    const [orderCountBun, setOrderCountBun] = useState(0)
    const countClass = orderCount || orderCountBun > 0 ? styles.ingridientdetails__count : null;
    const count = item.type === 'bun' ? orderCountBun : orderCount
    //Добавляет в массив заказов ингридиент
    const buns = data.filter(el => el.type === 'bun')

    const generateKey = () => {
        //  console.log(`${new Date().getTime()}`);
        return Number(`${new Date().getTime()}`);
    }
    const onClick = (item: IIngredientType) => {
        item = { ...item, __v: generateKey() }
        if (orderItems.bun.length === 0 && item.type !== 'bun') {
            dispatch(addItem(buns[0]))
            dispatch(addItem(item))
        } else {
            dispatch(addItem(item))
        }
    }
    // console.log('orderItems', orderItems);

    useEffect(() => {
        setOrderCount(orderItems.otherIngridients.filter(el => el._id === item._id).length);
    }, [orderItems])

    useEffect(() => {
        setOrderCountBun(orderItems.bun.filter(el => el._id === item._id).length);
    }, [orderItems])

    const onClickItem = (item: IIngredientType) => {
        setModalActive(true);
        setcurrentItem(item);
    }
    //console.log('orderItems', orderItems);
    /* interface DropResult {
        name: string
    } */

    const [{ isDragStart }, drag] = useDrag(() => ({
        type: 'box',
        item: item,
        /*  end: (item, dropResult) => {
           console.log(dropResult);
           
           if (item&&dropResult ) {
               onClick(item)
           }
       },  */
        collect: (monitor) => ({
            isDragStart: !!monitor.isDragging(),
            //handlerId: monitor.getHandlerId(),
        }),
    })
    )
    return (
        <>
            <li className={styles.ingridientdetails__box}
                ref={drag}
                style={{ border: isDragStart ? "5px solid pink" : "0px" }}
                 onDragOver={(evt) => evt.preventDefault()} >
                <div onClick={() => onClickItem(item)}>
                    <img className={styles.ingridientdetails__image} src={imageUrl} alt="Изображение ингредиента" />
                    <span className={`${countClass}`}>{count > 0 ? count : null}</span>
                    <p className={styles.ingridientdetails__price}>{item.price}<PriceIcon /></p>
                    <p className={styles.ingridientdetails__name}>{item.name}</p>
                </div>
                {size.isScreenS&&<button onClick={() => onClick(item)} className={styles.ingridientdetails__button}><span>Добавить</span></button>}
            </li>
        </>
    )
}

export default IngridientDetails