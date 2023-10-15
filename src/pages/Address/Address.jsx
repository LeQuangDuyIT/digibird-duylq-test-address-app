import AddAddressButton from '~/components/AddAddressButton';
import PageLayout from '~/layouts/PageLayout';

const Address = () => {
  return (
    <PageLayout>
      <div className='flex gap-8 flex-wrap'>
        <AddAddressButton />
      </div>
    </PageLayout>
  );
};

export default Address;
