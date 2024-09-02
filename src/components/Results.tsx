import { FC } from "react";
import { Guess } from "../App";
import Popup from "./Popup";
import { buttonClass } from "../classes";

interface ResultsProps {
    numberOfClues: number;
    correctGuesses: Guess[];
    onClose: () => void;
}

const Results: FC<ResultsProps> = ({ numberOfClues, correctGuesses, onClose }) => {
    let resultGrid = "";

    for (let row = 1; row < (numberOfClues / 2) + 1; row++) {
        for (let col = 1; col < (numberOfClues / 2) + 1; col++) {
            const correctGuess = correctGuesses.find(guess => guess.cellCoordinates.row === row && guess.cellCoordinates.col === col);
            if (correctGuess !== undefined) {
                resultGrid = resultGrid.concat('🟩')
            } else {
                resultGrid = resultGrid.concat('🟥')
            }
        }
        resultGrid = resultGrid.concat('\n');
    }

    const onCopy = () => {
        const copyText = "Anime Grid\n".concat(resultGrid);
        navigator.clipboard.writeText(copyText);
        // apparently this won't always work so should prob have fallback/error handling
    }

    // have different kaomoji depending on how well you did lul
    return <Popup onClose={onClose}>
        <h1 className="text-lg">Results (/≧▽≦)/</h1>
        {`${correctGuesses.length}/${(numberOfClues / 2) ** 2} correct`}
        <br />
        <div style={{ whiteSpace: "pre-wrap" }} className="text-2xl p-8">
            {resultGrid}
        </div>
        <br />
        <button onClick={onCopy} className={buttonClass}>Copy</button>
    </Popup>
}

export default Results;