import routes from './routes';

const getBarbecues = async () => {
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
