import { FC } from "react";
import { Guess } from "../App";
import Popup from "./Popup";

interface ResultsProps {
    numberOfClues: number;
    guesses: Guess[];
    onClose: () => void;
}

const Results: FC<ResultsProps> = ({ numberOfClues, guesses, onClose }) => {
    let resultGrid = "";

    for (let row = 1; row < (numberOfClues / 2) + 1; row++) {
        for (let col = 1; col < (numberOfClues / 2) + 1; col++) {
            const guess = guesses.find(guess => guess.cellCoordinates.row === row && guess.cellCoordinates.col === col);
            if (guess?.isCorrect) {
                resultGrid = resultGrid.concat('🟩')
            } else {
                resultGrid = resultGrid.concat('🟥')
            }
        }
        resultGrid = resultGrid.concat('\n');
    }

    const numberCorrectGuesses = guesses.filter(guess => guess.isCorrect).length;

    const onCopy = () => {
        const copyText = "Anime Grid\n".concat(resultGrid);
        navigator.clipboard.writeText(copyText);
        // apparently this won't always work so should prob have fallback/error handling
    }

    return <Popup onClose={onClose}>
        <h1>Results!</h1>
        {`${numberCorrectGuesses}/${(numberOfClues / 2) ** 2} correct`}
        <br />
        <div style={{ whiteSpace: "pre-wrap" }} className="text-2xl">
            {resultGrid}
        </div>
        <br />
        <button onClick={onCopy} className="border-2 p-2">Copy</button>
    </Popup>
}

export default Results;