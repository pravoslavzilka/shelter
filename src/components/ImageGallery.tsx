import { Card } from '@/components/ui/card';

export default function ImageGallery() {
  const images = [
    {
      src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Mountain shelter exterior with stunning valley views',
      title: 'Shelter Exterior'
    },
    {
      src: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Cozy interior with fireplace and mountain views',
      title: 'Cozy Interior'
    },
    {
      src: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Mountain hiking trails near the shelter',
      title: 'Hiking Trails'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900">
        Experience the Beauty
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <Card key={index} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
            <div className="relative h-64 overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-semibold">{image.title}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}