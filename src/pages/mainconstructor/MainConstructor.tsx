import styles from './mainconstructor.module.css'
import BurgerIngridients from "../../components/burgerIngridients/BurgerIngridients";
import BurgerConstructor from "../../components/burgerconstructor/BurgerConstructor";
import AppHeader from "../../components/header/AppHeader";
import {useTypedSelector } from '../../hooks/useTypedSelector';
import { useEffect, useState } from 'react';
import ModalOverlay from '../../components/modaloverlay/ModalOverlay';
import Modal from '../../components/modal/Modal';
import { useResize } from '../../hooks/useResize';
import TotalPrice from '../../UI/totalPrice/TotalPrice';
const MainConstructor = () => {
    const orderItems = useTypedSelector(state => state.consrtructor.orderItems);
   
    // console.log('orderItems=>', orderItems);
    const [modalConstructor, setModalConstructor] = useState(false);

    const size = useResize();

    const getPrice = () => {
        let total = 0
        orderItems.bun.forEach(item => total = total + item.price * 2)
        orderItems.otherIngridients.forEach(item => total = total + item.price)
        return total
    }

    const totalPrice = getPrice()


    const handleClickLookOrder = () => {
        setModalConstructor(!false)
    }
    useEffect(() => {
        getPrice()
    }, [orderItems])

    return (
        <>
            <AppHeader />


            <div className={styles.mainconstructor__wrapper}>
                <BurgerIngridients />
                {size.isScreenS  ? 
                <div>
                    {totalPrice ?
                        <TotalPrice totalPrice={totalPrice}
                        text='Смотреть заказ'
                        handleClickLookOrder={handleClickLookOrder} />


                        : null}
                </div>
                    : <BurgerConstructor setActive={setModalConstructor} />}

                <ModalOverlay active={modalConstructor} setActive={setModalConstructor}>
                    <Modal  Children={<BurgerConstructor setActive={setModalConstructor} />} />
                </ModalOverlay>

            </div>

        </>
    )
}

export default MainConstructor