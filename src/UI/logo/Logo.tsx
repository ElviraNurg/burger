import { Link } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg'
import styles from './logo.module.css';
import LogoVector from '../../assets/icons/logo_desktop.svg?react';
const Logo = () => {
    return (
        <Link className={styles.header__link} style={{ left: 'calc(100%-290px)' }} to={'/'}>
            <img className={styles.header__logo} src={logo} alt="Логотип бургерной" width={40} height={40} />
            <LogoVector className={styles.header__logodesktop}/>
        </Link>
    )
}
export default Logo