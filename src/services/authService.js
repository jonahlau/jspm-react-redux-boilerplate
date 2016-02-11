import axios from 'axios';
import { request } from '../utils/index';
import { checkHttpStatus } from '../utils/index'
/*
* @param {Object} options
* @param {String} options.username
* @param {String} options.password
* @param {String} options.accessToken
* */

export default function authenticate(options) {
  return request().post('/auth/login', {
    username: options.username,
    password: options.password,
  })
    .then(checkHttpStatus)
    .then((response) => response.data);
}
