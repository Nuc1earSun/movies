export const fetchData = async (url) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_TMDB_TOKEN,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};
