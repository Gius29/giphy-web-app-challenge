import { LayoutIDs } from "../../../layouts";
import { HomePageActionType } from "../../actionTypes";
import { homePageReducer } from "../homePageReducer";

describe("homePageReducer", () => {
  const defaultState: HomePageState = {
    cards: [],
    query: "",
    searchOffset: 0,
    searchLimit: 10,
    searchResultPending: false,
    layoutID: LayoutIDs.ONE_COLUMN
  };

  describe("should return the deafult state", () => {
    it("with unknown action type", () => {
      const result = homePageReducer(undefined, { type: "STRANGE TYPE" });

      expect(result).toEqual(defaultState);
    });

    it("with DELETE_SEARCH", () => {
      const result = homePageReducer(undefined, {
        type: HomePageActionType.DELETE_SEARCH
      });

      expect(result).toEqual(defaultState);
    });

    it("with DELETE_SEARCH", () => {
      const result = homePageReducer(undefined, {
        type: HomePageActionType.SEARCH_QUERY_REJEXTED
      });

      expect(result).toEqual(defaultState);
    });
  });

  it("should set searchResultPending to true with SEARCH_QUERY_PENDING", () => {
    const result = homePageReducer(undefined, {
      type: HomePageActionType.SEARCH_QUERY_PENDING
    });

    expect(result).toEqual({ ...defaultState, searchResultPending: true });
  });

  it("should set right layoutID with CHANGE_LAYOUT", () => {
    // Starting with layout: LayoutIDs.THREE_COLUMNS
    let result = homePageReducer(
      { ...defaultState },
      {
        type: HomePageActionType.CHANGE_LAYOUT
      }
    );

    expect(result.layoutID).toEqual(LayoutIDs.THREE_COLUMNS);

    // Starting with layout: LayoutIDs.ONE_COLUMN
    result = homePageReducer(
      { ...defaultState, layoutID: LayoutIDs.THREE_COLUMNS },
      {
        type: HomePageActionType.CHANGE_LAYOUT
      }
    );

    expect(result.layoutID).toEqual(LayoutIDs.ONE_COLUMN);
  });

  describe("SEARCH_QUERY_FULFILLED", () => {
    it("should update the state with items in the response", () => {
      const result = homePageReducer(
        { ...defaultState },
        {
          type: HomePageActionType.SEARCH_QUERY_FULFILLED,
          payload: {
            items: [
              {
                id: "one",
                bitly_url: "bitly_url1",
                images: {
                  original: { url: "url1" }
                },
                title: "gifAlt1"
              },
              {
                id: "two",
                bitly_url: "bitly_url2",
                images: {
                  original: { url: "url2" }
                }
              }
            ]
          }
        }
      );

      expect(result).toMatchSnapshot();
    });

    it("should update the state with no items in the response", () => {
      const result = homePageReducer(
        { ...defaultState },
        {
          type: HomePageActionType.SEARCH_QUERY_FULFILLED,
          payload: {
            items: []
          }
        }
      );

      expect(result).toMatchSnapshot();
    });
  });
});
