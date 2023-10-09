import axios from 'axios';

const url = 'https://blog.kata.academy/api/';

// export const getArticles = async (token, offset) => {
//   const response = await fetch(`${url}articles?offset=${offset}&limit=5`, requestOptions(token));
//   handleResponseError(url, response);
//   const body = await response.json();
//   return body;
// };

export const getArticles = async (token, offset) => {
  try {
    const response = await axios.get(`${url}articles?offset=${offset}&limit=5`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Could not fetch, received ${error.message}`);
  }
};

export const getArticle = async (token, slug) => {
  try {
    const response = await axios.get(`${url}articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Could not fetch, received ${error.message}`);
  }
};

export const createArticle = async (data, token) => {
  try {
    const response = await axios.post(`${url}articles`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Could not fetch, received ${error.message}`);
  }
};

export const updateArticle = async (data, token, slug) => {
  try {
    const response = await axios.put(`${url}articles/${slug}`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Could not fetch, received ${error.message}`);
  }
};

export const deleteArticle = async (token, slug) => {
  try {
    await axios.delete(`${url}articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    throw new Error(`Could not fetch, received ${error.message}`);
  }
};

export const favoriteArticle = async (token, slug) => {
  try {
    await axios.post(`${url}articles/${slug}/favorite`, null, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    throw new Error(`Could not fetch, received ${error.message}`);
  }
};

export const unfavoriteArticle = async (token, slug) => {
  try {
    await axios.delete(`${url}articles/${slug}/favorite`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    throw new Error(`Could not fetch, received ${error.message}`);
  }
};
