import { FC, useState } from "react";
import Grid from "./Grid";
import { Guesses } from "./Guesses";
import Results from "./Results";
import { Anime } from "../queries/animeSearch";
import { useQuery } from "@tanstack/react-query";
import { Mode } from "./Menu";
import { getGame } from "../queries/backend";

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
    visible: boolean;
}

const Game: FC<GameProps> = ({ mode, visible }) => {
    const [guesses, setGuesses] = useState<Guess[]>([]);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [showResults, setShowResults] = useState<boolean>(false);

    const { data, isFetching } = useQuery({
        queryKey: [mode],
        queryFn: async () => getGame(mode),
        staleTime: Infinity,
    });

    if (!isFetching) {
        const clues = data.clues;

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
                gameId={data.gameId}
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