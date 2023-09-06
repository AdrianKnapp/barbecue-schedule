import { type BarbecueModel } from '@/types/barbecue';
import routes from './routes';

type getBarbecueByIdProps = {
  id: string;
  fetchOptions?: RequestInit;
  baseUrl?: string;
};

const getBarbecueById = async ({
  id,
  fetchOptions = {},
  baseUrl = '',
}: getBarbecueByIdProps): Promise<{
  barbecue?: BarbecueModel;
  error?: string;
}> => {
  let data;

  try {
    const response = await fetch(`${baseUrl}${routes.barbecues}/${id}`, {
      ...fetchOptions,
    });
    data = await response.json();
  } catch (err) {
    console.warn('barbecues-api-error:', err);
    data = {};
  }

  return data;
};

export default getBarbecueById;
