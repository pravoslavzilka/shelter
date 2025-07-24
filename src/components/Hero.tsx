


interface HeaderProps {
  language: 'sk' | 'en';
  onLanguageChange: (lang: 'sk' | 'en') => void;
}


export default function Hero( { language }: HeaderProps) {

  const translations = {
    sk: {
      title: 'Historická útulňa',
      subtitle: ' na Rudnej magistrále',
      description: 'Objav'
    },
    en: {
      title: 'Mountain Shelter',
      subtitle: ' on Ore main trail',
      description: 'Explore'
    }
  };

  const t = translations[language];


  return (
    <section className="relative h-96 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: 'url(public/images/IMG_6879.png)'
    }}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 h-full flex items-center justify-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {t.title}
            <br />
            <span className="text-3xl md:text-5xl font-light italic">{t.subtitle}</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {t.description}
          </p>
        </div>
      </div>
    </section>
  );
}