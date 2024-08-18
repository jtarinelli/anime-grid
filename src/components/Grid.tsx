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

// eventually do some loops in here to prevent making some changes to 4 cells every time
const Grid: FC<GridProps> = ({ correctGuesses, clues, isAlreadyGuessed, addGuess, isGameOver }) => {
    const getAnimeForCell = (coordinates: CellCoordinates) =>
        correctGuesses.find(guess =>
            (guess.cellCoordinates.row === coordinates.row)
            && (guess.cellCoordinates.col === coordinates.col))?.anime ?? null;

    return (
        <div className="h-5/6 w-5/6 md:w-1/2 grid grid-cols-[15%_42.5%_42.5%] grid-rows-[10%_45%_45%] gap-2 place-items-center text-center">
            <div></div>
            <div>{getClueString(clues[0])}</div>
            <div>{getClueString(clues[1])}</div>
            <div>{getClueString(clues[2])}</div>
            <Cell
                coordinates={{ row: 1, col: 1 }}
                correctedlyGuessedAnime={getAnimeForCell({ row: 1, col: 1 })}
                clues={[clues[0], clues[2]]}
                isAlreadyGuessed={isAlreadyGuessed}
                addGuess={addGuess}
                isGameOver={isGameOver} />
            <Cell
                coordinates={{ row: 1, col: 2 }}
                correctedlyGuessedAnime={getAnimeForCell({ row: 1, col: 2 })}
                clues={[clues[1], clues[2]]}
                isAlreadyGuessed={isAlreadyGuessed}
                addGuess={addGuess}
                isGameOver={isGameOver}
            />
            <div>{getClueString(clues[3])}</div>
            <Cell
                coordinates={{ row: 2, col: 1 }}
                correctedlyGuessedAnime={getAnimeForCell({ row: 2, col: 1 })}
                clues={[clues[0], clues[3]]} isAlreadyGuessed={isAlreadyGuessed}
                addGuess={addGuess}
                isGameOver={isGameOver}
            />
            <Cell
                coordinates={{ row: 2, col: 2 }}
                correctedlyGuessedAnime={getAnimeForCell({ row: 2, col: 2 })}
                clues={[clues[1], clues[3]]}
                isAlreadyGuessed={isAlreadyGuessed}
                addGuess={addGuess}
                isGameOver={isGameOver}
            />
        </div>
    )
}

export default Grid;