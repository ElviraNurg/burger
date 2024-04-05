import styles from './burgerconstructor.module.css';
import ConstructorItem from '../../UI/constructoritem/ConstructorItem';
import { useTypedDispatch, useTypedSelector } from '../../hooks/useTypedSelector';
import { useEffect, useRef, useState } from 'react';
import TotalPrice from '../../UI/totalPrice/TotalPrice';
import { getOrder } from '../../store/constructor/constroctorSlice';
import { Dispatch } from 'react';
import { useResize } from '../../hooks/useResize';
import TitleModal from '../../UI/title-modal/TitleModal';
import { useDrop } from 'react-dnd';
import { IIngredientType } from '../../types/burger';
import { addItem } from '../../store/constructor/constroctorSlice';
interface IConstructorProps {
    setActive: Dispatch<React.SetStateAction<boolean>>;
}
const BurgerConstructor = ({ setActive }: IConstructorProps) => {

    const orderItems = useTypedSelector(state => state.consrtructor.orderItems);
    const dispatch = useTypedDispatch();
    const size = useResize();


    const getPrice = () => {
        let total = 0
        orderItems.bun.forEach(item => total = total + item.price * 2)
        orderItems.otherIngridients.forEach(item => total = total + item.price)
        return total
    }
    const getOrderIdList = () => {
        let orderList = []
        orderItems.bun.length > 0 && orderList.push(orderItems.bun[0]._id)
        orderItems.otherIngridients.length > 0 && orderItems.otherIngridients.forEach(item => orderList.push(item._id))
        return orderList
    }

    const totalPrice = getPrice()
    const handleClick = () => {
        const orderIdList = getOrderIdList();
        dispatch(getOrder(orderIdList));
        setActive ? setActive(false) : null
    }
  
    ///
    const {data} = useTypedSelector(state => state.ingridients.ingridients);
    const [buns, setBuns] = useState<IIngredientType[] | null>(null)

    const refBuns  = useRef<IIngredientType[]>();

    //console.log('data', data);

   
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'box',
        drop: (item: IIngredientType) => {
            addItemInDrop(item)
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
        }),
    })
    )
    const isActive = isOver && canDrop;
    
    const generateKey = () => {
        return Number(`${new Date().getTime()}`);
    }
    
    const addItemInDrop = (item: IIngredientType) => {
        item = { ...item, __v: generateKey() }

       // console.log('buns=>', refBuns.current);
       // console.log('data', data);
        
        if (orderItems.bun.length === 0 && item.type !== 'bun') {
           // console.log('no buns');
           refBuns.current && dispatch(addItem(refBuns.current[0]))
            dispatch(addItem(item))
        } else {
            dispatch(addItem(item))
        }
    }

    useEffect(() => {
        if (data) {
            //console.log('data', data);
            const buns = data.filter(el => el.type === 'bun')
            setBuns(buns)
            refBuns.current = buns
        }else{
            console.log('!!!!!!!!');   
        }
    }, [data])

    useEffect(() => {
        getPrice()
    }, [orderItems])

    useEffect(() => {
      // console.log('мorderItems=>111', orderItems);
    }, [orderItems])
    useEffect(() => {
      // console.log('buns=>111', buns);
    }, [buns])


    return (<>

        <section className={styles.constructor__section}>
            {size.isScreenS ? <TitleModal text='Заказ' setActive={setActive} parent='orderInfo' /> : null}
            <div className={styles.constructor__wrapper}>
                <ul ref={drop}
                    /* style={{ backgroundColor: isActive ? "green" : "red" }}  */
                    className={styles.constructor__list}>
                    {orderItems.bun[0] ? <ConstructorItem
                        index={1000}
                        item={orderItems.bun[0]}
                    /> : null}
                    {orderItems.otherIngridients ? orderItems.otherIngridients.map((item, index) => <ConstructorItem

                        item={item}
                        index={index}
                        key={item.__v} />
                    ) : null}
                    {orderItems.bun[0] ? <ConstructorItem
                        index={1000}
                        item={orderItems.bun[0]} /> : null}
                </ul>

            </div>
            {totalPrice ?
                <TotalPrice totalPrice={totalPrice}
                    text='Оформить заказ'
                    handleClickOrder={handleClick} />
                : null}
        </section>
    </>

    )
}

export default BurgerConstructor