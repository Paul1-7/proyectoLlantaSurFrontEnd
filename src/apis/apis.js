import axios from 'axios';
import configData from '../config';

const { BASE_URL } = configData;

export default axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});
