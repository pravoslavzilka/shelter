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