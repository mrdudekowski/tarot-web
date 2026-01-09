import axios, { AxiosResponse } from 'axios';
import { ApiResponse, TarotCard, SpreadType, Reading } from '@/types';

// API base URL - in production this will be your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);

    // Handle common error cases
    if (error.response?.status === 404) {
      throw new Error('Ресурс не найден');
    }

    if (error.response?.status === 500) {
      throw new Error('Внутренняя ошибка сервера');
    }

    if (error.code === 'NETWORK_ERROR') {
      throw new Error('Проблемы с подключением к серверу');
    }

    throw error;
  }
);

export class ApiService {
  // Tarot Cards
  async getAllCards(): Promise<TarotCard[]> {
    const response: AxiosResponse<ApiResponse<TarotCard[]>> = await api.get('/api/tarot/cards');
    return response.data.data || [];
  }

  async getCardById(id: number): Promise<TarotCard | null> {
    try {
      const response: AxiosResponse<ApiResponse<TarotCard>> = await api.get(`/api/tarot/cards/${id}`);
      return response.data.data || null;
    } catch (error) {
      return null;
    }
  }

  // Spread Types
  async getAllSpreads(): Promise<SpreadType[]> {
    const response: AxiosResponse<ApiResponse<SpreadType[]>> = await api.get('/api/tarot/spreads');
    return response.data.data || [];
  }

  async getSpreadById(id: number): Promise<SpreadType | null> {
    try {
      const response: AxiosResponse<ApiResponse<SpreadType>> = await api.get(`/api/tarot/spreads/${id}`);
      return response.data.data || null;
    } catch (error) {
      return null;
    }
  }

  // Readings
  async createReading(spreadTypeId: number, question?: string): Promise<Reading> {
    const response: AxiosResponse<ApiResponse<Reading>> = await api.post('/api/readings', {
      spreadTypeId,
      question,
    });
    return response.data.data!;
  }

  async getUserReadings(): Promise<Reading[]> {
    const response: AxiosResponse<ApiResponse<Reading[]>> = await api.get('/api/readings');
    return response.data.data || [];
  }

  async getReadingById(id: number): Promise<Reading | null> {
    try {
      const response: AxiosResponse<ApiResponse<Reading>> = await api.get(`/api/readings/${id}`);
      return response.data.data || null;
    } catch (error) {
      return null;
    }
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response: AxiosResponse<{ status: string; timestamp: string }> = await api.get('/health');
    return response.data;
  }
}

export const apiService = new ApiService();