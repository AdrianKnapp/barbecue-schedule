import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agenda de Churras | Churras',
  description: 'Marque e gerencie seu próximo agora.',
};

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default PageLayout;
