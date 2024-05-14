import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../UI/logo/Logo';
import IconBurger from "../../assets/icons/burger.svg?react";
import IconUser from "../../assets/icons/user.svg?react";
import IconOrder from "../../assets/icons/order.svg?react";
import IconArrUp from "../../assets/icons/arrowUp.svg?react";
import IconArrDown from "../../assets/icons/arrowDown.svg?react";
import styles from './appHeader.module.css';
import { useResize } from '../../hooks/useResize';
import Account from '../../UI/account/Account';
const AppHeader = () => {
    const [clickedToggle, setClickedTogle] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const size = useResize()
    const onClickToggle = () => {
        setClickedTogle(prev => !prev)
    }
    const onClickOpen = () => {
        setIsOpen(prev => !prev)
    }
    const buttonClass = clickedToggle ? styles.button__closed : styles.button__opened;
    const navClass = clickedToggle ? styles.nav__opened : styles.nav__closed;
    useEffect(() => { }, [isOpen])
    return (
        <header className={styles.header}>
            <div className={styles.header__wrapper} >
                <Logo />
                <nav className={`${navClass} ${styles.nav}`}>
                    <button className={`${buttonClass} ${styles.button__toggle}`}
                        onClick={onClickToggle}>
                        <span className={styles.button__name}>Меню</span>
                    </button>
                    <ul className={styles.nav__list}>
                        <li className={styles.nav__item}>
                            {size.isScreenS ?
                                <div className={styles.nav__item_wrapper}>
                                    <button className={`${styles.nav__link} ${isOpen&&styles.nav__link__active}`} onClick={onClickOpen}>
                                    <IconUser className={styles.nav__icon} />
                                    Личный кабинет
                                    {isOpen?<IconArrUp className={styles.nav__arrow}/>:<IconArrDown className={styles.nav__arrow}/>}
                                    </button>
                                    {isOpen && <Account />}
                                </div>
                                : <Link className={styles.nav__link} to={'/profile'}>
                                    <IconUser className={styles.nav__icon} />
                                    Личный кабинет
                                </Link>}
                        </li>
                        <li className={styles.nav__item}>

                            <Link className={styles.nav__link} to={'/constructor'}>
                                <IconBurger className={styles.nav__icon} />
                                Конструктор <span>бургеров</span>
                            </Link>
                        </li>
                        <li className={styles.nav__item}>
                            <Link className={styles.nav__link} to={'/feed'}>
                                <IconOrder className={styles.nav__icon} />
                                Лента заказов
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default AppHeader;