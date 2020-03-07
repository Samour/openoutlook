import axios from 'axios';

export default function provider(baseURL) {
  return axios.create({ baseURL });
}
