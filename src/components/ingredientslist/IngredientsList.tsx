import styles from './ingredientslist.module.css';
import { IIngredientType } from '../../types/burger';
import IngridientDetails from '../ingridientdetails/IngridientDetails';
import { forwardRef} from 'react';

interface IIngridientsListProps {
    dataIngredient: IIngredientType[];
  /*   setModalActive: Dispatch<React.SetStateAction<boolean>>;
    setCurrentItem: React.Dispatch<React.SetStateAction<null|IIngredientType>>; */
    ref: React.MutableRefObject<HTMLDivElement | null>;
    text: string;
}

const IngredientsList = forwardRef(({ dataIngredient, /* setModalActive, setCurrentItem,  */
    text}: IIngridientsListProps, ref: any) => {
        
    return (
        <div ref={ref}  className={styles.ingridients__box}>
            <h3 className={styles.ingridients__name}>{text}</h3>
            <ul className={styles.ingridients__list}>
                {dataIngredient.map((item) => <IngridientDetails
                    /* setModalActive={setModalActive}
                    setcurrentItem={setCurrentItem} */
                    key={item._id}
                    item={item}
                   />)}
            </ul>
        </div>
    )
})

export default IngredientsList