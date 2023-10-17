import React from 'react';
import classNames from 'classnames';

const TextField = React.forwardRef(({ label, icon, error, required, ...rest }, ref) => {
  return (
    <div>
      <label className='flex items-center'>
        <span>{icon}</span>
        <span>{label}</span>
        <span className={classNames('text-red-500 ml-1', { hidden: !required })}>(*)</span>
      </label>
      <input
        {...rest}
        ref={ref}
        className={classNames(
          'w-full mt-1 py-2 px-4 border border-[#c7c7c7] rounded-md focus:outline-primary',
          {
            'border-2 border-red-500': error
          }
        )}
      />
      {error && <p className='text-red-500 mt-0.5 text-right'>{error}</p>}
    </div>
  );
});

export default TextField;
