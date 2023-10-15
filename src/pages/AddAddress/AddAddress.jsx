/* eslint-disable indent */
import { useForm } from 'react-hook-form';
import Button from '~/components/Button';
import TextField from '~/components/TextField';
import PageLayout from '~/layouts/PageLayout';

const AddAddress = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = e => {
    console.log(e);
  };

  return (
    <PageLayout>
      <div className='w-1/2 mt-8 px-12 py-4 mx-auto rounded-lg bg-primary/20'>
        <h1 className='mb-4 text-2xl font-bold text-center text-gray-600'>TẠO DANH BẠ MỚI</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
          <TextField
            label={'Tên'}
            {...register('name', { required: true })}
            error={errors.name ? 'Vui lòng nhập tên' : undefined}
            required
          />
          <TextField
            label={'Email'}
            // eslint-disable-next-line no-useless-escape
            {...register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
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
          <TextField
            label={'Địa chỉ'}
            {...register('address', { required: true })}
            error={errors.address ? 'Vui lòng nhập địa chỉ' : undefined}
            required
          />
          <Button type='submit'>Tạo</Button>
        </form>
      </div>
    </PageLayout>
  );
};

export default AddAddress;
