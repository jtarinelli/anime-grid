import { makeGraphQlQuery } from "./graphQlQuery"

const query = `query anime_poster($id: Int!) {
        Media(id: $id) {
          coverImage {
            large
          }
        }
      }`

export const animePosterQuery = async (id?: number): Promise<any> => {
    if (!id) {
        return null;
    }
    return makeGraphQlQuery(query, { id })
}