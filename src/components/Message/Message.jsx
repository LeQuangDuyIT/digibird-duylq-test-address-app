import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const Message = ({ content }) => {
  const [unmount, setUnmount] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setUnmount(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (unmount) return null;

  return (
    <div
      className={classNames(
        'ct-flex-center flex-col gap-2 fixed top-12 left-[calc(50%-150px)]',
        'w-[300px] h-24 p-4 rounded-lg bg-green-100 shadow-2xl'
      )}
    >
      <FaCheck />
      <p>{content}</p>
    </div>
  );
};

export default Message;
