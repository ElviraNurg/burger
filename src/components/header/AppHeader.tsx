import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../UI/logo/Logo';
import IconBurger from "../../assets/icons/burger.svg?react";
import IconUser from "../../assets/icons/user.svg?react";
import IconOrder from "../../assets/icons/order.svg?react";
import styles from './appHeader.module.css';
const AppHeader = () => {
    const [clickedToggle, setClickedTogle] = useState(false);
    const onClickToggle = () => {
        setClickedTogle(prev => !prev)
    }
    const buttonClass = clickedToggle ? styles.button__closed : styles.button__opened;
    const navClass = clickedToggle ? styles.nav__opened : styles.nav__closed;

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
                            <Link className={styles.nav__link} to={'/enter'}>
                                <IconUser className={styles.nav__icon} />
                                Личный кабинет
                            </Link>
                        </li>
                        <li className={styles.nav__item}>

                            <Link className={styles.nav__link} to={'/constructor'}>
                                <IconBurger className={styles.nav__icon} />
                                Конструктор <span>бургеров</span>
                            </Link>
                        </li>
                        <li className={styles.nav__item}>
                            <a className={styles.nav__link} href="">
                                <IconOrder className={styles.nav__icon} />
                                Лента заказов
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default AppHeader;