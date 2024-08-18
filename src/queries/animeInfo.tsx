import { ClueQueryInfo } from "../checkGuess"

export const buildAnimeInfoQuery = (clueQueryInfo: ClueQueryInfo, id: number) => {
    return {
        query: `query anime_info($id: Int!) {
        Media(id: $id) {
          ${clueQueryInfo.fields}
        }
      }`,
        variables: { 
            id,
         }
    }
}

export const buildPaginatedAnimeInfoQuery = (clueQueryInfo: ClueQueryInfo, id: number, page: number) => {
    return {
        query: `query anime_info($id: Int!, $page: Int!) {
        Media(id: $id) {
          ${clueQueryInfo.fields}
        }
      }`,
        variables: { 
            id,
            page,
         }
    }
}