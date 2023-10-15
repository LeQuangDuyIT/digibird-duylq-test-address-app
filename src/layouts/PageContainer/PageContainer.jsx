import classNames from 'classnames';

const PageContainer = ({ children, className }) => {
  return <div className={classNames('w-full max-w-6xl min-w-[350px] mx-auto px-2 xl:px-0', className)}>{children}</div>;
};

export default PageContainer;
