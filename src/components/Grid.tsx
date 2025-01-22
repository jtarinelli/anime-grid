import { FC } from "react"
import Cell from "./Cell";
import { Clue as ClueType} from "../clues/types";
import { Guess, CellCoordinates } from "./Game";
import Clue from "./Clue";

type GridProps = {
    gameId: number;
    correctGuesses: Guess[];
    clues: ClueType[];
    isAlreadyGuessed: (animeId: number) => boolean;
    addGuess: (newGuess: Guess) => void;
    isGameOver: boolean;
}

// only works for 4 or 6 clues (2x2 or 3x3) cause of grid css
const Grid: FC<GridProps> = ({ gameId, correctGuesses, clues, isAlreadyGuessed, addGuess, isGameOver }) => {
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
                cells.push(<Clue clue={clues[horizontalClueIndex]} className="text-sm md:text-base mt-auto" key={key}/>);
            } else if (col === 0) {
                cells.push(<Clue clue={clues[verticalClueIndex]} className="text-sm md:text-base" key={key} />);
            } else {
                cells.push(
                    <Cell
                        gameId={gameId}
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
    // maybe change this to not be screen height and just make it scroll...... hm
    const threeByThreeGrid = `max-w-full hor:h-full hor:w-auto aspect-[230/300] grid grid-cols-[5rem_repeat(2,_1fr)] grid-rows-[auto_repeat(2,_1fr)] gap-2 p-6 place-items-center text-center`;
    const fourByFourGrid = `max-w-full hor:h-full hor:w-auto aspect-[230/300] grid grid-cols-[5rem_repeat(3,_1fr)] grid-rows-[auto_repeat(3,_1fr)] gap-2 p-6 place-items-center text-center`;

    return (
        <div className={cellsPerSide == 4 ? fourByFourGrid : threeByThreeGrid}>
            {cells}
        </div>
    )
}

export default Grid;