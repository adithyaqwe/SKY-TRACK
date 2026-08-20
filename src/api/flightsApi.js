import axios from 'axios';
import { API_BASE_URL, FETCH_RADIUS_NM } from '../utils/constants';

export const fetchFlights = async (lat, lon) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/v2/lat/${lat}/lon/${lon}/dist/${FETCH_RADIUS_NM}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    throw new Error('Failed to fetch flight data. The service might be temporarily unavailable.');
  }
};
