import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { sk, enUS } from 'date-fns/locale';
import { createBooking, type Booking } from '@/lib/supabase';

interface BookingFormProps {
  selectedDate: Date | undefined;
  language: 'sk' | 'en';
  onBookingSubmitted: (email: string, bookingId: string, formData?: any) => void;
}

export default function BookingForm({ selectedDate, language, onBookingSubmitted }: BookingFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    guests: '',
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const translations = {
    sk: {
      title: 'Rezervujte si pobyt',
      firstName: 'Meno',
      lastName: 'Priezvisko',
      email: 'Email',
      phone: 'Telefónne číslo',
      guests: 'Počet hostí',
      selectGuests: 'Vyberte počet hostí',
      guest: 'hosť',
      guests2: 'hostia',
      guests3: 'hostí',
      specialRequests: 'Špeciálne požiadavky',
      specialRequestsPlaceholder: 'Akékoľvek špeciálne požiadavky alebo diétne obmedzenia...',
      bookNow: 'Rezervovať',
      selectDateFirst: 'Najprv vyberte dátum',
      bookingSubmitted: 'Rezervácia bola odoslaná! Čoskoro vás budeme kontaktovať.',
      submitting: 'Odosielam...',
      submitError: 'Chyba pri odosielaní rezervácie. Skúste to znovu.'
    },
    en: {
      title: 'Book Your Stay',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone Number',
      guests: 'Number of Guests',
      selectGuests: 'Select number of guests',
      guest: 'Guest',
      guests2: 'Guests',
      guests3: 'Guests',
      specialRequests: 'Special Requests',
      specialRequestsPlaceholder: 'Any special requests or dietary requirements...',
      bookNow: 'Book Now',
      selectDateFirst: 'Select a date first',
      bookingSubmitted: 'Booking request submitted! We will contact you soon.',
      submitting: 'Submitting...',
      submitError: 'Error submitting booking. Please try again.'
    }
  };

  const t = translations[language];
  const locale = language === 'sk' ? sk : enUS;

  const getGuestLabel = (num: string) => {
    const n = parseInt(num);
    if (language === 'sk') {
      if (n === 1) return `1 ${t.guest}`;
      if (n >= 2 && n <= 4) return `${n} ${t.guests2}`;
      return `${n} ${t.guests3}`;
    }
    return n === 1 ? `1 ${t.guest}` : `${n} ${t.guests2}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) return;
    
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Generate a 6-digit verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      const bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'> = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        booking_date: format(selectedDate, 'yyyy-MM-dd'),
        guests: parseInt(formData.guests),
        special_requests: formData.specialRequests,
        status: 'pending',
        email_verified: false,
        verification_code: verificationCode
      };

      const booking = await createBooking(bookingData);
      
      // In a real app, you would send the verification email here
      console.log('Verification code for demo:', verificationCode);
      
      onBookingSubmitted(formData.email, booking.id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        bookingDate: format(selectedDate, 'MMMM dd, yyyy', { locale }),
        guests: parseInt(formData.guests)
      });
    } catch (error) {
      console.error('Booking error:', error);
      setSubmitError(t.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{t.title}</CardTitle>
        {selectedDate && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{format(selectedDate, 'MMMM dd, yyyy', { locale })}</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">{t.firstName}</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">{t.lastName}</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">{t.email}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">{t.phone}</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="guests">{t.guests}</Label>
            <Select value={formData.guests} onValueChange={(value) => handleInputChange('guests', value)}>
              <SelectTrigger>
                <SelectValue placeholder={t.selectGuests} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{getGuestLabel('1')}</SelectItem>
                <SelectItem value="2">{getGuestLabel('2')}</SelectItem>
                <SelectItem value="3">{getGuestLabel('3')}</SelectItem>
                <SelectItem value="4">{getGuestLabel('4')}</SelectItem>
                <SelectItem value="5">{getGuestLabel('5')}</SelectItem>
                <SelectItem value="6">{getGuestLabel('6')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="specialRequests">{t.specialRequests}</Label>
            <Textarea
              id="specialRequests"
              placeholder={t.specialRequestsPlaceholder}
              value={formData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              rows={3}
            />
          </div>

          {submitError && (
            <div className="text-red-600 text-sm text-center">
              {submitError}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={!selectedDate || isSubmitting}
          >
            {isSubmitting ? t.submitting : (selectedDate ? t.bookNow : t.selectDateFirst)}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}