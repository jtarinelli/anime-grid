import sample from "lodash/sample";
import { Clue, ClueType } from "./types";
import clueOptions from "./clueOptions";

const generateClues = (): Clue[] => {
    const clues: Clue[] = [];

    for (let i = 0; i < 4; i++) {
        // need to make sure same clue isn't picked multiple times
        const type = sample(Object.values(ClueType).filter(value => value && typeof value === "number"));
        const data = sample(clueOptions[type])
        clues.push({type, data});
    }

    console.log(clues);

    return clues;
}

export default generateClues;