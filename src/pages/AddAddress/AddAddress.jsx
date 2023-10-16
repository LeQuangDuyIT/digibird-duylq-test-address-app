/* eslint-disable no-useless-escape */
/* eslint-disable indent */
import { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { useRecoilState } from 'recoil';
import Button from '~/components/Button';
import Message from '~/components/Message';
import TextField from '~/components/TextField';
import PageLayout from '~/layouts/PageLayout';
import { editAddressState } from '~/recoil/state';
import AddressAPI from '~/services/AddressAPI';
import provinceAPI from '~/services/provinceAPI';

const initalValue = {
  name: '',
  email: '',
  phone: '',
  city: '',
  state: '',
  address: ''
};

const AddAddress = () => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm(initalValue);

  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [message, setMessage] = useState(null);

  const [{ isEditing, originData }, setEditAddressState] = useRecoilState(editAddressState);

  useEffect(() => {
    fetchData(provinceAPI.getProvinces, setProvinceData);
  }, []);

  useEffect(() => {
    const cityObject = provinceData.find(province => province.province_name === originData.city);
    const sateObject = districtData.find(district => district.district_name === originData.state);
    if (isEditing) {
      setValue('name', originData.name);
      setValue('email', originData.email);
      setValue('phone', originData.phone);
      setValue('city', cityObject);
      setValue('state', sateObject);
      setValue('address', originData.address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  const fetchData = async (apiFunction, setDataFunction) => {
    try {
      const response = await apiFunction();
      setDataFunction(response.data.results);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const onProvinceChange = objectValue => {
    setValue('city', objectValue);
    setValue('state', null);
    fetchData(() => provinceAPI.getDistricts(objectValue.value), setDistrictData);
  };

  const onSubmit = async formValue => {
    const { city, state, ...restValue } = formValue;
    const { label: cityValue } = city;
    const { label: stateValue } = state;
    const data = {
      city: cityValue,
      state: stateValue,
      country: 'VN',
      shipping_address: formValue.address,
      zipcode: 200,
      ...restValue
    };
    // Update address
    if (isEditing) {
      try {
        const updatedData = { ...data, xid: originData.xid };
        await AddressAPI.update(originData.xid, updatedData);
        setMessage('Cập nhật thành công');
        handleResetForm();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
      // Add address
    } else {
      try {
        await AddressAPI.create(data);
        handleResetForm();
        setMessage('Thêm mới thành công');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  };

  const handleResetForm = () => {
    reset();
    setValue('city', null);
    setValue('state', null);
    setDistrictData([]);
    setEditAddressState({
      isEditing: false,
      originData: {}
    });
  };

  const provinceOptions = useMemo(
    () =>
      provinceData.map(province => ({
        label: province.province_name,
        value: province.province_id
      })),
    [provinceData]
  );

  const districtOptions = useMemo(
    () =>
      districtData.map(district => ({
        label: district.district_name,
        value: district.district_id
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [districtData]
  );

  return (
    <>
      {message && <Message content={message} />}
      <PageLayout>
        <div className='w-1/2 min-w-[calc(350px-16px*2)] mt-8 px-4 lg:px-12 py-4 mx-auto rounded-lg bg-primary/20'>
          <h1 className='mb-4 text-2xl font-bold text-center text-gray-600'>
            {isEditing ? 'CHỈNH SỬA DANH BẠ' : 'TẠO DANH BẠ MỚI'}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
            <TextField
              label={'Tên'}
              {...register('name', { required: true })}
              error={errors.name ? 'Vui lòng nhập tên' : undefined}
              required
            />
            <TextField
              label={'Email'}
              // eslint-disable-next-line no-useless-escape
              {...register('email', {
                required: true,
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
              })}
              error={
                errors.email
                  ? errors.email.type === 'required'
                    ? 'Vui lòng nhập email'
                    : errors.email.type === 'pattern'
                    ? 'Vui lòng nhập đúng định dạng email'
                    : undefined
                  : undefined
              }
              required
            />
            <TextField
              label={'Số điện thoại'}
              {...register('phone', {
                required: true,
                validate: {
                  positiveNumber: value => parseFloat(value) > 0
                }
              })}
              error={
                errors.phone
                  ? errors.phone.type === 'required'
                    ? 'Vui lòng nhập số điện thoại'
                    : errors.phone.type === 'positiveNumber'
                    ? 'Vui lòng nhập chữ số'
                    : undefined
                  : undefined
              }
              required
            />
            {/* City/Province selector */}
            <div>
              <p className='mb-1'>
                Tỉnh/Thành phố
                <span className='text-red-500 ml-1'>(*)</span>
              </p>
              <Controller
                name='city'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder='Nhập hoặc bấm chọn'
                    options={provinceOptions}
                    onChange={onProvinceChange}
                    classNames={{
                      control: () => 'h-[42px] rounded-md border-[#c7c7c7]'
                    }}
                  />
                )}
              />
              {errors.city && (
                <p className='text-red-500 mt-0.5 text-right'>Vui lòng chọn tỉnh/thành phố</p>
              )}
            </div>
            {/* End City/Province selector */}
            {/* State/District selector */}
            <div>
              <p className='mb-1'>
                Huyện/Quận
                <span className='text-red-500 ml-1'>(*)</span>
              </p>
              <Controller
                name='state'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder='Nhập hoặc bấm chọn'
                    isDisabled={districtData.length === 0}
                    options={districtOptions}
                    classNames={{
                      control: () => 'h-[42px] rounded-md border-[#c7c7c7]'
                    }}
                  />
                )}
              />
              {errors.state && (
                <p className='text-red-500 mt-0.5 text-right'>Vui lòng chọn huyện/quận</p>
              )}
            </div>
            {/* End State/District selector */}
            <TextField
              label={'Địa chỉ'}
              {...register('address', { required: true })}
              error={errors.address ? 'Vui lòng nhập địa chỉ chi tiết' : undefined}
              required
            />
            <div className='flex justify-center gap-4'>
              <Button outline type='reset' onClick={handleResetForm} className='w-fit'>
                Hủy
              </Button>
              <Button type='submit' className='w-fit'>
                {isEditing ? 'Cập nhật' : 'Tạo'}
              </Button>
            </div>
          </form>
        </div>
      </PageLayout>
    </>
  );
};

export default AddAddress;
