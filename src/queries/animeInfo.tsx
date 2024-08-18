import { ClueQueryInfo } from "../clues/types"

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

export const buildBatchedAnimeInfoQuery = (clueQueriesInfo: ClueQueryInfo[], id: number) => {
  return {
    query: `query anime_info($id: Int!) {
    Media(id: $id) {
      ${clueQueriesInfo.map(queryInfo => queryInfo.fields).join("\r\n")}
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