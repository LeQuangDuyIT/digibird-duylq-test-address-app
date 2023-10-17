import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import AddAddressButton from '~/components/AddAddressButton';
import AddressCard from '~/components/AddressCard';
import Loading from '~/components/Loading';
import PageLayout from '~/layouts/PageLayout';
import { addressListState, addressfilterListState, currentUserState } from '~/recoil/state';
import AddressAPI from '~/services/AddressAPI';
import AuthAPI from '~/services/AuthAPI';
import { TOKEN_TYPES } from '~/utils/constants';
import ToolBar from './ToolBar';

const Address = () => {
  const [loading, setLoading] = useState(false);
  const [addressList, setAddressList] = useRecoilState(addressListState);
  const addressFilterList = useRecoilValue(addressfilterListState);
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

  const renderList = addressFilterList.length > 0 ? addressFilterList : addressList;

  return (
    <PageLayout>
      {!loading && <ToolBar />}
      <div className='flex gap-8 flex-wrap mt-8'>
        {loading && <Loading />}
        {!loading && <AddAddressButton />}
        {!loading &&
          renderList.length > 0 &&
          renderList.map(item => <AddressCard key={item.xid} data={item} />)}
      </div>
    </PageLayout>
  );
};

export default Address;
