import getBarbecueById from '@/utils/api/get-barbecue-by-id';
import { type Metadata } from 'next';
import { cookies } from 'next/headers';

const defaultMetadata = {
  title: 'Agenda de Churras',
  description: 'Página do seu churrasco.',
};

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}): Promise<Metadata> {
  const id = params.id;

  const token = cookies().get('bbc-token');

  if (!token?.value) {
    return defaultMetadata;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const data = await getBarbecueById({
      id,
      baseUrl,
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      },
    });

    const { barbecue } = data ?? {};

    if (!barbecue) {
      return defaultMetadata;
    }

    return {
      title: `Agenda de Churras | ${barbecue.name}`,
      description: `Gerencie seu churrasco agora.`,
    };
  } catch (err) {
    return defaultMetadata;
  }
}

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default PageLayout;
