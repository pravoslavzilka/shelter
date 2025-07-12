import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BookingCalendar from './components/BookingCalendar';
import BookingForm from './components/BookingForm';
import ShelterInfo from './components/ShelterInfo';
import EmailConfirmation from './components/EmailConfirmation';
import BookingInstructions from './components/BookingInstructions';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [language, setLanguage] = useState<'sk' | 'en'>('sk');
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const translations = {
    sk: {
      bookingTitle: 'Rezervujte si horský únik',
      bookingDescription: 'Vyberte si preferované dátumy a dokončite rezerváciu.',
      whyChooseTitle: 'Prečo si vybrať náš prístrešok?',
      whyChooseDescription: 'Objavte všetko vybavenie a funkcie, ktoré robia z nášho horského prístrešku perfektnú voľbu pre vaše dobrodružstvo v prírode.',
      footerTitle: 'Horský prístrešok',
      footerDescription: 'Vaša brána k horským dobrodružstvám a pokojným únikoch.',
      contact: 'Kontakt',
      location: 'Poloha'
    },
    en: {
      bookingTitle: 'Book Your Mountain Retreat',
      bookingDescription: 'Select your preferred dates and complete your booking to secure your perfect mountain getaway.',
      whyChooseTitle: 'Why Choose Our Shelter?',
      whyChooseDescription: 'Discover all the amenities and features that make our mountain shelter the perfect choice for your outdoor adventure.',
      footerTitle: 'Mountain Shelter',
      footerDescription: 'Your gateway to mountain adventures and peaceful retreats.',
      contact: 'Contact',
      location: 'Location'
    }
  };

  const t = translations[language];

  const handleBookingSubmitted = (email: string, id: string, details?: any) => {
    if (details) {
      setBookingDetails(details);
    }
    setBookingEmail(email);
    setBookingId(id);
    setShowInstructions(true);
  };

  const handleEmailVerified = () => {
    setShowEmailConfirmation(false);
    setShowInstructions(true);
  };

  const handleBackToBooking = () => {
    setShowEmailConfirmation(false);
    setShowInstructions(false);
    setSelectedDate(undefined);
    setBookingEmail('');
    setBookingId('');
    setBookingDetails(null);
  };

  if (showEmailConfirmation) {
    return (
      <EmailConfirmation
        email={bookingEmail}
        bookingId={bookingId}
        language={language}
        onBack={handleBackToBooking}
        onVerified={handleEmailVerified}
      />
    );
  }

  if (showInstructions && bookingDetails) {
    return (
      <BookingInstructions
        language={language}
        bookingDetails={bookingDetails}
        onBackToHome={handleBackToBooking}
      />
    );
  }

  return (
    <div className="w-screen min-h-screen bg-gray-50">
      <Header language={language} onLanguageChange={setLanguage} />
      <Hero language={language} onLanguageChange={setLanguage} />
      
      <main className="w-screen py-12">
        {/* Booking Section */}
        <section className="mb-16 flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t.bookingTitle}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t.bookingDescription}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BookingCalendar 
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                language={language}
              />
              <BookingForm 
                selectedDate={selectedDate} 
                language={language}
                onBookingSubmitted={handleBookingSubmitted}
              />
            </div>
          </div>
        </section>

        {/* Shelter Information */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.whyChooseTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.whyChooseDescription}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <ShelterInfo language={language} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div> 
              <h3 className="text-lg font-semibold mb-4">{t.footerTitle}</h3>
              <p className="text-gray-400">
                {t.footerDescription}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.contact}</h4>
              <p className="text-gray-400">
                {language === 'sk' ? 'Telefón' : 'Phone'}: +421902436871<br />
                Email: muzeum.zajezova@gmail.com
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.location}</h4>
              <p className="text-gray-400">
                Polomy, 962 63 <br />
                Pliešovce, Slovakia
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 {t.footerTitle}. {language === 'sk' ? 'Všetky práva vyhradené' : 'All rights reserved'}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;