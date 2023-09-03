import { type BarbecueModel } from '@/types/barbecue';
import routes from './routes';

type CreateBarbecueProps = {
  barbecue: Partial<BarbecueModel>;
};

const createBarbecue = async ({ barbecue }: CreateBarbecueProps) => {
  try {
    await fetch(`${routes.barbecues}`, {
      method: 'POST',
      body: JSON.stringify({
        ...barbecue,
      }),
    });
  } catch (err) {
    console.warn('barbecues-api-error:', err);
  }
};

export default createBarbecue;
