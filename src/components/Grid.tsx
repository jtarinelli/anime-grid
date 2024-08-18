import { FC } from "react"
import Cell from "./Cell";
import { ClueType } from "../clues/types";
import getClueString from "../clues/getClueString";

const Grid: FC = () => {
    const clues = [
        {
            type: ClueType.STUDIO,
            data: "MAPPA",
        },
        {
            type: ClueType.YEAR,
            data: {
                start: 2010,
            }
        },
        {
            type: ClueType.VOICE_ACTOR,
            data: "Yuuki Kaji",
        },
        {
            type: ClueType.VOICE_ACTOR,
            data: "Kana Hanazawa",
        },
    ];

    return (
        <div className="h-5/6 w-5/6 md:w-1/2 grid grid-cols-[15%_42.5%_42.5%] grid-rows-[10%_45%_45%] gap-2 place-items-center text-center">
            <div></div>
            <div>{getClueString(clues[0])}</div>
            <div>{getClueString(clues[1])}</div>
            <div>{getClueString(clues[2])}</div>
            <Cell clues={[clues[0], clues[2]]}/>
            <Cell clues={[clues[1], clues[2]]}/>
            <div>{getClueString(clues[3])}</div>
            <Cell clues={[clues[0], clues[3]]}/>
            <Cell clues={[clues[1], clues[3]]}/>
        </div>
    )
}

export default Grid;