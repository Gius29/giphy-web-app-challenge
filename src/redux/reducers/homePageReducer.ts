import { HomePageState } from "../state/HomePageState";
import { HomePageActionType } from "../actionTypes";
import { LayoutIDs } from "../../layouts";

const defaultState: HomePageState = {
  cards: [],
  query: "",
  searchOffset: 0,
  searchLimit: 10,
  searchResultPending: false,
  layoutID: LayoutIDs.ONE_COLUMN
};

export const homePageReducer = (
  state: HomePageState = defaultState,
  action: any
) => {
  switch (action.type) {
    case HomePageActionType.DELETE_SEARCH:
    // [IMPROVMENT] The error should display a meaningful message to the user.
    case HomePageActionType.SEARCH_QUERY_REJEXTED:
      return { ...defaultState, layoutID: state.layoutID };

    case HomePageActionType.SEARCH_QUERY_PENDING:
      return { ...state, searchResultPending: true };

    case HomePageActionType.SEARCH_QUERY_FULFILLED:
      // Increasing the pagination offeset value to have it ready for next api call
      let newSearchOffset = state.searchOffset + state.searchLimit;

      if (action.payload.items.length === 0) {
        //The negative number indicates that the list is ended
        newSearchOffset = -1;
      }

      // Extracting from the API response the content that is needed to create a card (CardModel)
      const newCards = action.payload.items.map((item: any) => ({
        id: item.id, // The id should be unique, if not we need to add a salt
        bitlyUrl: item.bitly_url,
        gifUrl: item.images.original.url,
        gifAlt: item.title || "gif image"
      }));

      return {
        ...state,
        query: action.payload.query,
        searchOffset: newSearchOffset,
        searchResultPending: false,
        cards: [...state.cards, ...newCards]
      };

    case HomePageActionType.CHANGE_LAYOUT:
      let newLayout = LayoutIDs.THREE_COLUMNS;
      if (state.layoutID === LayoutIDs.THREE_COLUMNS) {
        newLayout = LayoutIDs.ONE_COLUMN;
      }
      return { ...state, layoutID: newLayout };

    default:
      return state;
  }
};
