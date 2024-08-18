import sample from "lodash/sample";
import { Clue, ClueType } from "./types";
import clueOptions from "./clueOptions";

const generateClues = (number: number): Clue[] => {
    const clues: Clue[] = [];

    let clueTypeOptions = Object.values(ClueType).filter(value => value && typeof value === "number");

    for (let i = 0; i < number; i++) {
        // need to make sure same clue isn't picked multiple times
        const type = sample(clueTypeOptions);
        clueTypeOptions = clueTypeOptions.filter(option => option !== type);
        const data = sample(clueOptions[type])
        clues.push({type, data});
    }
    return clues;
}

export default generateClues;