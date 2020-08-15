import axios from 'axios';
import { IConfiguration } from 'models/IConfiguration';

export default async function provider(): Promise<IConfiguration> {
  const res = await axios.get('/config.json');
  return res.data;
}
