import { Booking, ScheduleBlock, ScheduleSettings } from './types';

const BOOKINGS_KEY = 'classea_bookings';
const COMPLETED_KEY = 'classea_completed';
const BLOCKS_KEY = 'studiogaby_blocks';
const SCHEDULE_SETTINGS_KEY = 'studio_schedule_settings';

// Safe localStorage wrappers — prevent crashes in restricted webviews (e.g. Instagram browser)
function lsGet(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function lsSet(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch { /* noop */ }
}

export function getBlocks(): ScheduleBlock[] {
  try { return JSON.parse(lsGet(BLOCKS_KEY) || '[]'); } catch { return []; }
}

export function saveBlocks(blocks: ScheduleBlock[]): void {
  lsSet(BLOCKS_KEY, JSON.stringify(blocks));
}

export function addBlock(block: ScheduleBlock): void {
  const blocks = getBlocks();
  blocks.push(block);
  saveBlocks(blocks);
}

export function removeBlock(id: string): void {
  saveBlocks(getBlocks().filter(b => b.id !== id));
}

export function getBookings(): Booking[] {
  try { return JSON.parse(lsGet(BOOKINGS_KEY) || '[]'); } catch { return []; }
}

export function saveBookings(bookings: Booking[]): void {
  lsSet(BOOKINGS_KEY, JSON.stringify(bookings));
}

export function addBooking(booking: Booking): void {
  const bookings = getBookings();
  bookings.push(booking);
  saveBookings(bookings);
}

export function removeBooking(id: string): void {
  saveBookings(getBookings().filter(b => b.id !== id));
}

export function getCompleted(): Booking[] {
  try { return JSON.parse(lsGet(COMPLETED_KEY) || '[]'); } catch { return []; }
}

export function saveCompleted(completed: Booking[]): void {
  lsSet(COMPLETED_KEY, JSON.stringify(completed));
}

export function addCompleted(booking: Booking): void {
  const completed = getCompleted();
  completed.push({ ...booking, status: 'completed' });
  saveCompleted(completed);
}

export function removeCompleted(id: string): Booking | undefined {
  const completed = getCompleted();
  const removed = completed.find(b => b.id === id);
  saveCompleted(completed.filter(b => b.id !== id));
  return removed;
}

export function getScheduleSettings(): ScheduleSettings {
  try {
    const data = lsGet(SCHEDULE_SETTINGS_KEY);
    if (data) return JSON.parse(data);
  } catch { /* noop */ }
  return {
    weekly: {
      1: ['09:00', '10:00', '14:00', '17:00', '17:30', '18:00', '18:30'],
      2: ['09:00', '10:00', '14:00', '17:00', '17:30', '18:00', '18:30'],
      3: ['09:00', '10:00', '14:00', '17:00', '17:30', '18:00', '18:30'],
      4: ['09:00', '10:00', '14:00', '17:00', '17:30', '18:00', '18:30'],
      5: ['09:00', '10:00', '14:00', '17:00', '17:30', '18:00', '18:30'],
      6: ['10:00', '12:30', '14:00'],
      0: [],
    },
    specificDates: {}
  };
}

export function saveScheduleSettings(settings: ScheduleSettings): void {
  lsSet(SCHEDULE_SETTINGS_KEY, JSON.stringify(settings));
}
