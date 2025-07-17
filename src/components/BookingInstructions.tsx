import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, MapPin, Clock, Phone, Mail, Calendar, Users, MessageSquare, Key, ChevronLeft, ChevronRight, Lock, DoorOpen, Home, Shield } from 'lucide-react';
import { useState } from 'react';

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
  const [currentStep, setCurrentStep] = useState(0);
  
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
      accessCode: 'Prístupový kód',
      accessCodeTitle: 'Kód pre otvorenie úkrytu',
      accessCodeDescription: 'Tento kód použite na otvorenie elektronického zámku úkrytu. Kód je platný iba v deň vašej rezervácie.',
      accessCodeNote: 'Dôležité: Kód zdieľajte iba s osobami vo vašej rezervácii',
      entryGuide: 'Návod na vstup do úkrytu',
      entrySteps: [
        {
          title: 'Nájdite vstup do úkrytu',
          description: 'Úkryt sa nachádza 50 metrov od hlavnej budovy múzea. Hľadajte betónový vstup so železnými dverami.',
          image: '/api/placeholder/400/300'
        },
        {
          title: 'Zadajte prístupový kód',
          description: 'Na elektronickej klávesnici zadajte 6-miestny kód. Po zadaní stlačte #.',
          image: '/api/placeholder/400/300'
        },
        {
          title: 'Počkajte na odomknutie',
          description: 'Po správnom zadaní kódu sa ozve pípnutie a zelená LED bude svietiť. Dvere sa automaticky odomknú.',
          image: '/api/placeholder/400/300'
        },
        {
          title: 'Otvorte dvere',
          description: 'Silno potiahnite za kľučku. Dvere sú ťažké kvôli bezpečnostným požiadavkám.',
          image: '/api/placeholder/400/300'
        },
        {
          title: 'Vstúpte do úkrytu',
          description: 'Zapnite hlavný vypínač osvetlenia hneď po vstupe. Dvere za sebou zatvorte.',
          image: '/api/placeholder/400/300'
        }
      ],
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
          content: "Polomy, 962 63 Pliešovce, Slovensko | GPS: 48°27'23.4N 19°13'48.5E "
        },
        {
          icon: Clock,
          title: 'Check-in / Check-out',
          content: 'Príchod od: 15:00 | Odchod do: 11:00'
        },
        {
          icon: Phone,
          title: 'Kontakt',
          content: '+421902436871'
        },
        {
          icon: Mail,
          title: 'Email',
          content: 'muzeum.zajezova@gmail.com'
        }
      ],
      contactUs: 'Kontaktujte nás',
      contactText: 'Ak máte akékoľvek otázky alebo potrebujete zmeniť rezerváciu, neváhajte nás kontaktovať.',
      backToHome: 'Späť na hlavnú stránku',
      previous: 'Späť',
      next: 'Ďalej',
      stepOf: 'krok z'
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
      accessCode: 'Access Code',
      accessCodeTitle: 'Shelter Opening Code',
      accessCodeDescription: 'Use this code to open the electronic lock of the shelter. The code is valid only on your reservation date.',
      accessCodeNote: 'Important: Share this code only with people in your reservation',
      entryGuide: 'Shelter Entry Guide',
      entrySteps: [
        {
          title: 'Find the shelter entrance',
          description: 'The shelter is located 50 meters from the main museum building. Look for a concrete entrance with iron doors.',
          image: '/api/placeholder/400/300'
        },
        {
          title: 'Enter the access code',
          description: 'On the electronic keypad, enter the 6-digit code. After entering, press #.',
          image: '/api/placeholder/400/300'
        },
        {
          title: 'Wait for unlock',
          description: 'After correct code entry, you will hear a beep and green LED will light up. Doors will automatically unlock.',
          image: '/api/placeholder/400/300'
        },
        {
          title: 'Open the doors',
          description: 'Pull the handle firmly. The doors are heavy due to security requirements.',
          image: '/api/placeholder/400/300'
        },
        {
          title: 'Enter the shelter',
          description: 'Turn on the main light switch immediately after entering. Close the doors behind you.',
          image: '/api/placeholder/400/300'
        }
      ],
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
          content: "Polomy, 962 63 Pliešovce, Slovakia | GPS: 48°27'23.4N 19°13'48.5E "
        },
        {
          icon: Clock,
          title: 'Check-in / Check-out',
          content: 'Check-in from: 3:00 PM | Check-out: up to 11:00 AM'
        },
        {
          icon: Phone,
          title: 'Contact',
          content: '+421902436871'
        },
        {
          icon: Mail,
          title: 'Email',
          content: 'muzeum.zajezova@gmail.com'
        }
      ],
      contactUs: 'Contact Us',
      contactText: 'If you have any questions or need to modify your booking, please don\'t hesitate to contact us.',
      backToHome: 'Back to Home',
      previous: 'Previous',
      next: 'Next',
      stepOf: 'step of'
    }
  };

  const t = translations[language];

  // Generate a realistic access code based on booking details
  const generateAccessCode = () => {
    const dateNum = new Date(bookingDetails.bookingDate).getDate();
    const guestNum = bookingDetails.guests;
    const baseCode = `${dateNum.toString().padStart(2, '0')}${guestNum}${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`;
    return baseCode.substring(0, 6);
  };

  const accessCode = "4193";

  const getGuestLabel = (num: number) => {
    if (language === 'sk') {
      if (num === 1) return `1 ${t.guest}`;
      if (num >= 2 && num <= 4) return `${num} ${t.guests2}`;
      return `${num} ${t.guests3}`;
    }
    return num === 1 ? `1 ${t.guest}` : `${num} ${t.guests2}`;
  };

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % t.entrySteps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + t.entrySteps.length) % t.entrySteps.length);
  };

  return (
    <div className="w-screen min-h-screen bg-gray-50">
      <div className="w-screen py-12">
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

        {/* Access Code Card - Centered */}
        <div className="mb-8 flex justify-center">
          <Card className="w-full max-w-4xl shadow-xl border-0 bg-gradient-to-r from-red-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
                <Key className="w-7 h-7 text-red-600" />
                <span className="text-red-800">{t.accessCodeTitle}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-white rounded-lg p-8 shadow-inner mb-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Lock className="w-8 h-8 text-gray-600" />
                  <span className="text-4xl font-mono font-bold text-gray-900 tracking-widest">
                    {accessCode}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{t.accessCodeDescription}</p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <p className="text-yellow-800 font-semibold text-sm">
                    {t.accessCodeNote}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Entry Guide Carousel - Centered */}
        <div className="mb-8 flex justify-center">
          <Card className="w-full max-w-4xl shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2 text-xl">
                <Shield className="w-6 h-6 text-blue-600" />
                <span>{t.entryGuide}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="bg-gray-100 rounded-lg p-6 min-h-[400px]">
                  <div className="text-center mb-4">
                    <span className="text-sm text-gray-500">
                      {currentStep + 1} {t.stepOf} {t.entrySteps.length}
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-4">
                    {/* Image placeholder */}
                    <div className="w-full max-w-md h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <DoorOpen className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Step {currentStep + 1} Image</p>
                      </div>
                    </div>
                    
                    {/* Step content */}
                    <div className="text-center max-w-lg">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {t.entrySteps[currentStep].title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {t.entrySteps[currentStep].description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Navigation buttons */}
                <div className="flex justify-between items-center mt-6">
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{t.previous}</span>
                  </Button>
                  
                  <div className="flex space-x-2">
                    {t.entrySteps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentStep(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <Button
                    onClick={nextStep}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <span>{t.next}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Details and Next Steps - Centered Grid */}
        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
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
        </div>

        {/* Important Information - Centered */}
        <div className="mb-8 flex justify-center">
          <Card className="w-full max-w-6xl shadow-lg border-0 bg-white/95 backdrop-blur-sm">
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
        </div>

        {/* Contact Section - Centered */}
        <div className="flex justify-center">
          <Card className="w-full max-w-4xl shadow-lg border-0 bg-gradient-to-r from-blue-50 to-green-50">
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
    </div>
  );
}