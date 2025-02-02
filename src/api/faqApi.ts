import axios from 'axios';
// import type { FAQ } from '../types/faq';

const API_BASE_URL = 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getFAQs = async (selectedLanguage: string) => {
  try {
    console.log(selectedLanguage);
    const response = await api.get(`/api/GET/faqs?lang=${selectedLanguage}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch FAQs');
    }
    throw error;
  }
};

export const createFAQ = async (faq: any) => {
  try {
    const response = await api.post('/api/POST/faqs', faq);
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to create FAQ');
    }
    throw error;
  }
};

export const deleteFAQ = async (id:string) => {
  try{
    await api.delete(`/api/DELETE/faqs/${id}`);
    return;
  }catch(error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to delete FAQ');
    }
    throw error;
  }
}