import { useState, useRef, useEffect } from 'react';
import styles from './burgeringridients.module.css';
import IngredientsList from '../ingredientslist/IngredientsList';
import Modal from "../modal/Modal";
import ModalOverlay from '../modaloverlay/ModalOverlay';
import { useTypedDispatch, useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchIngridients } from '../../store/action-creators/ingridients';
import { clearOrders, clearOrderNum } from '../../store/constructor/constroctorSlice';
import { IIngredientType } from '../../types/burger';
import Tabs from '../../UI/tabs/Tabs';
import OrderInfo from '../../UI/orderInfo/OrderInfo';
declare global {
    interface Object {
        groupBy<T>(list: T[], keyGetter: (item: T) => any): { [key: string]: T[] };
    }
}
interface IGroupIngridients {
    bun?: IIngredientType[];
    sauce?: IIngredientType[];
    main?: IIngredientType[];
}

const BurgerIngridients = () => {
    const dispatch = useTypedDispatch()
   // const [modalActive, setModalActive] = useState(false);//Модалка с ингредиентом
    const [modalOrderActive, setModalOrderActive] = useState(false);//Модалка с заказом
   // const [currentItem, setCurrentItem] = useState<IIngredientType | null>(null)
    const [dataIngredient, setDataIngredient] = useState<IGroupIngridients>({})
    const [activeTab, setActiveTab] = useState('');

    const { data } = useTypedSelector(state => state.ingridients.ingridients);
    const orderNum = useTypedSelector(state => state.consrtructor.orderNumber.number)
//console.log('data', data);

    const refBun = useRef<null | HTMLDivElement>(null);
    const refSauce = useRef<null | HTMLDivElement>(null);
    const refMain = useRef<null | HTMLDivElement>(null);

    const onChangeTab = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setActiveTab(value);
    }

    useEffect(() => {
        if (data) {
            setDataIngredient(Object.groupBy(data, ({ type }) => type))
        }
    }, [data])

    useEffect(() => {
        data.length===0&&dispatch(fetchIngridients())
    }, [])

    useEffect(() => {
        activeTab === 'buns' && refBun.current?.scrollIntoView({ behavior: 'smooth' });
        activeTab === 'sauces' && refSauce.current?.scrollIntoView({ behavior: 'smooth' });
        activeTab === 'mains' && refMain.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeTab])
    useEffect(() => {
        orderNum !== null && setModalOrderActive(true);
        dispatch(clearOrders());
    }, [orderNum])

    useEffect(() => {
       !modalOrderActive && dispatch(clearOrderNum())
    }, [modalOrderActive])

    return (
        <><section className={styles.ingridients}>
            <div className={styles.ingridients__wrapper}>
                <h1 className={styles.ingridients__title}>Собери бургер</h1>
                <Tabs onChangeTab={onChangeTab} />
            </div>
            <div className={styles.ingridients__list_wrapper}>
                <div className={styles.ingridients__list_box}>
                    {dataIngredient.bun ? <IngredientsList
                        dataIngredient={dataIngredient.bun}
                        /* setModalActive={setModalActive}
                        setCurrentItem={setCurrentItem} */
                        
                        text='Булки'
                        ref={refBun} />
                        : null}
                    {dataIngredient.sauce ? <IngredientsList
                        dataIngredient={dataIngredient.sauce}
                        /* setModalActive={setModalActive}
                        setCurrentItem={setCurrentItem} */
                         text='Соусы'
                        ref={refSauce} />
                        : null}
                    {dataIngredient.main ? <IngredientsList
                        dataIngredient={dataIngredient.main}
                        /* setModalActive={setModalActive}
                        setCurrentItem={setCurrentItem} */
                        text='Основное'
                        ref={refMain} />
                        : null}
                </div>
            </div>

             <ModalOverlay active={modalOrderActive} setActive={setModalOrderActive}>
                <Modal  Children={<OrderInfo orderNum={orderNum} setActive={setModalOrderActive} />} />
            </ModalOverlay>
        </section>
        </>

    )
}

export default BurgerIngridients