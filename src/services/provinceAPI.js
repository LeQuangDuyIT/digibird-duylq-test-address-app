import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vapi.vnappmob.com/api/province',
  timeout: 10000
});

const provinceAPI = {
  getProvinces: () => {
    const url = '/';
    return api.get(url);
  },
  getDistricts: provinceId => {
    const url = `/district/${provinceId}`;
    return api.get(url);
  }
};

export default provinceAPI;
