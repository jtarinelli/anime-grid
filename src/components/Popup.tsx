import { FC } from "react";

interface PopupProps {
    children: any;
    onClose: (event?: any) => void;
    title?: string;
}

const Popup: FC<PopupProps> = ({ children, onClose, title }) => {

    // make it so just the text body scrolls and not the title/x button
    return <div className="fixed top-0 left-0 h-full w-full flex place-content-center items-center bg-neutral-800/50">
        <div className="bg-background text-center min-w-80 max-w-lg h-auto max-h-[90%] overflow-y-auto border-4 border-neutral-300 m-4">
            <div className="sticky top-0 bg-background p-4 pb-0">
                <div className="text-right h-2">
                    <button onClick={onClose} className="p-2 text-lg -m-2 -mt-6 hover:text-accent-500 rounded-full border-transparent">X</button>
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