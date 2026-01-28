import { Timezone } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const fetchTimezones = async (): Promise<Timezone[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/timezones`);
    if (!response.ok) {
      throw new Error(`Failed to fetch timezones: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching timezones:', error);
    throw error;
  }
};

export const fetchTimeslots = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/timeslots`);
    if (!response.ok) {
      throw new Error(`Failed to fetch timeslots: ${response.statusText}`);
    }
    const data = await response.json();
    return data.map((slot: any) => slot.time);
  } catch (error) {
    console.error('Error fetching timeslots:', error);
    throw error;
  }
};

