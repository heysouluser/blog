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
};

export const getArticles = async (token, offset) => {
  const response = await fetch(`${url}articles?offset=${offset}&limit=5`, requestOptions(token));
  handleResponseError(url, response);
  const body = await response.json();
  return body;
};

export const getArticle = async (token, slug) => {
  const response = await fetch(`${url}articles/${slug}`, requestOptions(token));
  handleResponseError(url, response);
  const body = await response.json();
  return body;
};

export const createArticle = async (data, token) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(`${url}articles`, options);
  handleResponseError(url, response);
  const json = await response.json();
  return json;
};

export const updateArticle = async (data, token, slug) => {
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(`${url}articles/${slug}`, options);
  handleResponseError(url, response);
  const json = await response.json();
  return json;
};

export const deleteArticle = async (token, slug) => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
  };
  try {
    await fetch(`${url}articles/${slug}`, options);
  } catch (err) {
    throw new Error(`Could not fetch, received ${err}`);
  }
};
