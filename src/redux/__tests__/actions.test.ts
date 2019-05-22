jest.mock("../../network/giphyAPI", () => {
  return {
    searchGiphy: jest.fn().mockReturnValue("searchGiphyResult")
  };
});

import { HomePageActionType } from "../actionTypes";
import { searchGiphy } from "../../network/giphyAPI";
import {
  searchQueryAction,
  deleteSearchAction,
  changeLayoutAction
} from "../actions";

describe("Actions - ", () => {
  it("searchQueryAction should return the right action", () => {
    const result = searchQueryAction(10, 5, "query");

    expect(result.type).toEqual(HomePageActionType.SEARCH_QUERY);
    expect(result.payload).toEqual("searchGiphyResult");
    expect(searchGiphy).toHaveBeenCalledTimes(1);
    expect(searchGiphy).toHaveBeenCalledWith(10, 5, "query");
  });

  it("deleteSearchAction should return the right action", () => {
    const result = deleteSearchAction();

    expect(result.type).toEqual(HomePageActionType.DELETE_SEARCH);
  });

  it("changeLayoutAction should return the right action", () => {
    const result = changeLayoutAction();

    expect(result.type).toEqual(HomePageActionType.CHANGE_LAYOUT);
  });
});
