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

    const onGiveUp = () => {
        setIsGameOver(true)
    }

    const buttonClass = "border-2 p-2";

    return (
        <div className="m-20 p-5 border-2 text-center">
            {guessesLeft} guesses left!!! 
            <br/><br/>
            <button onClick={onReset} className={buttonClass}>Reset (teehee)</button>
            <br/><br/>
            <button onClick={onGiveUp} className={buttonClass}>Give up :(</button>
        </div>
    )
}