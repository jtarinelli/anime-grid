import { animeInfoQuery, getAnimeInfoClueDirectiveVariables } from "../queries/animeInfo";
import { Clue } from "./types";
import checkClueAgainstData from "./checkAgainstData";
import clueQueries from "./clueQueries";
import request from "graphql-request";

const isCluePaginated = (clue: Clue) => {
    return clueQueries[clue.type].isPaginated;
}

const getClueResults = (clues: Clue[], queryData: any) => {
    return clues.reduce((result: Map<Clue, boolean>, clue: Clue) => {
        return result.set(clue, checkClueAgainstData(clue, queryData))
    }, new Map<Clue, boolean>)
}

export const checkGuess = async (guessId: number, clues: Clue[]): Promise<boolean> => {
    const cluesQueries = clues.map(clue => clueQueries[clue.type]);
    
    const initialVariables = {
        id: guessId,
        page: 1,
        ...getAnimeInfoClueDirectiveVariables(cluesQueries)
    }

    const initialData = await request(import.meta.env.VITE_ANILIST_GRAPHQL_URL, animeInfoQuery, initialVariables);
    const initialResults = getClueResults(clues, initialData);

    const unpaginatedResults = Array.from(initialResults.entries()).filter(([clue, _]) => !isCluePaginated(clue));
    
    const allCluesCorrect = Array.from(initialResults.values()).every(isCorrect => isCorrect);
    const allCluesUnpaginated = unpaginatedResults.length === clues.length;
    const someUnpaginatedClueIncorrect = unpaginatedResults.some(([_, isCorrect]) => !isCorrect);

    if (allCluesCorrect) {
        return true;
    } else if (someUnpaginatedClueIncorrect || allCluesUnpaginated) {
        return false;
     }

    const paginatedResults = new Map(Array.from(initialResults.entries()).filter(([clue, _]) => isCluePaginated(clue)));
    const paginatedQueries = cluesQueries.filter(query => query.isPaginated);
    const paginatedClues = clues.filter(clue => isCluePaginated(clue));

    let page = 1;
    while (!Array.from(paginatedResults.values()).every(isCorrect => isCorrect)) {
        page += 1;
         
        const nthPageVariables = {
            id: guessId,
            page,
            ...getAnimeInfoClueDirectiveVariables(paginatedQueries)
        };

        const nthPageData = await request(import.meta.env.VITE_ANILIST_GRAPHQL_URL, animeInfoQuery, nthPageVariables);
        const nthPageResults = getClueResults(paginatedClues, nthPageData);

        let incorrectGuess = false;

        paginatedClues.forEach(clue => {
            if (!clueQueries[clue.type].getHasNextPage!(nthPageData) && !nthPageResults.get(clue)) {
                incorrectGuess = true;
            }
            paginatedResults.set(clue, (paginatedResults.get(clue) ?? false) || (nthPageResults.get(clue) ?? false));
        })

        if (incorrectGuess) {
            return false;
        }
    }
    return true;
}

export default checkGuess;