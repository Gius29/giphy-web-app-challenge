import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { LayoutIDs } from "../../../layouts";
import InfiniteScroll from "../InfiniteScroll";

describe("InfiniteScroll", () => {
  const mockItems = [1, 2, 3];

  it("should render a list of elements with a cloumn", () => {
    const wrapper = renderer.create(
      <InfiniteScroll
        items={mockItems}
        render={(item: number) => <div>{item}</div>}
        layoutID={LayoutIDs.ONE_COLUMN}
        searchQuery={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render a list of elements with three columns", () => {
    const wrapper = renderer.create(
      <InfiniteScroll
        items={mockItems}
        render={(item: number) => <div>{item}</div>}
        layoutID={LayoutIDs.THREE_COLUMNS}
        searchQuery={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should return an empty list", () => {
    const wrapper = renderer.create(
      <InfiniteScroll
        items={[]}
        render={(item: number) => <div>{item}</div>}
        layoutID={LayoutIDs.THREE_COLUMNS}
        searchQuery={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should trigger a search query", () => {
    const mockSearchQuery = jest.fn();

    const wrapper = mount(
      <InfiniteScroll
        items={mockItems}
        render={(item: number) => <div>{item}</div>}
        layoutID={LayoutIDs.THREE_COLUMNS}
        searchQuery={mockSearchQuery}
      />
    );

    // Edit the values to trigger a pagination
    document.documentElement.scrollTop = 0;
    window.innerHeight = 0;

    window.onscroll();

    wrapper.unmount();
    expect(mockSearchQuery).toHaveBeenCalledTimes(1);
  });

  it("should trigger a search query", () => {
    const mockSearchQuery = jest.fn();

    const wrapper = mount(
      <InfiniteScroll
        items={mockItems}
        render={(item: number) => <div>{item}</div>}
        layoutID={LayoutIDs.THREE_COLUMNS}
        searchQuery={mockSearchQuery}
      />
    );

    // Edit the values to not trigger a pagination
    document.documentElement.scrollTop = 0;
    window.innerHeight = 100;

    window.onscroll();

    wrapper.unmount();
    expect(mockSearchQuery).toHaveBeenCalledTimes(0);
  });
});
