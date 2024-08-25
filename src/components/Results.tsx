import { FC } from "react";
import { Guess } from "../App";

interface ResultsProps {
    numberOfClues: number;
    guesses: Guess[];
}

const Results: FC<ResultsProps> = ({ numberOfClues, guesses }) => {
    let resultGrid = "";

    for (let row = 1; row < (numberOfClues / 2) + 1; row ++) {
        for (let col = 1; col < (numberOfClues / 2) + 1; col ++) {
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
        navigator.clipboard.writeText(resultGrid);
        // apparently this won't always work so should prob have fallback/error handling
    }

    return <div style={{whiteSpace: "pre-wrap"}}>
        {`${numberGuesses}/${numberCorrectGuesses} correct`}
        <br/>
        {resultGrid}
        <br/>
        <button onClick={onCopy} className="border-2 p-2">Copy</button>
    </div>
}

export default Results;