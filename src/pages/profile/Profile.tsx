import { useState } from 'react';
import Account from '../../UI/account/Account';
import UserProfile from '../../UI/userProfile/UserProfile';
import AppHeader from '../../components/header/AppHeader';
import { useResize } from '../../hooks/useResize';
import styles from './profile.module.css';
import Orders from '../orders/Orders';

const Profile = () => {
    const size = useResize()
    const [activeLink, setActiveLink]=useState<string>('profile')
    console.log('activeLink', activeLink);
    
    return (
        <>
            <AppHeader />
            {size.isScreenS ? <div>
                <UserProfile />
            </div>
                :
                <div className={styles.profile__wrapper}>
                    <div className={styles.profile__desktop_box}>
                        <Account setActiveLink={setActiveLink} />
                        {activeLink==='profile'&&<UserProfile />}
                        {activeLink==='profile/orders'&&<Orders />}
                    </div>
                </div>
            }
        </>


    )
}

export default Profile