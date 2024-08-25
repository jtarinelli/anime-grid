import { FC } from "react";

interface PopupProps {
    children: any;
    onClose: () => void;
}

const Popup: FC<PopupProps> = ({ children, onClose }) => {

    return <div className="absolute h-full w-full flex place-content-center items-center bg-black/25">
        <div className="bg-white text-center w-fit h-fit border-2 p-4">
            <div className="text-right">
                <button onClick={onClose} className="border-2 p-1">X</button>
            </div>
            <br />
            {children}
        </div>
    </div>
}

export default Popup;