import { Link } from 'react-router-dom';
import styles from './account.module.css';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Account = () => {
    const auth = useTypedSelector(store => store.auth.authUser)
    const exit = () => {
        localStorage.clear()
    }
    return (
        <>
            {
                auth ?
                    <ul className={styles.submenu__list}>
                        <li className={styles.submenu__item}>
                            <Link to={'/profile'} >Профиль</Link>
                        </li>
                        <li className={styles.submenu__item}>
                            <Link to={'/profile/orders'} >История заказов</Link>
                        </li>
                        <li className={styles.submenu__item}>
                            <Link onClick={exit} to={'/'} >Выход</Link>
                        </li>
                    </ul>

                    : <ul className={styles.submenu__list}>
                        <li className={styles.submenu__item}>
                            <Link to={'/login'} >Вход</Link>
                        </li>
                    </ul>
            }
        </>

    )
}

export default Account