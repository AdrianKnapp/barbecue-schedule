import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Churras Trinca | Churras',
  description: 'Marque e gerencie seu próximo agora.',
};

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default PageLayout;
