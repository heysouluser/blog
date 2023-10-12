import axios from 'axios';

import { createAxiosDefaultParams } from './articles-api';

const url = 'https://blog.kata.academy/api/';

export const registerUser = async (body) => {
  try {
    const response = await axios.post(`${url}users`, body);
    return response.data;
  } catch (error) {
    throw new Error(`Could not fetch, received ${error.message}`);
  }
};

export const loginUser = async (body) => {
  try {
    const response = await axios.post(`${url}users/login`, body);
    return response.data;
  } catch (error) {
    throw new Error(`Could not fetch, received ${error.message}`);
  }
};

export const updateCurrentUser = async (body, token) => {
  const axiosDefaultParams = createAxiosDefaultParams(token);
  try {
    const response = await axiosDefaultParams.put('user', body);
    return response.data;
  } catch (error) {
    throw new Error(`Could not fetch, received ${error.message}`);
  }
};

export const getCurrentUser = async (token) => {
  const axiosDefaultParams = createAxiosDefaultParams(token);
  try {
    const response = await axiosDefaultParams.get('user');
    return response.data;
  } catch (error) {
    throw new Error(`Could not fetch, received ${error.message}`);
  }
};
