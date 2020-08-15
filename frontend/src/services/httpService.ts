import axios, { AxiosInstance } from 'axios';

export default function provider(baseURL: string): AxiosInstance {
  return axios.create({ baseURL });
}
