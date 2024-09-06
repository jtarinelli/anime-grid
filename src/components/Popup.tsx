import { FC } from "react";

interface PopupProps {
    children: any;
    onClose: (event?: any) => void;
}

const Popup: FC<PopupProps> = ({ children, onClose }) => {

    // make it so just the text body scrolls and not the title/x button
    return <div className="fixed top-0 left-0 h-full w-full flex place-content-center items-center bg-black/25">
        <div className="bg-white text-center min-w-80 max-w-[50%] h-fit max-h-[90%] overflow-y-scroll border-2 p-4">
            <div className="text-right h-2">
            <button onClick={onClose} className="p-2 text-lg -m-2 -mt-6">X</button>
            </div>
            <br />
            {children}
        </div>
    </div>
}

export default Popup;