import { useRecoilValue } from 'recoil';
import PageContainer from '~/layouts/PageContainer';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import { PATH } from '~/routes';
import { currentUserState } from '~/recoil/state';
import { FaUserAlt } from 'react-icons/fa';

const PageLayout = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, data: userData } = useRecoilValue(currentUserState);

  return (
    <div className='text-base'>
      {/* Header */}
      <header className='mb-12 bg-gray-600/80'>
        <PageContainer className='flex justify-between items-center h-16 py-2'>
          <button className='h-full' onClick={() => navigate(PATH.ROOT)}>
            <img src='/public/images/logo-350x125.png' alt='DigiBird Logo' className='h-full' />
          </button>
          <div>
            {isAuthenticated ? (
              <Button icon={<FaUserAlt />} onClick={() => navigate(PATH.ADDRESS)}>
                <span>{userData.name}</span>
                <span className='hidden lg:inline'> - {userData.email}</span>
              </Button>
            ) : (
              <Button onClick={() => navigate(PATH.ADDRESS)}>Đang đăng nhập...</Button>
            )}
          </div>
        </PageContainer>
      </header>
      {/* End Header */}
      <PageContainer>{children}</PageContainer>
      {/* Footer */}
      <footer></footer> {/* End Footer */}
    </div>
  );
};

export default PageLayout;
