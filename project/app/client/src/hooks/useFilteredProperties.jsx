import { useQuery } from 'react-query';
import axios from 'axios';

// Custom hook to fetch filtered properties based on search criteria
const fetchFilteredProperties = async ({ queryKey }) => {
  const [, searchCriteria] = queryKey;
  // Construct query parameters, including full_address="" if all fields are empty
  const params = Object.values(searchCriteria).every(value => value === '')
    ? { full_address: "" }
    : {};

  for (const key in searchCriteria) {
    if (searchCriteria[key]) {
      params[key] = searchCriteria[key];
    }
  }
  const { data } = await axios.get('http://localhost:8000/api/v1/enodo/get_by_filter', { params });
  return data;
};

export const useFilteredProperties = (searchCriteria) => {
  return useQuery(['filteredProperties', searchCriteria], fetchFilteredProperties, {
    enabled: !!searchCriteria, // Only run the query if search criteria is defined
  });
};
