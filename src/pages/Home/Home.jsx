import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full h-screen p-[5%]'>
      <div className='h-full flex flex-col justify-center items-center gap-12 rounded-2xl bg-[#242424] text-white'>
        <img
          src='/public/images/logo-350x125.png'
          alt='DigiBrid Logo'
          className='h-16 lg:h-24 hover:drop-shadow-logo-hover transition duration-300'
        />
        <h1 className='text-3xl lg:text-5xl font-bold'>DigiBird Test Exercise</h1>
        <div className='flex flex-col items-center gap-3'>
          <h3 className='text-xl lg:text-2xl'>Developer:</h3>
          <h2 className='text-3xl lg:text-5xl font-bold'>LÊ QUANG DUY</h2>
        </div>
        <div className='flex flex-col items-center gap-10'>
          <button
            className='px-12 py-3 bg-primary hover:bg-primary/90 rounded-lg text-xl font-bold'
            onClick={() => navigate('/address')}
          >
            Start
          </button>
          <p className='text-[#888]'>Click on the button view details exercise</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
