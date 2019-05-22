import axios from "axios";

const BASE_URL_SEARCH = "https://api.giphy.com/v1/gifs/search";

export const searchGiphy = (limit: number, offset: number, query: string) => {
  return new Promise((resolve, reject) => {
    const params = [
      `api_key=${process.env.REACT_APP_GIPHY_API_KEY}`,
      `q=${query}`,
      `limit=${limit}`,
      `offset=${offset}`,
      "rating=G",
      "lang=en"
    ];

    const url = `${BASE_URL_SEARCH}?` + params.join("&");

    axios
      .get(url)
      .then(response => {
        resolve({ items: response.data.data, query });
      })
      .catch(error => {
        reject(error);
      });
  });
};
