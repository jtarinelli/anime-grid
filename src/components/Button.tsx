import { FC } from "react"

interface ButtonProps  {
    label: String,
    onClick: (event: any) => void,
}

const Button: FC<ButtonProps> = ({ label, onClick }) => {
    return <button onClick={onClick} className="bg-accent-500 hover:bg-accent-200 p-2 px-4">{label}</button>
}

export default Button