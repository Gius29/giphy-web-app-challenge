import React, { Component } from "react";
import { LayoutIDs } from "../../layouts";

import styles from "./SearchBar.module.scss";

interface StateProps {
  placeHolderMsg: string;
  layoutID: LayoutIDs;
}

interface DispatchProps {
  searchQuery: (query: string) => void;
  changeLayout: () => void;
}

type SearchBarProps = StateProps & DispatchProps;

interface OwnState {
  query: string;
}

class SearchBar extends Component<SearchBarProps, OwnState> {
  constructor(props: SearchBarProps) {
    super(props);

    this.state = { query: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ query: event.target.value });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    this.props.searchQuery(this.state.query);
    event.preventDefault();
  }

  selectLayoutMessage() {
    const { layoutID } = this.props;
    if (layoutID === LayoutIDs.ONE_COLUMN) {
      return "3 columns";
    }
    // LayoutIDs.THREE_COLUMNS (There are no other layout possible)
    return "1 column";
  }

  render() {
    const { placeHolderMsg } = this.props;
    const layoutMessage = this.selectLayoutMessage();

    return (
      <form className={styles.searchBar} onSubmit={this.handleSubmit}>
        <input
          value={this.state.query}
          placeholder={placeHolderMsg}
          onChange={this.handleChange}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={this.props.changeLayout}>
          {layoutMessage}
        </button>
      </form>
    );
  }
}

export default SearchBar;
