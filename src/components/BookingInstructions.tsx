import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, MapPin, Clock, Phone, Mail, Calendar, Users, MessageSquare } from 'lucide-react';

interface BookingInstructionsProps {
  language: 'sk' | 'en';
  bookingDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bookingDate: string;
    guests: number;
  };
  onBackToHome: () => void;
}

export default function BookingInstructions({ language, bookingDetails, onBackToHome }: BookingInstructionsProps) {
  const translations = {
    sk: {
      title: 'Rezervácia potvrdená!',
      subtitle: 'Ďakujeme za vašu rezerváciu. Tu sú dôležité informácie pre váš pobyt.',
      bookingDetails: 'Detaily rezervácie',
      name: 'Meno',
      email: 'Email',
      phone: 'Telefón',
      date: 'Dátum',
      guests: 'Počet hostí',
      guest: 'hosť',
      guests2: 'hostia',
      guests3: 'hostí',
      nextSteps: 'Ďalšie kroky',
      steps: [
        'Dostanete potvrdzovací email s podrobnosťami rezervácie',
        'Naša recepcia vás bude kontaktovať 24 hodín pred príchodom',
        'Pripravte si platný doklad totožnosti pre check-in',
        'Príchod je možný od 15:00, odchod do 11:00'
      ],
      importantInfo: 'Dôležité informácie',
      info: [
        {
          icon: MapPin,
          title: 'Adresa',
          content: 'Mountain Ridge Trail, Alpine Valley, CO 80424'
        },
        {
          icon: Clock,
          title: 'Check-in / Check-out',
          content: 'Príchod: 15:00 | Odchod: 11:00'
        },
        {
          icon: Phone,
          title: 'Kontakt',
          content: '(555) 123-4567'
        },
        {
          icon: Mail,
          title: 'Email',
          content: 'info@mountainshelter.com'
        }
      ],
      contactUs: 'Kontaktujte nás',
      contactText: 'Ak máte akékoľvek otázky alebo potrebujete zmeniť rezerváciu, neváhajte nás kontaktovať.',
      backToHome: 'Späť na hlavnú stránku',
      bookingConfirmation: 'Potvrdenie rezervácie'
    },
    en: {
      title: 'Booking Confirmed!',
      subtitle: 'Thank you for your booking. Here are the important details for your stay.',
      bookingDetails: 'Booking Details',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      date: 'Date',
      guests: 'Guests',
      guest: 'Guest',
      guests2: 'Guests',
      guests3: 'Guests',
      nextSteps: 'Next Steps',
      steps: [
        'You will receive a confirmation email with booking details',
        'Our reception will contact you 24 hours before arrival',
        'Prepare a valid ID for check-in',
        'Check-in from 3:00 PM, check-out by 11:00 AM'
      ],
      importantInfo: 'Important Information',
      info: [
        {
          icon: MapPin,
          title: 'Address',
          content: 'Mountain Ridge Trail, Alpine Valley, CO 80424'
        },
        {
          icon: Clock,
          title: 'Check-in / Check-out',
          content: 'Check-in: 3:00 PM | Check-out: 11:00 AM'
        },
        {
          icon: Phone,
          title: 'Contact',
          content: '(555) 123-4567'
        },
        {
          icon: Mail,
          title: 'Email',
          content: 'info@mountainshelter.com'
        }
      ],
      contactUs: 'Contact Us',
      contactText: 'If you have any questions or need to modify your booking, please don\'t hesitate to contact us.',
      backToHome: 'Back to Home',
      bookingConfirmation: 'Booking Confirmation'
    }
  };

  const t = translations[language];

  const getGuestLabel = (num: number) => {
    if (language === 'sk') {
      if (num === 1) return `1 ${t.guest}`;
      if (num >= 2 && num <= 4) return `${num} ${t.guests2}`;
      return `${num} ${t.guests3}`;
    }
    return num === 1 ? `1 ${t.guest}` : `${num} ${t.guests2}`;
  };

  return (
    <div className="w-full bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="w-full">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Details */}
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl">
                <Calendar className="w-5 h-5 text-green-600" />
                <span>{t.bookingDetails}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">{t.name}</p>
                    <p className="font-semibold">{bookingDetails.firstName} {bookingDetails.lastName}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">{t.email}</p>
                    <p className="font-semibold">{bookingDetails.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">{t.phone}</p>
                    <p className="font-semibold">{bookingDetails.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">{t.date}</p>
                    <p className="font-semibold">{bookingDetails.bookingDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">{t.guests}</p>
                    <p className="font-semibold">{getGuestLabel(bookingDetails.guests)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>{t.nextSteps}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {t.steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Information */}
        <Card className="mt-8 shadow-lg border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-xl">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span>{t.importantInfo}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.info.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <IconComponent className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-700 text-sm">{item.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="mt-8 shadow-lg border-0 bg-gradient-to-r from-blue-50 to-green-50">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.contactUs}</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              {t.contactText}
            </p>
            <Button
              onClick={onBackToHome}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-200"
            >
              {t.backToHome}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}