import classNames from 'classnames';

const Button = ({ children, icon, outline, text, onClick, className, type, ...rest }) => {
  return (
    <button
      className={classNames(
        'flex items-center gap-2 border rounded-lg',
        'border-primary bg-primary hover:bg-primary/80',
        {
          'px-4 py-2': !text,
          'text-white': !outline && !text,
          'bg-transparent text-primary hover:text-white': outline,
          'bg-transparent text-black border-transparent hover:bg-transparent px-0 py-0': text
        },
        [className]
      )}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
