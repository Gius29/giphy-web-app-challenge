import React, { PureComponent } from "react";
import { LayoutIDs } from "../../layouts";

import style from "./InfiniteScroll.module.scss";

interface StateProps {
  items: any;
  render: any;
  layoutID: LayoutIDs;
}

interface DispatchProps {
  searchQuery: () => void;
}

type InfiniteScrollProps = StateProps & DispatchProps;

class InfiniteScroll extends PureComponent<InfiniteScrollProps> {
  componentDidMount() {
    window.onscroll = () => {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight;
      if (bottomOfWindow === document.documentElement.offsetHeight) {
        this.props.searchQuery();
      }
    };
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  selectLayout() {
    const { layoutID } = this.props;
    if (layoutID === LayoutIDs.ONE_COLUMN) {
      return style.infiniteScroll_one_column;
    }
    // LayoutIDs.THREE_COLUMNS (There are no other layout possible)
    return style.infiniteScroll_three_columns;
  }

  render() {
    const { items, render } = this.props;
    const style = this.selectLayout();

    if (items && items.length > 0) {
      const l = items.map((item: any) => <li key={item.id}>{render(item)}</li>);
      return <ul className={style}>{l}</ul>;
    }

    return <ul />;
  }
}

export default InfiniteScroll;
