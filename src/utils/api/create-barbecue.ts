import { type BarbecueModel } from '@/types/barbecue';
import routes from './routes';

type CreateBarbecueProps = {
  barbecue: Partial<BarbecueModel>;
};

const createBarbecue = async ({
  barbecue,
}: CreateBarbecueProps): Promise<{
  barbecue?: BarbecueModel;
}> => {
  try {
    const response = await fetch(`${routes.barbecues}`, {
      method: 'POST',
      body: JSON.stringify({
        ...barbecue,
      }),
    });

    return await response.json();
  } catch (err) {
    console.warn('barbecues-api-error:', err);
    return {
      barbecue: undefined,
    };
  }
};

export default createBarbecue;
