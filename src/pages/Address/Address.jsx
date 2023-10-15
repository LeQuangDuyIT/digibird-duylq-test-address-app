import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import AddAddressButton from '~/components/AddAddressButton';
import AddressCard from '~/components/AddressCard';
import Loading from '~/components/Loading';
import PageLayout from '~/layouts/PageLayout';
import { addressListState, currentUserState } from '~/recoil/state';
import AddressAPI from '~/services/AddressAPI';
import AuthAPI from '~/services/AuthAPI';
import { TOKEN_TYPES } from '~/utils/constants';

const Address = () => {
  const [loading, setLoading] = useState(false);
  const [addressList, setAddressList] = useRecoilState(addressListState);
  const setCurrentUser = useSetRecoilState(currentUserState);

  useEffect(() => {
    handleLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await AuthAPI.login();
      const accessToken = response.data.data.token;
      if (accessToken) {
        setCurrentUser({ isAuthenticated: true, data: response.data.data.user });
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
        {loading && <Loading />}
        {!loading && <AddAddressButton />}
        {addressList.length > 0 &&
          addressList.map(item => <AddressCard key={item.xid} data={item} />)}
      </div>
    </PageLayout>
  );
};

export default Address;
