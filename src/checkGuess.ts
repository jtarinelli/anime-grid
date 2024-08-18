import { Clue, ClueType } from "./clues";
import { buildAnimeInfoQuery, buildPaginatedAnimeInfoQuery } from "./queries/animeInfo";
import { makeGraphQlQuery } from "./queries/graphQlQuery";

export const checkGuess = async (guessId: number, clues: Clue[]): Promise<boolean> => {
    for(const clue of clues) {
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

const checkClueAgainstData = (clue: Clue, guessData: any): boolean => {
    const { type, data } = clue;
    const animeData = guessData.data.Media;

    switch (type) {
        case ClueType.GENRE:
            return animeData.genres.includes(data)
        case ClueType.ORIGINAL:
            return animeData.source === "ORIGINAL";
        case ClueType.STUDIO:
            return animeData.studios.nodes.some(node => node.name === data);
        case ClueType.VOICE_ACTOR:
            console.log(animeData);
            return animeData.characters.edges.some(edge => edge.voiceActors.some(voiceActor => voiceActor.name.full === data))
        case ClueType.YEAR:
            const { start, end } = data;
            // feel like this logic could be simplified
            if (start && end) {
                return animeData.seasonYear > start && animeData.seasonYear < end;
            } else if (start) {
                return animeData.seasonYear > start
            }
            return animeData.seasonYear < end;
        case ClueType.EPISODES:
            const { min, max } = data;
            // feel like this logic could be simplified
            if (min && max) {
                return animeData.episodes > min && animeData.episodes < max;
            } else if (min) {
                return animeData.episodes > min;
            }
            return animeData.episodes < max;
        case ClueType.MOVIE:
            return animeData.format === "MOVIE";
        default:
            throw new Error("Bad clue type! CRINGE!!!")
    }
}

export type ClueQueryInfo = {
    fields: string;
    isPaginated: boolean;
    getHasNextPage?: Function;
}

const clueQueries: Record<ClueType, ClueQueryInfo> = {
    [ClueType.ORIGINAL]: {
        fields: `source`,
        isPaginated: false,
    },
    [ClueType.GENRE]: {
        fields: `genres`,
        isPaginated: false,
    },
    [ClueType.STUDIO]: {
        fields: `studios(sort: NAME, isMain: true) {
            nodes {
              name
            }
          }`,
        isPaginated: false,
    },
    [ClueType.YEAR]: {
        fields: `seasonYear`,
        isPaginated: false,
    },
    [ClueType.EPISODES]: {
        fields: `episodes`,
        isPaginated: false,
    },
    [ClueType.MOVIE]: {
        fields: `format`,
        isPaginated: false,
    },
    [ClueType.VOICE_ACTOR]: { 
        // idk if perPage needs to be a variable too, dep on what the diff paginated things are ig
        // how to get rid of node? don't need character name????
        // can only pick 1 role, ideally would want main and supporting but guess we're getting EVERYONE
        fields: `characters(sort: RELEVANCE, page: $page, perPage: 50) {
            edges {
              voiceActors(language: JAPANESE, sort: RELEVANCE) {
                name {
                  full
                }
              }
              node {
                name {
                  full
                }
              }
            }
            pageInfo {
              hasNextPage
            }
          }`,
        isPaginated: true,
        getHasNextPage: (queryData: any) => queryData.data.Media.characters.pageInfo.hasNextPage,
    }
}
