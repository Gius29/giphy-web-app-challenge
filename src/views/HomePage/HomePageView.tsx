import React, { Component } from "react";
import { connect } from "react-redux";
import {
  searchQueryAction,
  deleteSearchAction,
  changeLayoutAction
} from "../../redux/actions";
import { AppState } from "../../redux/state/AppState";
import { HomePageState } from "../../redux/state/HomePageState";

import { InfiniteScroll } from "../../components/InfiniteScroll";
import { Card, CardModel } from "../../components/Card";
import { SearchBar } from "../../components/SearchBar";

import styles from "./HomePageView.module.scss";

interface DispatchProps {
  searchQueryAction: (limit: number, offset: number, query: string) => void;
  deleteSearchAction: () => void;
  changeLayoutAction: () => void;
}

type HomePageViewPops = HomePageState & DispatchProps;

export class HomePageView extends Component<HomePageViewPops> {
  readonly searchPlaceHolderMsg: string;

  constructor(props: HomePageViewPops) {
    super(props);
    this.searchPlaceHolderMsg = "Enter your query here";

    this.newQueryFromSearchBar = this.newQueryFromSearchBar.bind(this);
    this.nextPaginationAfterSearch = this.nextPaginationAfterSearch.bind(this);
  }

  newQueryFromSearchBar(query: string) {
    // Dispatch an action to delete previus results and reset the status
    this.props.deleteSearchAction();

    // Dispatch an action to fetch new results using the GIPHY API
    this.props.searchQueryAction(this.props.searchLimit, 0, query);
  }

  nextPaginationAfterSearch() {
    // if there is an ongoing pagination request we don't start a new one
    if (this.props.searchResultPending) {
      return;
    }
    this.props.searchQueryAction(
      this.props.searchLimit,
      this.props.searchOffset,
      this.props.query
    );
  }

  render() {
    return (
      <div className={styles.homePageContainer}>
        <h2> Giphy Search Challenge </h2>
        <SearchBar
          placeHolderMsg={this.searchPlaceHolderMsg}
          searchQuery={this.newQueryFromSearchBar}
          layoutID={this.props.layoutID}
          changeLayout={this.props.changeLayoutAction}
        />

        <InfiniteScroll
          items={this.props.cards}
          render={(card: CardModel) => <Card card={card} />}
          searchQuery={this.nextPaginationAfterSearch}
          layoutID={this.props.layoutID}
        />

        {this.props.searchResultPending && (
          <div className={styles.message}>Searching...</div>
        )}

        {!this.props.searchResultPending &&
          this.props.searchOffset === -1 && (
            <div className={styles.message}>End of the list</div>
          )}
      </div>
    );
  }
}

// [IMPROVMENT] We can use a selector library to simplify the syntax
// Ex. https://github.com/reduxjs/reselect
const mapStateToProps = (state: AppState) => {
  if (state.homePage) {
    const {
      cards,
      query,
      searchOffset,
      searchLimit,
      searchResultPending,
      layoutID
    } = state.homePage;
    return {
      cards,
      query,
      searchOffset,
      searchLimit,
      searchResultPending,
      layoutID
    };
  }

  return state;
};

const mapDispatchToProps: DispatchProps = {
  searchQueryAction,
  deleteSearchAction,
  changeLayoutAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageView);
