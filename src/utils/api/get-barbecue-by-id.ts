import routes from './routes';

const getBarbecueById = async (id: string) => {
  let data;

  try {
    const response = await fetch(`${routes.barbecues}/${id}`);
    data = await response.json();
  } catch (err) {
    console.warn('barbecues-api-error:', err);
    data = {};
  }

  return data;
};

export default getBarbecueById;
