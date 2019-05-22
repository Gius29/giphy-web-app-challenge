import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { searchGiphy } from "../giphyAPI";

describe("giphyAPI", () => {
  describe("searchGiphy", () => {
    it("shoul build the right URL and parse the API response", async () => {
      expect.assertions(1);
      const generatedURL =
        "https://api.giphy.com/v1/gifs/search?api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6&q=mockQUeryStr&limit=10&offset=10&rating=G&lang=en";

      axios.get = jest.fn((url) => {
        if (url === generatedURL) {
          return Promise.resolve({
            data: { data: "mockData" }
          });
        }
      });

      const result = await searchGiphy(10, 10, "mockQUeryStr");

      expect(result).toEqual({ items: "mockData", query: "mockQUeryStr" });
    });

    it("shoul handle error", async () => {
      axios.get = jest.fn((url) => {
        return Promise.reject({ error: "badError" });
      });

      const result = searchGiphy(10, 10, "mockQUeryStr");

      await expect(result).rejects.toEqual({ error: "badError" });
    });
  });
});
