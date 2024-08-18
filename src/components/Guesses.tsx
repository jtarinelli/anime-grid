import { FC } from "react"

type GuessesProps = {
    guessesLeft: number;
    resetGuesses: Function;
    setIsGameOver: Function;
}

export const Guesses: FC<GuessesProps> = ({guessesLeft, resetGuesses, setIsGameOver}) => {

    const onReset = () => {
        resetGuesses();
        setIsGameOver(false);
    }

    return (
        <div>
            {guessesLeft} guesses left!!! 
            <br/>
            <button onClick={onReset}>Reset (teehee)</button>
            <br/>
            <button onClick={() => setIsGameOver(true)}>Give up :(</button>
        </div>
    )
}