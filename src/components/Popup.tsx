import { FC } from "react";

interface PopupProps {
    children: any;
    onClose: () => void;
}

const Popup: FC<PopupProps> = ({ children, onClose }) => {

    return <div>
        <button onClick={onClose}>X</button>
        <br />
        {children}
    </div>
}

export default Popup;