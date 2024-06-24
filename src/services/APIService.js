import axios from 'axios';

const API_BASE_URL = 'https://api.magicthegathering.io/v1';

// Fetch cards name-type
export const fetchCardsByName = async (name, type) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cards`, {
      params: { name, type }
    });
    return response.data.cards;
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw error;
  }
};

// Fetch card types
export const fetchCardTypes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/types`);
    return response.data.types;
  } catch (error) {
    console.error('Error fetching card types:', error);
    throw error;
  }
};
