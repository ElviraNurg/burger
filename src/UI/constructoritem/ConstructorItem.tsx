import { IIngredientType } from '../../types/burger';
import PriceIcon from '../../assets/icons/price-icon.svg?react';
import Delete from '../../assets/icons/delete.svg?react';
import Blocked from '../../assets/icons/blocked.svg?react';
import ItemNav from '../../assets/icons/constructor-item.svg?react';
import styles from './constructoritem.module.css';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useResize } from '../../hooks/useResize';
import { useTypedDispatch, useTypedSelector } from '../../hooks/useTypedSelector';
import { change, deleteItem } from '../../store/constructor/constroctorSlice';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';
import update from 'immutability-helper';
interface IConstructorItemProps {
    item: IIngredientType;
    index: number;
}

const ConstructorItem = ({ item, index }: IConstructorItemProps,) => {
    const dispatch = useTypedDispatch();
    const [itemSwipe, setItemSwipe] = useState(false)
    const { otherIngridients } = useTypedSelector(state => state.consrtructor.orderItems);
    const imageUrl = item.image_mobile;
    const buttonClass = itemSwipe ? styles.constructor__button_swipe : styles.constructor__button;
    const size = useResize();

    const onClickItem = () => {
        size.isScreenS && setItemSwipe(!itemSwipe)
    }
    const handleDelete = () => {
        dispatch(deleteItem(item))
    }

    const [orders, setOrders] = useState(otherIngridients)


    /* const changeItemInOrder = (dragIndex: number, hoverIndex: number) => {
         console.log('dragIndex', dragIndex);
        console.log('hoverIndex', hoverIndex);
        let res: any = []
        if (dragIndex && dragIndex !== hoverIndex) {
            console.log('orders[dragIndex]',orders[dragIndex]);
            
            if (dragIndex > hoverIndex) {
                res =[... orders.splice(0, hoverIndex),
                    //orders[dragIndex],
                    ...orders.slice(hoverIndex, dragIndex),
                    //...orders.slice(dragIndex + 1) 
                ]
               console.log(res);
               
            } else {
                res = [...orders.slice(0, dragIndex),
                ...orders.slice(dragIndex + 1, hoverIndex + 1),
                orders[dragIndex],
                ...orders.slice(hoverIndex + 1)]
            }
        } else {
            // console.log('not dragIndex');

        }
        console.log('res', res);
        return  setOrders(res)
    } */
     /* useEffect(() => {
     
    }, [orders]) */
     useEffect(() => {
        console.log('orders 4242424',orders);
        
        // dispatch(change(orders))
    }, [orders])  

   /*  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setCards((prevCards: Item[]) =>
          update(prevCards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevCards[dragIndex] as Item],
            ],
          }),
        )
      }, []) */
     const moveCard =  useCallback((dragIndex: number, hoverIndex: number) => {
        console.log('dragIndex', dragIndex);
        console.log('hoverIndex', hoverIndex);
        
        setOrders((prevOrders: IIngredientType[]) =>
        {
            console.log('orders[dragIndex]', prevOrders[dragIndex]);
              console.log('prevOrders ===> ',prevOrders);
           
            return update(prevOrders, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0 , prevOrders[dragIndex] as IIngredientType ],
            ],
          })}
        )  
      }, [])   



    const ref = useRef<any>(null)
    const [{ handlerId, canDrop, isOver }, dropItem] = useDrop<
        any,
        void,
        {
            handlerId: Identifier | null;
            canDrop: boolean | null;
            isOver: any
        }
    >(() => ({
        accept: 'item',
        /* drop: (dragIndex: number, hoverIndex: number) => {
            changeItemInOrder(dragIndex, hoverIndex)
        }, */
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId(),
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
        }),
        hover: (item, monitor) => {
           
            if (!ref.current) {
                return
            }

            const dragIndex = item.index;
           console.log('dragIndex  ===>', dragIndex)

            const hoverIndex = index


            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen  Определите прямоугольник на экране
            const hoverBoundingRect = ref.current.getBoundingClientRect()

            // Get vertical middle  Получаем вертикальную середину
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position Определите положение мыши
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top  Увеличьте количество пикселей до самого верха
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Dragging upwards Тянущийся вверх
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveCard( dragIndex, hoverIndex)
           // changeItemInOrder(dragIndex, hoverIndex)
            item.index = hoverIndex
           // console.log('orders',orders);
        }
    })
    )

    const [{ isDragStart }, dragItem] = useDrag(() => ({
        type: 'item',
        item: () => {
            return { item, index }
        },
        collect: (monitor) => ({
            isDragStart: !!monitor.isDragging(),
            id: monitor.getItem(),
            handlerId: monitor.getTargetIds(),
        }),
    })
    )
    const isActive = canDrop && isOver;
    dragItem(dropItem(ref))
    return (
        <li ref={item.type !== 'bun' ? ref : null}
            data-handler-id={handlerId}
            style={{ backgroundColor: isActive ? "green" : "red" }}
            onClick={onClickItem} className={`${styles.constructor__item}  ${itemSwipe ? styles.constructor__item_swipe : ''}`} >
            {item.type === 'bun' ? <button className={styles.constructor__nav_none}></button>
                : <button onClick={() => setItemSwipe(!itemSwipe)} className={styles.constructor__nav}><ItemNav /></button>}
            <div

                className={styles.constructor__box}>
                <img className={styles.constructor__image} src={imageUrl} alt="Изображение ингредиента" />
                <p className={styles.constructor__name}>{item.name}</p>
                <p className={styles.constructor__price}>{item.price}<PriceIcon /></p>
                {item.type === 'bun' ? <button className={`${buttonClass}`}><Blocked /></button>
                    : <button onClick={handleDelete} className={`${buttonClass}`}><Delete /></button>
                }
            </div>

        </li>)
}

export default ConstructorItem