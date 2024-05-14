import { Link} from 'react-router-dom';
import styles from './account.module.css';
import { useTypedSelector, useTypedDispatch } from '../../hooks/useTypedSelector';
import { exit } from '../../store/auth/authSlice'
import { useResize } from '../../hooks/useResize';
import { Dispatch } from 'react';
import { resetStore } from '../../store/action-creators/ingridients';

type AccountProps = {
    setActiveLink?: Dispatch<React.SetStateAction<string>>
}
const Account = ({ setActiveLink }: AccountProps) => {
    const auth = useTypedSelector(store => store.auth.authUser);
    const dispach = useTypedDispatch()
    const handleExit = () => {
        localStorage.clear();
        dispach(exit());
        dispach(resetStore())
    }
    
    const size = useResize()
const onClickLink=(route:string)=>{
    setActiveLink&&setActiveLink(route)
}
    return (
        <>
            {
                auth ?
                    <div>
                        <ul className={styles.submenu__list}>
                            <li className={styles.submenu__item}>
                                <Link onClick={()=>onClickLink('profile')}
                                    to={'/profile'} >Профиль</Link>
                            </li>
                            <li className={styles.submenu__item}>
                                <Link onClick={() => onClickLink('profile/orders')}
                                    to={'/profile/orders'} >История заказов</Link>
                            </li>
                            <li className={styles.submenu__item}>
                                <Link onClick={handleExit} to={'/login'} >Выход</Link>
                            </li>
                        </ul>
                        {!size.isScreenS && <p>В этом разделе вы можете изменить свои персональные данные</p>}
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