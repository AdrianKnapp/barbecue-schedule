import { type BarbecueModel } from '@/types/barbecue';
import routes from './routes';

type UpdateBarbecueProps = {
  id: string;
  barbecue: Partial<BarbecueModel>;
};

const updateBarbecue = async ({ id, barbecue }: UpdateBarbecueProps) => {
  try {
    await fetch(`${routes.barbecues}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...barbecue,
      }),
    });
  } catch (err) {
    console.warn('barbecues-api-error:', err);
  }
};

export default updateBarbecue;
