import { FC } from "react";
import { Guess } from "../App";

interface ResultsProps {
    numberOfClues: number;
    guesses: Guess[];
}

const Results: FC<ResultsProps> = ({ numberOfClues, guesses }) => {
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

    const numberGuesses = guesses.length;
    const numberCorrectGuesses = guesses.filter(guess => guess.isCorrect).length;

    const onCopy = () => {
        const copyText = "Anime Grid\n".concat(resultGrid);
        navigator.clipboard.writeText(copyText);
        // apparently this won't always work so should prob have fallback/error handling
    }

    return <div>
        {`${numberCorrectGuesses}/${numberGuesses} correct`}
        <br />
        <div style={{ whiteSpace: "pre-wrap" }} className="text-2xl">
            {resultGrid}
        </div>
        <br />
        <button onClick={onCopy} className="border-2 p-2">Copy</button>
    </div>
}

export default Results;