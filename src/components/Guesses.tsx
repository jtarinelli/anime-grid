import { FC } from "react"

type GuessesProps = {
    guessesLeft: number;
    resetGuesses: Function;
}

export const Guesses: FC<GuessesProps> = ({guessesLeft, resetGuesses}) => {

    return (
        <div>
            {guessesLeft} guesses left!!! <br/>
            <button onClick={resetGuesses}>Reset (teehee)</button>
        </div>
    )
}