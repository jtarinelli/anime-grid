import { FC } from "react";
import { Guess } from "../App";

interface GameOverProps {
    numberOfClues: number;
    guesses: Guess[];
}

const GameOver: FC<GameOverProps> = ({ numberOfClues, guesses }) => {
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

    return <div style={{whiteSpace: "pre-wrap"}}>
        {resultGrid}
    </div>
}

export default GameOver;