import classNames from 'classnames';

const Button = ({ children, icon, outline, text, onClick, ...rest }) => {
  return (
    <button
      className={classNames(
        'flex items-center gap-4 px-4 py-2 border rounded-lg',
        'border-primary bg-primary hover:bg-primary/80 text-white',
        {
          'bg-transparent text-primary hover:text-white': outline,
          'bg-transparent text-black border-transparent hover:bg-transparent': text
        }
      )}
      onClick={onClick}
      {...rest}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
