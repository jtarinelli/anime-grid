import { FC, useState } from "react";
import getClueString from "../clues/getClueString";
import type { Clue } from "../clues/types";
import Popup from "./Popup";

type ClueProps = {
    clue: Clue;
    className: string;
}

const Clue: FC<ClueProps> = ({ clue, className }) => {
    const [showDescription, setShowDescription] = useState(false);
    const description = clue.description;

    return <>
        <div className={`${className} ${description ? 'cursor-pointer' : ''}`} onClick={() => setShowDescription(true)}>
            {getClueString(clue)}
        </div>

        {description && showDescription &&
            <Popup title={getClueString(clue)} onClose={() => setShowDescription(false)}>
                {description}
            </Popup>
        }
    </>
}

export default Clue;