import { useEffect, useState } from 'react';
import { FaClosedCaptioning, FaSearch, FaXRay } from 'react-icons/fa';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Button from '~/components/Button';
import { addressListState, addressfilterListState } from '~/recoil/state';

const ToolBar = () => {
  const addressList = useRecoilValue(addressListState);
  const setAddressFilterList = useSetRecoilState(addressfilterListState);
  const [inputValue, setInputValue] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [debouncedInputValue, setDebouncedInputValue] = useState('');

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  // Debounce Input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  useEffect(() => {
    const handleSearch = () => {
      const results = addressList.filter(item => {
        const { name, phone, email, city, state, address } = item;
        const keyData = [name, phone.toString(), email, city, state, address];
        const isContainedSearchKey = keyData.some(
          key =>
            key.toLowerCase().includes(debouncedInputValue.toLowerCase()) ||
            debouncedInputValue.toLowerCase().includes(key.toLowerCase())
        );
        return isContainedSearchKey;
      });
      // Check no results
      const isNotFound = debouncedInputValue !== '' && results.length === 0;
      if (isNotFound) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setAddressFilterList(results);
    };
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue]);

  const handleCancelSearch = () => {
    setAddressFilterList([]);
    setInputValue('');
  };

  return (
    <>
      <div className='flex items-center gap-2 w-full sm:w-[60%] lg:w-1/2 p-2 ml-auto border border-gray-400 rounded-lg'>
        <FaSearch />
        <input
          placeholder='Nhập tên, số điện thoại, hoặc địa chỉ...'
          value={inputValue}
          onChange={handleInputChange}
          className='w-full outline-none'
        />
        <button className='opacity-40 hover:opacity-100' onClick={handleCancelSearch}>
          Hủy
        </button>
      </div>
      {noResults && <p className='text-right text-red-500'>không tìm thấy kết quả</p>}
    </>
  );
};

export default ToolBar;
