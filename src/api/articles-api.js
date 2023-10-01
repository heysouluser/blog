const url = 'https://blog.kata.academy/api/';

export const requestOptions = (token) => ({
  method: 'GET',
  headers: {
    Authorization: `Token ${token}`,
    Accept: 'application/json',
  },
});

export const handleResponseError = (requestUrl, response) => {
  if (!response.ok) {
    throw new Error(`Could not fetch ${requestUrl}, received ${response.status}`);
  }
  return response;
};

export const getArticles = async (token, offset) => {
  const response = await fetch(`${url}articles?offset=${offset}&limit=5`, requestOptions(token));
  handleResponseError(url, response);
  const body = await response.json();
  console.log(body);
  return body;
};

export const getArticle = async (token, slug) => {
  const response = await fetch(`${url}articles/${slug}`, requestOptions(token));
  handleResponseError(url, response);
  const body = await response.json();
  return body;
};
