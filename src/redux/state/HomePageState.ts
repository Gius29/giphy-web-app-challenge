import { CardModel } from "../../components/Card";
import { LayoutIDs } from "../../layouts";

export interface HomePageState {
  cards: CardModel[];
  query: string;
  searchOffset: number;
  searchLimit: number;
  searchResultPending: boolean;
  layoutID: LayoutIDs;
}
