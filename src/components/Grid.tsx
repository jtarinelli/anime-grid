import { FC } from "react"
import Cell from "./Cell";
import { Clue } from "../clues/types";
import getClueString from "../clues/getClueString";
import { CellCoordinates, Guess } from "../App";

type GridProps = {
    correctGuesses: Guess[];
    clues: Clue[];
    isAlreadyGuessed: (animeId: number) => boolean;
    addGuess: (newGuess: Guess) => void;
    isGameOver: boolean;
}

// in theory code works for any size grid
// but will have to update grid css to display anything besides 2x2/4 clues
const Grid: FC<GridProps> = ({ correctGuesses, clues, isAlreadyGuessed, addGuess, isGameOver }) => {
    const getAnimeForCell = (coordinates: CellCoordinates) =>
        correctGuesses.find(guess =>
            (guess.cellCoordinates.row === coordinates.row)
            && (guess.cellCoordinates.col === coordinates.col))?.anime ?? null;

    const cellsPerSide = (clues.length / 2) + 1;
    const cells: JSX.Element[] = [];

    for (let row = 0; row < cellsPerSide; row++) {
        for (let col = 0; col < cellsPerSide; col++) {
            const horizontalClueIndex = col - 1;
            const verticalClueIndex = (cellsPerSide - 1) + (row - 1);
            const key = `row-${row}-col-${col}`;
            if (col === 0 && row === 0) {
                cells.push(<div key={key}></div>)
            } else if (row === 0) {
                cells.push(<div key={key}>{getClueString(clues[horizontalClueIndex])}</div>);
            } else if (col === 0) {
                cells.push(<div key={key}>{getClueString(clues[verticalClueIndex])}</div>);
            } else {
                cells.push(
                    <Cell
                        coordinates={{ row, col }}
                        correctedlyGuessedAnime={getAnimeForCell({ row, col })}
                        clues={[clues[horizontalClueIndex], clues[verticalClueIndex]]}
                        isAlreadyGuessed={isAlreadyGuessed}
                        addGuess={addGuess}
                        isGameOver={isGameOver}
                        key={key}
                    />
                )
            }
        }
    }

    return (
        <div className="h-5/6 w-5/6 md:w-1/2 grid grid-cols-[15%_42.5%_42.5%] grid-rows-[10%_45%_45%] gap-2 place-items-center text-center">
            {cells}
        </div>
    )
}

export default Grid;