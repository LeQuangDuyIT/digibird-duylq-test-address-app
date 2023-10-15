import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { FaPlus } from 'react-icons/fa';
import Button from '~/components/Button';
import { PATH } from '~/routes';

const AddAddressButton = () => {
  const navigate = useNavigate();

  const onClickAddAddress = () => {
    navigate(PATH.ADD_ADDRESS);
  };

  return (
    <div className='ct-address-card-width h-64 border-4 p-4 rounded-lg'>
      <div className='flex flex-col justify-center items-center gap-5 h-full border-4 border-dashed rounded-lg'>
        <div
          className={classNames(
            'ct-flex-center flex-col w-24 aspect-square rounded-full',
            'border-4 border-black border-dashed opacity-10',
            'cursor-pointer hover:border-primary hover:text-primary hover:opacity-100'
          )}
          onClick={onClickAddAddress}
        >
          <FaPlus size='60%' />
        </div>
        <Button onClick={onClickAddAddress}>Thêm mới</Button>
      </div>
    </div>
  );
};

export default AddAddressButton;
