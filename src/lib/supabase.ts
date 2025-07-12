import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Booking {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  booking_date: string;
  guests: number;
  special_requests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  email_verified: boolean;
  verification_code?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Availability {
  date: string;
  is_available: boolean;
  max_guests: number;
  current_bookings: number;
} 

export async function createBooking(booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([booking])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateBookingStatus(id: string, status: Booking['status'], emailVerified: boolean = false) {
  const { data, error } = await supabase
    .from('bookings')
    .update({ 
      status, 
      email_verified: emailVerified,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getBooking(id: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function verifyBookingCode(id: string, code: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('verification_code')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data.verification_code === code;
}


export async function getAvailability(startDate: string, endDate: string): Promise<Availability[]> {
  const { data, error } = await supabase
    .rpc('get_availability', {
      start_date: startDate,
      end_date: endDate
    });

  if (error) throw error;
  return data || [];
}


export async function getDateAvailability(date: string): Promise<Availability | null> {
  const { data, error } = await supabase
    .from('availability')
    .select('*')
    .eq('date', date)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Date not found in availability table, assume available
      return {
        date,
        is_available: true,
        max_guests: 6,
        current_bookings: 0
      };
    }
    throw error;
  }

  return {
    date: data.date,
    is_available: data.is_available && data.current_bookings < data.max_guests,
    max_guests: data.max_guests,
    current_bookings: data.current_bookings
  };
}

export async function updateAvailability(date: string, updates: Partial<Availability>): Promise<void> {
  const { error } = await supabase
    .from('availability')
    .upsert({
      date,
      ...updates,
      updated_at: new Date().toISOString()
    });

  if (error) throw error;
}

// Helper function to check if a date is available
export async function isDateAvailable(date: string): Promise<boolean> {
  const availability = await getDateAvailability(date);
  return availability?.is_available ?? true;
}