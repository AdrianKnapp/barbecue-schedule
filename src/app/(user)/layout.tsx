import Logo from '@/components/common/Logo';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="user-layout">
      <div className="forms-container">{children}</div>
      <Logo />
    </div>
  );
};

export default UserLayout;
