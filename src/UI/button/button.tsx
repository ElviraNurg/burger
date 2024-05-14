import styles from './button.module.css';

type ButtonProps = {
    text: string;
    onClick?: () => void;
    type: "button" | "submit" | "reset"
}

const Button = ({ text, type, onClick }: ButtonProps) => {
    const button = styles.button;

    return (
        <button type={type} onClick={onClick} className={`${button}`}>{text}</button>
    )
}

export default Button