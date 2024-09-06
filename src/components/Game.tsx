import { FC, useState } from "react";
import Grid from "./Grid";
import { Guesses } from "./Guesses";
import Results from "./Results";
import { Clue } from "../clues/types";
import { Guess } from "../App";

interface GameProps {
    clues: Clue[];
}

const Game: FC<GameProps> = ({clues}) =>  {
    const [guesses, setGuesses] = useState<Guess[]>([]);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [showResults, setShowResults] = useState<boolean>(false);

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

    return (<>
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
                numberOfClues={clues.length}
                correctGuesses={correctGuesses}
                onClose={() => setShowResults(false)}
            />}
    </>)
}

export default Game;