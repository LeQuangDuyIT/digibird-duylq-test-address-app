import { FaEdit, FaHome, FaMailBulk, FaPhoneAlt, FaTrash } from 'react-icons/fa';
import Button from '~/components/Button';

const AddressCard = ({ data }) => {
  return (
    <div
      key={data.xid}
      className='ct-address-card-width flex flex-col justify-between h-64 bg-gray-200 rounded-lg'
    >
      <div className='flex justify-end datas-start gap-6 p-2 bg-primary/20 rounded-lg shadow-address-card'>
        <h3 className='my-4 font-bold text-lg'>{data.name}</h3>
        <div className='ct-flex-center w-16 aspect-square rounded-full bg-primary text-white text-3xl font-bold'>
          {data.name[0]}
        </div>
      </div>
      <div className='flex flex-col justify-start datas-start gap-1 px-4'>
        <Button text icon={<FaPhoneAlt />}>
          {data.phone}
        </Button>
        <Button text icon={<FaMailBulk />}>
          {data.email}
        </Button>
        <Button text icon={<FaHome />}>
          <div className='flex gap-x-1.5 flex-wrap'>
            <span>{data.address},</span>
            <span>{data.state},</span>
            <span>{data.city}</span>
          </div>
        </Button>
      </div>
      <div className='flex justify-end gap-8 mt-2 px-4 py-2 bg-gray-300/90 rounded-b-lg'>
        <Button text icon={<FaEdit />} className='text-gray-600 hover:text-black'>
          Chỉnh sửa
        </Button>
        <Button text icon={<FaTrash />} className='text-red-500 hover:text-red-700'>
          Xóa
        </Button>
      </div>
    </div>
  );
};

export default AddressCard;
