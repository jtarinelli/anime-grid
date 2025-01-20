import { FC, useState } from "react";
import Grid from "./Grid";
import { Guesses } from "./Guesses";
import Results from "./Results";
import { Mode } from "../clues/generateClues";
import { Anime } from "../queries/animeSearch";
import { useQuery } from "@tanstack/react-query";

export type CellCoordinates = {
    row: number;
    col: number;
}

export type Guess = {
    anime: Anime;
    isCorrect: boolean;
    cellCoordinates: CellCoordinates;
}


interface GameProps {
    mode: Mode;
    //clues: Clue[];
    visible: boolean;
}

const Game: FC<GameProps> = ({ mode, /* clues, */ visible }) => {
    const [guesses, setGuesses] = useState<Guess[]>([]);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [showResults, setShowResults] = useState<boolean>(false);

    // should this data fetch happen here or a level up?
    // each game fetches its own puzzle data sooo...?
    const { data, isFetching } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const response = await fetch(
                'http://localhost:3000/game',
            )
            return await response.json()
        },
        staleTime: Infinity,
    });

    if (!isFetching) {
        const clues = data;

        const isAlreadyGuessed = (animeId: number) => guesses.some(guess => guess.isCorrect && guess.anime.id === animeId);
        const addGuess = (newGuess: Guess) => setGuesses([...guesses, newGuess])

        const guessesLeft = ((clues.length / 2) ** 2) - guesses.length;

        if (!isGameOver && guessesLeft === 0) {
            setIsGameOver(true);
            setShowResults(true);
        }

        const reset = () => {
            setGuesses([]);
            setIsGameOver(false);
        };

        const giveUp = () => {
            setIsGameOver(true);
            setShowResults(true)
        }

        const correctGuesses = guesses.filter(guess => guess.isCorrect);

        return visible && (<>
            <Grid
                correctGuesses={correctGuesses}
                clues={clues}
                isAlreadyGuessed={isAlreadyGuessed}
                addGuess={addGuess}
                isGameOver={isGameOver}
            />
            <Guesses
                guessesLeft={guessesLeft}
                isGameOver={isGameOver}
                onGiveUp={giveUp}
                onReset={reset}
                onShowResults={() => setShowResults(true)}
            />
            {showResults &&
                <Results
                    mode={mode}
                    numberOfClues={clues.length}
                    correctGuesses={correctGuesses}
                    onClose={() => setShowResults(false)}
                />}
        </>)
    } else {
        return "Loading uwu";
    }
}

export default Game;