import { Button } from '@/components/ui/button';
import { Mountain, Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  language: 'sk' | 'en';
  onLanguageChange: (lang: 'sk' | 'en') => void;
}

export default function Header({ language, onLanguageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const translations = {
    sk: {
      title: 'Útutlňa poľa strhárov',
      explore: 'PRESKÚMAŤ',
      amenities: 'VYBAVENIE',
      about: 'O NÁS',
      contact: 'KONTAKT',
      login: 'PRIHLÁSENIE/'
    },
    en: {
      title: 'Shelter of Strhársky manor',
      explore: 'EXPLORE',
      amenities: 'AMENITIES',
      about: 'ABOUT US',
      contact: 'CONTACT',
      login: 'LOGIN'
    }
  };

  const t = translations[language];

  return (
    <header className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Mountain className="h-8 w-8 text-green-700" />
            <span className="text-xl font-bold text-gray-900">{t.title}</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/*<a href="#explore" className="text-gray-700 hover:text-green-700 transition-colors">
              {t.explore}
            </a>
            <a href="#amenities" className="text-gray-700 hover:text-green-700 transition-colors">
              {t.amenities}
            </a>
            <a href="#about" className="text-gray-700 hover:text-green-700 transition-colors">
              {t.about}
            </a>
            <a href="#contact" className="text-gray-700 hover:text-green-700 transition-colors">
              {t.contact}
            </a>
            <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white">
              {t.login}
            </Button>*/}
            
            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-600" />
              <button
                onClick={() => onLanguageChange('sk')}
                className={`text-sm font-medium ${language === 'sk' ? 'text-green-700' : 'text-gray-600 hover:text-green-700'} transition-colors`}
              >
                SK
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={() => onLanguageChange('en')}
                className={`text-sm font-medium ${language === 'en' ? 'text-green-700' : 'text-gray-600 hover:text-green-700'} transition-colors`}
              >
                EN
              </button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#explore" className="text-gray-700 hover:text-green-700 transition-colors">
                {t.explore}
              </a>
              <a href="#amenities" className="text-gray-700 hover:text-green-700 transition-colors">
                {t.amenities}
              </a>
              <a href="#about" className="text-gray-700 hover:text-green-700 transition-colors">
                {t.about}
              </a>
              <a href="#contact" className="text-gray-700 hover:text-green-700 transition-colors">
                {t.contact}
              </a>
              <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white w-fit">
                {t.login}
              </Button>
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-gray-600" />
                <button
                  onClick={() => onLanguageChange('sk')}
                  className={`text-sm font-medium ${language === 'sk' ? 'text-green-700' : 'text-gray-600 hover:text-green-700'} transition-colors`}
                >
                  SK
                </button>
                <span className="text-gray-400">|</span>
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`text-sm font-medium ${language === 'en' ? 'text-green-700' : 'text-gray-600 hover:text-green-700'} transition-colors`}
                >
                  EN
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}