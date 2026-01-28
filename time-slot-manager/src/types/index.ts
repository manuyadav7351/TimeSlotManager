export interface Timezone {
  id: string;
  name: string;
  offset: number;
}

export interface TimeslotDetails {
  originalUTC: string;
  converted: string;
  timezoneName: string;
}

export interface Timeslot {
  id: string;
  time: string;
}