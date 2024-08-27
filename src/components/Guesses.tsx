import { FC } from "react"

type GuessesProps = {
    guessesLeft: number;
    onReset: () => void;
    onGiveUp: () => void;
}

export const Guesses: FC<GuessesProps> = ({guessesLeft, onReset, onGiveUp}) => {
    const buttonClass = "border-2 p-2";

    return (
        <div className="m-10 text-center">
            {guessesLeft} guesses left!!! 
            <br/><br/>
            <button onClick={onReset} className={buttonClass}>Reset (*/ω＼*)</button>
            <br/><br/>
            <button onClick={onGiveUp} className={buttonClass}>Give up (；′⌒`) </button>
        </div>
    )
}