import { useEffect, useState } from 'react';
import { FaEdit, FaHome, FaMailBulk, FaPhone, FaPhoneAlt, FaSearch, FaTrash } from 'react-icons/fa';
import AddAddressButton from '~/components/AddAddressButton';
import AddressCard from '~/components/AddressCard';
import Button from '~/components/Button';
import PageLayout from '~/layouts/PageLayout';
import AddressAPI from '~/services/AddressAPI';
import AuthAPI from '~/services/AuthAPI';
import { TOKEN_TYPES } from '~/utils/constants';

const Address = () => {
  const [addressList, setAddressList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await AuthAPI.login();
      const accessToken = response.data.data.token;
      if (accessToken) {
        localStorage.setItem(TOKEN_TYPES.ACCESS_TOKEN, accessToken);
        fetchAddressData();
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAddressData = async () => {
    try {
      const response = await AddressAPI.fetchAll();
      const addressData = response.data.data;
      setAddressList(addressData);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <PageLayout>
      <div className='flex gap-8 flex-wrap'>
        <AddAddressButton />
        {addressList.length > 0 &&
          addressList.map(item => <AddressCard key={item.xid} data={item} />)}
      </div>
    </PageLayout>
  );
};

export default Address;
