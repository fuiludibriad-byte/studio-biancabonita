export interface Service {
  name: string;
  time: number;
  price: number;
  image: string;
  category: string;
}

export interface ScheduleBlock {
  id: string;
  date: string;
  allDay: boolean;
  start?: string;
  end?: string;
  reason: string;
}

export interface ScheduleSettings {
  weekly: {
    [dayOfWeek: number]: string[];
  };
  specificDates: {
    [dateStr: string]: string[];
  };
}

export interface Booking {
  id: string;
  service: string;
  price: number;
  date: string;
  time: string;
  name: string;
  phone: string;
  status: 'pending' | 'accepted' | 'completed';
}

export const SERVICES: Service[] = [
  // Cílios - Aplicação
  { name: 'Volume Brasileiro', time: 120, price: 185, image: 'https://i.imgur.com/ezLWhuV.jpeg', category: 'Cílios - Aplicação' },
  { name: 'Fox Eyes', time: 120, price: 190, image: 'https://i.imgur.com/76kIeKL.jpeg', category: 'Cílios - Aplicação' },
  { name: 'Fox Eyes Castanho', time: 120, price: 190, image: 'https://i.imgur.com/Pb8CWhF.jpeg', category: 'Cílios - Aplicação' },
  { name: 'Volume 4D', time: 120, price: 190, image: 'https://i.imgur.com/Kke0EKF.jpeg', category: 'Cílios - Aplicação' },
  { name: 'Hibrido', time: 120, price: 165, image: 'https://i.imgur.com/xXctb20.jpeg', category: 'Cílios - Aplicação' },
  { name: 'Lash Lifting', time: 90, price: 160, image: 'https://i.imgur.com/ybjObHC.jpeg', category: 'Cílios - Aplicação' },
  { name: 'Volume Brasileiro Castanho', time: 120, price: 190, image: 'https://i.imgur.com/MVFQ6BW.jpeg', category: 'Cílios - Aplicação' },
  { name: 'Efeito Sirena', time: 120, price: 170, image: 'https://i.imgur.com/DvJZexK.jpeg', category: 'Cílios - Aplicação' },
  { name: 'Clássico Fio a fio', time: 120, price: 160, image: 'https://i.imgur.com/WwVyaOe.jpeg', category: 'Cílios - Aplicação' },
  { name: 'Efeito Sirena Castanho', time: 120, price: 170, image: 'https://i.imgur.com/CVQ9j5X.jpeg', category: 'Cílios - Aplicação' },
  { name: 'Volume Lua', time: 120, price: 170, image: 'https://i.imgur.com/Bo65V6w.jpeg', category: 'Cílios - Aplicação' },
  { name: 'Mega Brasileiro', time: 150, price: 200, image: 'https://i.imgur.com/H5h47Qt.jpeg', category: 'Cílios - Aplicação' },
  { name: 'Brow Lamination', time: 90, price: 150, image: 'https://i.imgur.com/PGkxWG2.jpeg', category: 'Cílios - Aplicação' },
  
  // Designer - Sobrancelha
  { name: 'Design de sobrancelhas', time: 40, price: 50, image: 'https://i.imgur.com/1KtZ93l.jpeg', category: 'Designer - Sobrancelha' },
  { name: 'Design de sobrancelhas com Henna', time: 40, price: 65, image: 'https://i.imgur.com/Of8LVLf.jpeg', category: 'Designer - Sobrancelha' }
];

export const GALLERY_IMAGES = [
  'https://i.imgur.com/mulpmhA.jpeg',
  'https://i.imgur.com/guNBe7K.jpeg',
  'https://i.imgur.com/lFYUkjP.jpeg',
  'https://i.imgur.com/Kke0EKF.jpeg',
  'https://i.imgur.com/MVFQ6BW.jpeg'
];

export const WHATSAPP_NUMBER = '5519995085020';

export function isOpenNow(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeValue = hour * 60 + minute;

  if (day === 0) return false;
  return timeValue >= 540 && timeValue < 1200; // 09:00 to 20:00
}

export function isDayAllowed(date: Date): boolean {
  return date.getDay() !== 0; // Fechado aos Domingos
}

export function getTimesForDate(date: Date): string[] {
  const day = date.getDay();
  if (day === 0) return []; // Domingos
  if (day === 6) {
    // Sábados: 10:00, 12:30 e 14:00
    return ['10:00', '12:30', '14:00'];
  }
  // Segunda a Sexta: 09:00, 10:00, 14:00, 17:00, 17:30, 18:00 e 18:30
  return ['09:00', '10:00', '14:00', '17:00', '17:30', '18:00', '18:30'];
}

export function getBookingDuration(serviceName: string): number {
  const names = serviceName.split(' + ');
  let total = 0;
  names.forEach(name => {
    const svc = SERVICES.find(s => s.name === name);
    if (svc) {
      total += svc.time;
    }
  });
  return total || 180; // default to 180min if unknown (lash designer standard)
}

export function generateWhatsAppUrl(phone: string, message: string): string {
  return `https://api.whatsapp.com/send?phone=${phone.replace(/\D/g, '')}&text=${encodeURIComponent(message)}`;
}

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function generateUUID(): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
    try {
      return window.crypto.randomUUID();
    } catch (e) {
      // Fallback if browser throws security error in non-secure context or frame
    }
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

