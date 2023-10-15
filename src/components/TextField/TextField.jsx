import React from 'react';
import classNames from 'classnames';

const TextField = React.forwardRef(({ label, icon, error, required, ...rest }, ref) => {
  return (
    <div>
      <div className='flex items-center'>
        <span>{icon}</span>
        <span>{label}</span>
        <span className={classNames('text-red-500 ml-1', { hidden: !required })}>(*)</span>
      </div>
      <input
        {...rest}
        ref={ref}
        className={classNames(
          'w-full mt-1 py-2 px-4 border border-gray-400 rounded-md focus:outline-primary',
          {
            'border-2 border-red-500': error
          }
        )}
      />
      {error && <p className='text-red-500 mt-0.5'>{error}</p>}
    </div>
  );
});

export default TextField;
