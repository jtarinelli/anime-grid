import { FC } from "react"

interface ButtonProps {
    label: String,
    onClick?: (event: any) => void,
    type?: "button" | "submit" | "reset",
}

const Button: FC<ButtonProps> = ({ label, type, onClick }) => {
    return <button onClick={onClick} type={type} className="bg-accent-400 hover:bg-accent-300 p-2 px-4">{label}</button>
}

export default Button