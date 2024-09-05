import { gql } from "graphql-request"
import clueQueries from "../clues/clueQueries"
import { ClueQueryInfo } from "../clues/types"
import { print } from 'graphql';
import uniqBy from 'lodash/uniqBy';

const uniqueQueries = uniqBy(Object.values(clueQueries), 'fragmentName');

const fragments = uniqueQueries.map(query => print(query.fragment)).join('\n\n');
const fragmentNames = uniqueQueries.map(query => query.fragmentName);

const fragmentParameters = fragmentNames.map(fragmentName =>
  `$${fragmentName.toLowerCase()}: Boolean!`).join(', ');

const fragmentsWithDirectives = fragmentNames.map(fragmentName =>
  `...${fragmentName} @include(if: $${fragmentName.toLowerCase()})`).join('\n')

export const animeInfoQuery = gql`
  query anime_info($id: Int!, $page: Int!, ${fragmentParameters}) {
    Media(id: $id) {
      ${fragmentsWithDirectives}
    }
  }

  ${fragments}
  `;

export const getAnimeInfoClueDirectiveVariables = (cluesToInclude: ClueQueryInfo[]) => {
  return fragmentNames.reduce((variables: Record<string, boolean>, fragment: string) => {
    variables[fragment.toLowerCase()] =
      cluesToInclude.some(includedClue => includedClue.fragmentName === fragment);
    return variables;
  }, {});
}
