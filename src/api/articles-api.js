import axios from 'axios';

export const createAxiosDefaultParams = (token) =>
  axios.create({
    baseURL: 'https://blog.kata.academy/api/',
    headers: {
      Authorization: `Token ${token}`,
    },
  });

export const getArticles = async (token, offset) => {
  const axiosDefaultParams = createAxiosDefaultParams(token);
  try {
    const response = await axiosDefaultParams.get(`articles?offset=${offset}&limit=5`);
    return response.data;
  } catch (error) {
    throw new Error(`Could not fetch, received ${error.message}`);
  }
};

export const getArticle = async (token, slug) => {
  const axiosDefaultParams = createAxiosDefaultParams(token);
  try {
    const response = await axiosDefaultParams.get(`articles/${slug}`);
    return response.data;
  } catch (error) {
    throw new Error(`Could not fetch, received ${error.message}`);
  }
};

export const createArticle = async (data, token) => {
  const axiosDefaultParams = createAxiosDefaultParams(token);
  try {
    const response = await axiosDefaultParams.post('articles', data);
    return response.data;
  } catch (error) {
    throw new Error(`Could not fetch, received ${error.message}`);
  }
};

export const updateArticle = async (data, token, slug) => {
  const axiosDefaultParams = createAxiosDefaultParams(token);
  try {
    const response = await axiosDefaultParams.put(`articles/${slug}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Could not fetch, received ${error.message}`);
  }
};

export const deleteArticle = async (token, slug) => {
  const axiosDefaultParams = createAxiosDefaultParams(token);
  try {
    await axiosDefaultParams.delete(`articles/${slug}`);
  } catch (error) {
    throw new Error(`Could not fetch, received ${error.message}`);
  }
};

export const favoriteArticle = async (token, slug) => {
  const axiosDefaultParams = createAxiosDefaultParams(token);
  try {
    await axiosDefaultParams.post(`articles/${slug}/favorite`);
  } catch (error) {
    throw new Error(`Could not fetch, received ${error.message}`);
  }
};

export const unfavoriteArticle = async (token, slug) => {
  const axiosDefaultParams = createAxiosDefaultParams(token);
  try {
    await axiosDefaultParams.delete(`articles/${slug}/favorite`);
  } catch (error) {
    throw new Error(`Could not fetch, received ${error.message}`);
  }
};
