import { FC } from "react";

interface PopupProps {
    children: any;
    onClose: (event?: any) => void;
    title?: string;
}

const Popup: FC<PopupProps> = ({ children, onClose, title }) => {

    // make it so just the text body scrolls and not the title/x button
    return <div className="fixed top-0 left-0 h-full w-full flex place-content-center items-center bg-black/25">
        <div className="bg-white text-center min-w-80 max-w-lg h-auto max-h-[90%] overflow-y-auto border-2 m-4">
            <div className="sticky top-0 bg-white p-4 pb-0">
                <div className="text-right h-2">
                    <button onClick={onClose} className="p-2 text-lg -m-2 -mt-6">X</button>
                </div>
                {title && <h2 className='text-lg'>{title}</h2>}
            </div>
            <br />
            <div className='p-4 pt-0'>
                {children}
            </div>
        </div>
    </div>
}

export default Popup;