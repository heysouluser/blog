import axios from 'axios';

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
  try {
    const response = await axios.put(`${url}user`, body, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Could not fetch, received ${error.message}`);
  }
};

export const getCurrentUser = async (token) => {
  try {
    const response = await axios.get(`${url}user`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Could not fetch, received ${error.message}`);
  }
};
