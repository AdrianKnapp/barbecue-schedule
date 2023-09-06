import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Churras Trinca | Cadastro',
  description: 'Faça seu cadastro e comece a marcar seus churras.',
};

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default PageLayout;
