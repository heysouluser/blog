import { handleResponseError } from './articles-api';

const url = 'https://blog.kata.academy/api/';

const optionsBase = (method, body) => ({
  method,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(body),
});

export const registerUser = async (body) => {
  const requestOptions = optionsBase('POST', body);
  const response = await fetch(`${url}users`, requestOptions);
  const json = await response.json();
  return json;
};

export const loginUser = async (body) => {
  const requestOptions = optionsBase('POST', body);
  const response = await fetch(`${url}users/login`, requestOptions);
  const json = await response.json();
  return json;
};

export const updateCurrentUser = async (body, token) => {
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${url}user`, options);
  handleResponseError(url, response);
  const json = await response.json();
  return json;
};

export async function getCurrentUser(token) {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: null,
  };
  const response = await fetch(`${url}user`, options);
  handleResponseError(url, response);
  const json = await response.json();
  return json;
}
