'use client';
import { useEffect, useMemo, useState } from 'react';
import TimezoneDropdown from '@/components/TimeZoneDrop';
import TimeslotList from '@/components/TimeSlot';
import TimeslotDetails from '@/components/TimeSlotDetails';
import { fetchTimezones, fetchTimeslots } from '@/services/api';
import { convertToTimezone } from '@/controller/timezoneConverter';
import { Timezone, TimeslotDetails as TimeslotDetailsType } from '@/types';


export default function Home() {
  const [timezones, setTimezones] = useState<Timezone[]>([]);
  const [utcTimeslots, setUtcTimeslots] = useState<string[]>([]);
  const [selectedTimezone, setSelectedTimezone] = useState<Timezone | null>(null);
  const [selectedTimeslot, setSelectedTimeslot] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [tz, slots] = await Promise.all([fetchTimezones(), fetchTimeslots()]);
        setTimezones(tz);
        setUtcTimeslots(slots);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const convertedTimeslots = useMemo(() => {
    if (!selectedTimezone) return utcTimeslots;
    return utcTimeslots.map(t => convertToTimezone(t, selectedTimezone));
  }, [utcTimeslots, selectedTimezone]);

  const selectedTimeslotDetails = useMemo(() => {
    if (!selectedTimezone || !selectedTimeslot) return null;
    const index = convertedTimeslots.indexOf(selectedTimeslot);
    if (index === -1) return null;
    return { originalUTC: utcTimeslots[index], converted: selectedTimeslot, timezoneName: selectedTimezone.name,} as TimeslotDetailsType;
  }, [selectedTimezone, selectedTimeslot, convertedTimeslots, utcTimeslots]);

  return (
    <main className="main-container">
      <header className="header">
        <h2>Timezone and Timeslot Management</h2>
      </header>

      {error && ( <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
      </div>)}

      <section className="content">
        <span className='sub-content1'>
          <TimezoneDropdown timezones={timezones} selectedTimezone={selectedTimezone} onTimezoneChange={tz => { setSelectedTimezone(tz); setSelectedTimeslot(null); setShowDetails(false); }} isLoading={loading}/>
        </span>
        <span className='sub-content2'>
          <TimeslotList timeslots={convertedTimeslots} selectedTimeslot={selectedTimeslot} onTimeslotSelect={slot => { setSelectedTimeslot(slot); setShowDetails(false); }} isLoading={loading}/>
        </span>
        <span className='sub-content3'>
          {selectedTimeslotDetails && ( <TimeslotDetails details={selectedTimeslotDetails} isVisible={showDetails} onShowDetails={() => setShowDetails(prev => !prev)} /> )}
        </span>
      </section>
    </main>
  );
}
