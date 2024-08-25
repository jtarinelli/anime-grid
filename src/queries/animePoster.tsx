import { graphql } from "../gql/gql";

export const animePosterQuery = graphql(`query anime_poster($id: Int!) {
        Media(id: $id) {
          coverImage {
            large
          }
        }
      }`)