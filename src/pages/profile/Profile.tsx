import Account from '../../UI/account/Account';
import UserProfile from '../../UI/userProfile/UserProfile';
import AppHeader from '../../components/header/AppHeader';
import { useResize } from '../../hooks/useResize';
import styles from './profile.module.css';

const Profile = () => {
    const size = useResize()
    return (
        <>
            <AppHeader />
            {size.isScreenS ? <div>
                <UserProfile />

            </div>
                :
                <div>
                    <div className={styles.profile__desktop_box}>
                        <Account />
                        <UserProfile />
                    </div>
                </div>
            }
        </>


    )
}

export default Profile