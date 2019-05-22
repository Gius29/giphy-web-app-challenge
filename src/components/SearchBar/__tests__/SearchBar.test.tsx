import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { LayoutIDs } from "../../../layouts";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
  const mockPlaceHolderMsg = "mockPlaceHolderMsg";

  it("should renders correctly with ONE_COLUMN layout", () => {
    const wrapper = renderer.create(
      <SearchBar
        placeHolderMsg={mockPlaceHolderMsg}
        layoutID={LayoutIDs.ONE_COLUMN}
        searchQuery={jest.fn()}
        changeLayout={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should renders correctly with THREE_COLUMNS layout", () => {
    const wrapper = renderer.create(
      <SearchBar
        placeHolderMsg={mockPlaceHolderMsg}
        layoutID={LayoutIDs.THREE_COLUMNS}
        searchQuery={jest.fn()}
        changeLayout={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should update the query field and perform a search", () => {
    const mockSearchQuery = jest.fn();

    const wrapper = mount(
      <SearchBar
        placeHolderMsg={mockPlaceHolderMsg}
        layoutID={LayoutIDs.ONE_COLUMN}
        searchQuery={mockSearchQuery}
        changeLayout={jest.fn()}
      />
    );

    //Interactions:
    // 1 - Simulate an imput form the user
    // 2 - simulate submit by the user
    wrapper
      .find("input")
      .simulate("change", { target: { value: "newQueryString" } });
    wrapper.find('[type="submit"]').simulate("submit");

    wrapper.unmount();
    expect(mockSearchQuery).toHaveBeenCalledTimes(1);
    expect(mockSearchQuery).toHaveBeenCalledWith("newQueryString");
  });
});
