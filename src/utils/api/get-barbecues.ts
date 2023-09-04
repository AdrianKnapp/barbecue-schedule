import { type BarbecueModel } from '@/types/barbecue';
import routes from './routes';

type getBarbecuesReturn = {
  barbecues?: BarbecueModel[];
};

const getBarbecues = async (): Promise<getBarbecuesReturn> => {
  let data;

  try {
    const response = await fetch(`http://localhost:3000/${routes.barbecues}`);
    data = await response.json();
  } catch (err) {
    console.warn('barbecues-api-error:', err);
    data = {};
  }

  return data;
};

export default getBarbecues;
