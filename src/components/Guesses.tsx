import { FC } from "react"
import Button from "./Button";

type GuessesProps = {
    guessesLeft: number;
    isGameOver: boolean;
    onReset: () => void;
    onGiveUp: () => void;
    onShowResults: () => void;
}

export const Guesses: FC<GuessesProps> = ({ guessesLeft, isGameOver, onGiveUp, onShowResults }) => {
    //const resetKaomoji = "(*/ω＼*)";
    return (
        <>
            <div className="p-10 text-center">
                <h2 className='text-lg'>{isGameOver ? 0 : guessesLeft} guesses left!!!</h2>
                <br />
                {/* <Button label=`Reset {resetKaomoji}` onClick={onReset} />
                <br /><br /> */}
                {!isGameOver &&
                <Button label="Give up (；′⌒`)" onClick={onGiveUp} />}
                {isGameOver &&
                 <Button label="See results ⓛωⓛ" onClick={() => onShowResults()} />}
            </div>
        </>
    )
}