import { FC } from "react"
import { buttonClass } from "../classes";

type GuessesProps = {
    guessesLeft: number;
    isGameOver: boolean;
    onReset: () => void;
    onGiveUp: () => void;
    onShowResults: () => void;
}

export const Guesses: FC<GuessesProps> = ({guessesLeft, isGameOver, onReset, onGiveUp, onShowResults}) => {
    return (
        <div className="m-10 text-center">
            {guessesLeft} guesses left!!! 
            <br/><br/>
            <button onClick={onReset} className={buttonClass}>Reset (*/ω＼*)</button>
            <br/><br/>
            {!isGameOver && 
                <button onClick={onGiveUp} className={buttonClass}>Give up (；′⌒`) </button>}
            {isGameOver &&
            <button onClick={() => onShowResults()} className={buttonClass}>See results ⓛωⓛ</button>}
        </div>
    )
}