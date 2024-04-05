import styles from './tabs.module.css';
interface ITabProps{
    onChangeTab?:(e: React.FormEvent<HTMLInputElement>) => void
}
const Tabs = ({onChangeTab}:ITabProps) => {
    return (
        <>
            <div className={styles.ingridients__tabs}>
                <input onChange={onChangeTab} type='radio' name='tab' id='buns' value='buns' className={styles.ingridients__input} />
                <label className={styles.ingridients__label} htmlFor="buns">Булки</label>
            </div>
            <div className={styles.ingridients__tabs}>
                <input onChange={onChangeTab} type='radio' name='tab' id='sauces' value='sauces' className={styles.ingridients__input} />
                <label className={styles.ingridients__label} htmlFor="sauces">Соусы</label>
            </div>
            <div className={styles.ingridients__tabs}>
                <input onChange={onChangeTab} type='radio' name='tab' id='mains' value='mains' className={styles.ingridients__input} />
                <label className={styles.ingridients__label} htmlFor="mains">Основное</label>
            </div>
        </>
    )
}

export default Tabs