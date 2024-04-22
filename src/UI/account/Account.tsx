import { Link, useLocation } from 'react-router-dom';
import styles from './account.module.css';
import { useTypedSelector, useTypedDispatch } from '../../hooks/useTypedSelector';
import { exit } from '../../store/auth/authSlice'
import { useResize } from '../../hooks/useResize';

const Account = () => {
    const auth = useTypedSelector(store => store.auth.authUser);
    const dispach = useTypedDispatch()
    const handleExit = () => {
        localStorage.clear();
        dispach(exit())
    }
   const size=useResize() 
    
    return (
        <>
            {
                auth ?
                    <div>
                        <ul className={styles.submenu__list}>
                            <li className={styles.submenu__item}>
                                <Link to={'/profile'} >Профиль</Link>
                            </li>
                            <li className={styles.submenu__item}>
                                <Link to={'/profile/orders'} >История заказов</Link>
                            </li>
                            <li className={styles.submenu__item}>
                                <Link onClick={handleExit} to={'/'} >Выход</Link>
                            </li>
                        </ul>
                        {!size.isScreenS&&<p>В этом разделе вы можете изменить свои персональные данные</p>}
                    </div>


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