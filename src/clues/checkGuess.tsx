import { buildAnimeInfoQuery, buildBatchedAnimeInfoQuery, buildPaginatedAnimeInfoQuery } from "../queries/animeInfo";
import { makeGraphQlQuery } from "../queries/graphQlQuery";
import { Clue, ClueQueryInfo } from "./types";
import checkClueAgainstData from "./checkAgainstData";
import clueQueries from "./clueQueries";

export const checkGuess = async (guessId: number, clues: Clue[]): Promise<boolean> => {
    if (clues.every(clue => !clueQueries[clue.type].isPaginated)) {
        const batchedQuery = buildBatchedAnimeInfoQuery(clues.map(clue => clueQueries[clue.type]), guessId);
        const batchedData = await makeGraphQlQuery(batchedQuery.query, batchedQuery.variables);
        return checkBatchedClues(clues, batchedData);
    }

    for (const clue of clues) {
        const clueCorrect = await checkClue(guessId, clue);
        if (!clueCorrect) {
            return false;
        }
    }
    return true;
}

const checkClue = async (guessId: number, clue: Clue): Promise<boolean> => {
    const clueQueryInfo = clueQueries[clue.type];

    if (clueQueryInfo.isPaginated) {
        return await checkPaginatedClue(clue, guessId, clueQueryInfo);
    }

    // can do better with library I think
    const query = buildAnimeInfoQuery(clueQueryInfo, guessId)

    const queryData = await makeGraphQlQuery(query.query, query.variables);

    return checkClueAgainstData(clue, queryData);
}

const checkBatchedClues = (clues: Clue[], queryData: any) => {
    return clues.every(clue => checkClueAgainstData(clue, queryData));
}

const checkPaginatedClue = async (clue: Clue, guessId: number, clueQueryInfo: ClueQueryInfo): Promise<boolean> => {
    let hasNextPage = true;
    let currentPage = 1;

    while (hasNextPage) {
        const nthPageQuery = buildPaginatedAnimeInfoQuery(clueQueryInfo, guessId, currentPage);
        const nthPageData = await makeGraphQlQuery(nthPageQuery.query, nthPageQuery.variables);
        const isCorrectGuess = checkClueAgainstData(clue, nthPageData);

        if (isCorrectGuess) {
            return true;
        }

        hasNextPage = clueQueryInfo.getHasNextPage ? clueQueryInfo.getHasNextPage(nthPageData) : false;
        currentPage += 1;
    }
    return false;
}

export default checkGuess;