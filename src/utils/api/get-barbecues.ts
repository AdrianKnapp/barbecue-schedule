import { type BarbecueModel } from '@/types/barbecue';
import routes from './routes';

type getBarbecuesReturn = {
  barbecues?: BarbecueModel[];
};

const getBarbecues = async (): Promise<getBarbecuesReturn> => {
  let data;

  try {
    const response = await fetch(`${routes.barbecues}`);
    data = await response.json();
  } catch (err) {
    console.warn('barbecues-api-error:', err);
    data = {};
  }

  console.log('🚀 ~ file: get-barbecues.ts:10 ~ getBarbecues ~ data:', data);
  return data;
};

export default getBarbecues;
