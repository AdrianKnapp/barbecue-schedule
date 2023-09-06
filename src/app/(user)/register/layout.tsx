import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agenda de Churras | Cadastro',
  description: 'Faça seu cadastro e comece a marcar seus churras.',
};

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default PageLayout;
