import { FC } from "react"
import Button from "./Button";

type GuessesProps = {
    guessesLeft: number;
    isGameOver: boolean;
    onReset: () => void;
    onGiveUp: () => void;
    onShowResults: () => void;
}

export const Guesses: FC<GuessesProps> = ({ guessesLeft, isGameOver, onReset, onGiveUp, onShowResults }) => {
    return (
        <>
            <div className="p-10 text-center">
                {isGameOver ? 0 : guessesLeft} guesses left!!!
                <br /><br />
                <Button label="Reset (*/ω＼*)" onClick={onReset} />
                <br /><br />
                {!isGameOver &&
                <Button label="Give up (；′⌒`)" onClick={onGiveUp} />}
                {isGameOver &&
                 <Button label="See results ⓛωⓛ" onClick={() => onShowResults()} />}
            </div>
        </>
    )
}