import { FC } from "react";
import Popup from "./Popup";
import { Guess } from "./Game";
import { Mode, modeOptions } from "./Menu";
import Button from "./Button";

interface ResultsProps {
    mode: Mode;
    numberOfClues: number;
    correctGuesses: Guess[];
    onClose: () => void;
}

const Results: FC<ResultsProps> = ({ mode, numberOfClues, correctGuesses, onClose }) => {
    let resultGrid = "";

    for (let row = 1; row < (numberOfClues / 2) + 1; row++) {
        for (let col = 1; col < (numberOfClues / 2) + 1; col++) {
            const correctGuess = correctGuesses.find(guess => guess.cellCoordinates.row === row && guess.cellCoordinates.col === col);
            if (correctGuess !== undefined) {
                resultGrid = resultGrid.concat('🟩')
            } else {
                resultGrid = resultGrid.concat('🟥')
            }
        }
        resultGrid = resultGrid.concat('\n');
    }

    const currentModeName = modeOptions.find(option => option.type === mode)?.name;

    const onCopy = () => {
        const copyText = "Anime Grid\n".concat(`${currentModeName}\n`).concat(resultGrid);
        navigator.clipboard.writeText(copyText);
        // apparently this won't always work so should prob have fallback/error handling
    }

    const amountCorrect = correctGuesses.length/((numberOfClues / 2) ** 2);
    let kaomoji;
    if (amountCorrect === 1) {
        kaomoji = '(/≧▽≦)/';
    } else if (amountCorrect === 0) {
        kaomoji = 'ヽ(*。>Д<)o゜';
    } else if (amountCorrect < .5) {
        kaomoji = '(´。＿。｀)'
    } else {
        kaomoji = '（*＾-＾*）'
    }

    // have different kaomoji depending on how well you did lul
    return <Popup onClose={onClose} title="Results">
        {currentModeName}
        <br/><br/>
        {`${correctGuesses.length}/${(numberOfClues / 2) ** 2} correct`}
        <br />
        {kaomoji}
        <br />
        <div className="text-2xl p-8 whitespace-pre-wrap">
            {resultGrid}
        </div>
        <br />
        <Button label="Copy" onClick={onCopy} />
    </Popup>
}

export default Results;