import React from "react";
import renderer from "react-test-renderer";
import { CardModel } from "../CardModel";
import Card from "../Card";

const mockCard: CardModel = {
  id: "mockId",
  bitlyUrl: "mockBitlyUrl",
  gifUrl: "mockGifUrl",
  gifAlt: "mockGifAlt"
};

describe("Card", () => {
  it("should renders correctly", () => {
    const result = renderer.create(<Card card={mockCard} />);
    expect(result).toMatchSnapshot();
  });
});
