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

// only works for 4 or 6 clues (2x2 or 3x3)
const Grid: FC<GridProps> = ({ correctGuesses, clues, isAlreadyGuessed, addGuess, isGameOver }) => {
    const getAnimeForCell = (coordinates: CellCoordinates) =>
        correctGuesses.find(guess =>
            (guess.cellCoordinates.row === coordinates.row)
            && (guess.cellCoordinates.col === coordinates.col))?.anime ?? null;

    const cellsPerSide = (clues.length / 2) + 1;
    const cells: JSX.Element[] = [];

    for (let row = 0; row < cellsPerSide; row++) {
        for (let col = 0; col < cellsPerSide; col++) {
            const coordinates = { row, col };
            const key = JSON.stringify(coordinates);

            const horizontalClueIndex = col - 1;
            const verticalClueIndex = (cellsPerSide - 1) + (row - 1);
            
            if (col === 0 && row === 0) {
                cells.push(<div key={key}></div>)
            } else if (row === 0) {
                cells.push(<div key={key}>{getClueString(clues[horizontalClueIndex])}</div>);
            } else if (col === 0) {
                cells.push(<div key={key}>{getClueString(clues[verticalClueIndex])}</div>);
            } else {
                cells.push(
                    <Cell
                        coordinates={coordinates}
                        correctedlyGuessedAnime={getAnimeForCell(coordinates)}
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

    // text/rem gets big on small screens so labels make the rest of the grid shrink
    return (
        <div className={`h-full md:aspect-[230/300] grid grid-cols-[7rem_repeat(${cellsPerSide-1},_1fr)] grid-rows-[2rem_repeat(${cellsPerSide-1},_1fr)] gap-2 place-items-center text-center`}>
            {cells}
        </div>
    )
}

export default Grid;