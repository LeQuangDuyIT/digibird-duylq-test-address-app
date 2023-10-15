const Loading = () => {
  return (
    <div className='flex justify-center w-full'>
      <div className='w-12 h-12 rounded-full animate-spin absolute border border-solid border-yellow-500 border-t-transparent'></div>
      <h6 className='pt-16'>Loading...</h6>
    </div>
  );
};

export default Loading;
