import React from 'react';
import axios from 'axios';

export function checkHttpStatus(response) {
  console.log(response);
  if (response.status >= 200 && response.status < 300) {
    console.log('nice')
    return response;
  }
}

export function request(token) {
  const config = {
    baseURL: 'http://localhost:9000',
    timeout: 3000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (token) { config.headers.Authorization = `Bearer ${token}`; }

  return axios.create(config);
}
