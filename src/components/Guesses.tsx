import { FC, useState } from "react"
import { buttonClass } from "../classes";
import { Rules } from "./Rules";

type GuessesProps = {
    guessesLeft: number;
    isGameOver: boolean;
    onReset: () => void;
    onGiveUp: () => void;
    onShowResults: () => void;
}

export const Guesses: FC<GuessesProps> = ({ guessesLeft, isGameOver, onReset, onGiveUp, onShowResults }) => {
    const [showRules, setShowRules] = useState<boolean>(false);

    // move the rules into the menu when there is one
    return (
        <>
            {showRules && <Rules onClose={() => setShowRules(false)} />}
            <div className="m-10 text-center">
                {isGameOver ? 0 : guessesLeft} guesses left!!!
                <br /><br />
                <button onClick={onReset} className={buttonClass}>Reset (*/ω＼*)</button>
                <br /><br />
                <button onClick={() => setShowRules(true)} className={buttonClass}>Rules</button>
                <br /><br />
                {!isGameOver &&
                    <button onClick={onGiveUp} className={buttonClass}>Give up (；′⌒`) </button>}
                {isGameOver &&
                    <button onClick={() => onShowResults()} className={buttonClass}>See results ⓛωⓛ</button>}
            </div>
        </>
    )
}