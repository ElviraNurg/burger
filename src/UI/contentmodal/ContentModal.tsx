import { Dispatch } from 'react';
import { IIngredientType } from '../../types/burger';
import TitleModal from '../title-modal/TitleModal';
import styles from './contentmodal.module.css';
interface IContentModal{
    currentItem:IIngredientType|null;
    setActive:Dispatch<React.SetStateAction<boolean>>;
}
const ContentModal = ({ currentItem, setActive }: IContentModal) => {
    if(!currentItem)  return <></>
    const imageUrl = currentItem.image_mobile
    const {name,calories} = currentItem
    return (
        <>
         <TitleModal text={'Детали ингридиента'} setActive={setActive} parent='ingridientDetails'></TitleModal>
        <div className={styles.content__box} >
            <img className={styles.content__img} src={imageUrl} alt='Изображение ингредиента' />
            <h2 className={styles.content__name}>{name}</h2>
            <div className={styles.content__info_box}>
                <div className={styles.content__info}>
                    <p className={styles.content__description}>Калории, Ккал</p>
                    <p>{calories}</p>
                </div>
                <div className={styles.content__info}>
                    <p className={styles.content__description}>Белки, г</p>
                    <p>{calories}</p>
                </div>
                <div className={styles.content__info}>
                    <p className={styles.content__description}>Жиры, г</p>
                    <p>{calories}</p>
                </div>
                <div className={styles.content__info}>
                    <p className={styles.content__description}>Углеводы, г</p>
                    <p>{calories}</p>
                </div>

            </div>
        </div>
        </>
        
    )
}

export default ContentModal