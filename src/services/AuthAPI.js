import api from './axiosInstance';

const AuthAPI = {
  login: () => {
    const body = {
      id: '0869017747',
      name: 'Phát',
      company_id: 9
    };
    const url = '/sign-up-zalo';
    return api.post(url, body);
  }
};

export default AuthAPI;
