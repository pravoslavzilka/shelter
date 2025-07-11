import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, Car, Utensils, Bed, Mountain, Users } from 'lucide-react';

interface ShelterInfoProps {
  language: 'sk' | 'en';
}

export default function ShelterInfo({ language }: ShelterInfoProps) {
  const translations = {
    sk: {
      title: 'Zážitok v horskom prístrešku',
      description: 'Uniknite do nášho krásne zariadeného horského prístrešku, perfektne situovaného tak, aby ponúkal úchvatné výhľady a ľahký prístup k turistickým chodníkom. Či už hľadáte dobrodružstvo alebo pokoj, náš prístrešok poskytuje perfektnú základňu pre váš horský únik.',
      amenitiesTitle: 'Vybavenie a služby',
      amenities: [
        { label: 'Pohodlné postele', description: 'Komfortné ubytovanie na spanie' },
        { label: 'Kuchyňa', description: 'Plne vybavená kuchyňa' },
        { label: 'WiFi', description: 'Vysokorýchlostný internet' },
        { label: 'Parkovanie', description: 'Bezplatné parkovanie k dispozícii' },
        { label: 'Výhľady na hory', description: 'Úchvatné panoramatické výhľady' },
        { label: 'Až 6 hostí', description: 'Ideálne pre skupiny' },
      ],
      tags: ['Výhľady na hory', 'Turistické chodníky', 'Pozorovanie divočiny', 'Pozorovanie hviezd']
    },
    en: {
      title: 'Mountain Shelter Experience',
      description: 'Escape to our beautifully appointed mountain shelter, perfectly situated to offer breathtaking views and easy access to hiking trails. Whether you\'re seeking adventure or tranquility, our shelter provides the perfect base for your mountain getaway.',
      amenitiesTitle: 'Amenities & Features',
      amenities: [
        { label: 'Cozy Beds', description: 'Comfortable sleeping arrangements' },
        { label: 'Kitchen', description: 'Fully equipped kitchen' },
        { label: 'WiFi', description: 'High-speed internet' },
        { label: 'Parking', description: 'Free parking available' },
        { label: 'Mountain Views', description: 'Stunning panoramic views' },
        { label: 'Up to 6 Guests', description: 'Perfect for groups' },
      ],
      tags: ['Mountain Views', 'Hiking Trails', 'Wildlife Viewing', 'Stargazing']
    }
  };

  const t = translations[language];

  const amenityIcons = [Bed, Utensils, Wifi, Car, Mountain, Users];

  return (
    <div className="space-y-6">
      {/* Shelter Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mountain className="h-5 w-5 text-green-600" />
            <span>{t.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            {t.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {t.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>{t.amenitiesTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.amenities.map((amenity, index) => {
              const IconComponent = amenityIcons[index];
              return (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                  <IconComponent className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">{amenity.label}</h4>
                    <p className="text-sm text-gray-600">{amenity.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}