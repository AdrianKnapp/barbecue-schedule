import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agenda de Churras | Login',
  description: 'Faça seu login e comece a marcar seus churras.',
};

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default PageLayout;
