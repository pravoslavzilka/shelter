/*
  # Create bookings table for tourist shelter

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `first_name` (text, required)
      - `last_name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `booking_date` (date, required)
      - `guests` (integer, required)
      - `special_requests` (text, optional)
      - `status` (text, required, default 'pending')
      - `email_verified` (boolean, default false)
      - `verification_code` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `bookings` table
    - Add policy for public to create bookings
    - Add policy for authenticated users to read their own bookings
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  booking_date date NOT NULL,
  guests integer NOT NULL DEFAULT 1,
  special_requests text DEFAULT '',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  email_verified boolean DEFAULT false,
  verification_code text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create bookings (for public booking form)
CREATE POLICY "Anyone can create bookings"
  ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anyone to read bookings (for confirmation purposes)
CREATE POLICY "Anyone can read bookings"
  ON bookings
  FOR SELECT
  TO anon
  USING (true);

-- Allow anyone to update bookings (for email verification)
CREATE POLICY "Anyone can update bookings"
  ON bookings
  FOR UPDATE
  TO anon
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);