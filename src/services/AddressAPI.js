import api from './axiosInstance';

const AddressAPI = {
  fetchAll: () => {
    const url =
      '/self/address?fields=id,xid,name,email,phone,address,shipping_address,city,state,country';
    return api.get(url);
  },
  create: data => {
    const url = '/self/address';
    return api.post(url, data);
  },
  update: (id, data) => {
    const url = `/seft/address/${id}`;
    return api.put(url, data);
  }
};

export default AddressAPI;
