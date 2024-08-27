import { FC } from "react"
import { buttonClass } from "../classes";

type GuessesProps = {
    guessesLeft: number;
    onReset: () => void;
    onGiveUp: () => void;
}

export const Guesses: FC<GuessesProps> = ({guessesLeft, onReset, onGiveUp}) => {
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