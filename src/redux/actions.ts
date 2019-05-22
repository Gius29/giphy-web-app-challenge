import { HomePageActionType } from "./actionTypes";
import { searchGiphy } from "../network/giphyAPI";

export const searchQueryAction = (
  limit: number,
  offset: number,
  query: string
) => {
  return {
    type: HomePageActionType.SEARCH_QUERY,
    payload: searchGiphy(limit, offset, query)
  };
};

export const deleteSearchAction = () => {
  return {
    type: HomePageActionType.DELETE_SEARCH,
    payload: {}
  };
};

export const changeLayoutAction = () => {
  return {
    type: HomePageActionType.CHANGE_LAYOUT,
    payload: {}
  };
};
