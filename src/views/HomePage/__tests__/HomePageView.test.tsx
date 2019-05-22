import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { LayoutIDs } from "../../../layouts";
import { HomePageView } from "../HomePageView";

describe("HomePageView", () => {
  it("should renders correctly with ONE_COLUMN layout and a pagination pending", () => {
    const props = {
      cards: [],
      query: "",
      searchOffset: 0,
      searchLimit: 10,
      searchResultPending: true,
      layoutID: LayoutIDs.ONE_COLUMN
    };
    const wrapper = renderer.create(<HomePageView {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should renders correctly with ONE_COLUMN layout and end of the list", () => {
    const props = {
      cards: [],
      query: "",
      searchOffset: -1,
      searchLimit: 10,
      searchResultPending: false,
      layoutID: LayoutIDs.THREE_COLUMNS
    };
    const wrapper = renderer.create(<HomePageView {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should provide InfiniteScroll with the ability to perform a searchQuery", () => {
    const searchQueryAction = jest.fn();
    const props = {
      cards: [],
      query: "query",
      searchOffset: 0,
      searchLimit: 10,
      searchResultPending: false,
      layoutID: LayoutIDs.THREE_COLUMNS,
      searchQueryAction
    };
    const wrapper = mount(<HomePageView {...props} />);

    // it simulates the user that scroll down and triggers the next pagination of the search
    wrapper
      .find("InfiniteScroll")
      .props()
      .searchQuery();

    wrapper.unmount();
    expect(searchQueryAction).toHaveBeenCalledTimes(1);
    expect(searchQueryAction).toHaveBeenCalledWith(10, 0, "query");
  });

  it("should block a search query from InfiniteScroll if searchResultPending=true", () => {
    const searchQueryAction = jest.fn();
    const props = {
      cards: [],
      query: "query",
      searchOffset: 10,
      searchLimit: 5,
      searchResultPending: true,
      layoutID: LayoutIDs.THREE_COLUMNS,
      searchQueryAction
    };
    const wrapper = mount(<HomePageView {...props} />);

    // it simulates the user that scroll down and triggers the next pagination of the search
    wrapper
      .find("InfiniteScroll")
      .props()
      .searchQuery();

    wrapper.unmount();
    expect(searchQueryAction).toHaveBeenCalledTimes(0);
  });

  it("should provide SearchBar with the ability to perform a searchQuery", () => {
    const searchQueryAction = jest.fn();
    const deleteSearchAction = jest.fn();
    const props = {
      cards: [],
      query: "query",
      searchOffset: 10,
      searchLimit: 5,
      searchResultPending: false,
      layoutID: LayoutIDs.THREE_COLUMNS,
      searchQueryAction,
      deleteSearchAction
    };
    const wrapper = mount(<HomePageView {...props} />);

    // it simulates a new search done by the user
    wrapper
      .find("SearchBar")
      .props()
      .searchQuery("newSearchString");

    wrapper.unmount();
    expect(deleteSearchAction).toHaveBeenCalledTimes(1);
    expect(searchQueryAction).toHaveBeenCalledTimes(1);
    expect(searchQueryAction).toHaveBeenCalledWith(5, 0, "newSearchString");
  });
});
