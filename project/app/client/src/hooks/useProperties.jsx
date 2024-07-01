import { useQuery } from 'react-query';
import axios from 'axios';

const fetchProperties = async () => {
  const { data } = await axios.get('http://0.0.0.0:8000/api/v1/enodo/get_by_filter');
  return data;
};

export const useProperties = () => {
  return useQuery('properties', fetchProperties, {
    staleTime: 60000, // 1 minute
    cacheTime: 300000, // 5 minutes
    onError: (error) => {
      console.error('Error fetching properties:', error);
    },
  });
};
