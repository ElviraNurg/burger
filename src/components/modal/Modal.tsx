import styles from './modal.module.css';

interface IModal {
    Children: JSX.Element;

}

const Modal = ({ Children }: IModal) => {

    return (
        <div className={styles.modal__content} onClick={e => e.stopPropagation()}>
            {Children}
        </div>
    )
}

export default Modal