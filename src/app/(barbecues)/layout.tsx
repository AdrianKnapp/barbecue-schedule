import Logo from '@/components/common/Logo';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="content-container">
      <div className="content-wrapper">{children}</div>
      <Logo />
    </div>
  );
};

export default CommonLayout;
