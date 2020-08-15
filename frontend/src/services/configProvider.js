import axios from 'axios';

export default async function provider() {
    const res = await axios.get('/config.json');
    return res.data;
}
