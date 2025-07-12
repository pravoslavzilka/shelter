import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { format, addMonths, startOfMonth, endOfMonth } from 'date-fns';
import { sk, enUS } from 'date-fns/locale';
import { getAvailability, type Availability } from '@/lib/supabase';

interface BookingCalendarProps {
  onDateSelect: (date: Date | undefined) => void;
  selectedDate: Date | undefined;
  language: 'sk' | 'en';
}

export default function BookingCalendar({ onDateSelect, selectedDate, language }: BookingCalendarProps) {
  const [availability, setAvailability] = useState<Map<string, Availability>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const translations = {
    sk: {
      title: 'Vyberte si termín',
      available: 'Dostupné',
      unavailable: 'Nedostupné',
      selectedDate: 'Vybraný dátum',
      availableBadge: 'Dostupné',
      loading: 'Načítavam dostupnosť...',
      error: 'Chyba pri načítavaní dostupnosti'
    },
    en: {
      title: 'Select Your Stay',
      available: 'Available',
      unavailable: 'Unavailable',
      selectedDate: 'Selected Date',
      availableBadge: 'Available',
      loading: 'Loading availability...',
      error: 'Error loading availability'
    }
  };

  const t = translations[language];
  const locale = language === 'sk' ? sk : enUS;

  // Load availability data for the current month and next month
  const loadAvailability = async (month: Date) => {
    try {
      setLoading(true);
      setError(null);
      
      // Get date range for current month and next month
      const startDate = startOfMonth(month);
      const endDate = endOfMonth(addMonths(month, 1));
      
      const availabilityData = await getAvailability(
        format(startDate, 'yyyy-MM-dd'),
        format(endDate, 'yyyy-MM-dd')
      );
      
      // Convert to Map for efficient lookup
      const availabilityMap = new Map<string, Availability>();
      availabilityData.forEach(item => {
        availabilityMap.set(item.date, item);
      });
      
      setAvailability(availabilityMap);
    } catch (err) {
      console.error('Error loading availability:', err);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  // Load availability on component mount and when month changes
  useEffect(() => {
    loadAvailability(currentMonth);
  }, [currentMonth]);

  // Handle month navigation
  const handleMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth);
  };

  const isDateUnavailable = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dateAvailability = availability.get(dateStr);
    
    // If no availability data, assume available
    if (!dateAvailability) return false;
    
    // Date is unavailable if explicitly marked as unavailable or fully booked
    return !dateAvailability.is_available;
  };

  const isDateInPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const getUnavailableDates = () => {
    const unavailableDates: Date[] = [];
    availability.forEach((avail, dateStr) => {
      if (!avail.is_available) {
        unavailableDates.push(new Date(dateStr));
      }
    });
    return unavailableDates;
  };

  const modifiers = {
    unavailable: getUnavailableDates(),
    past: (date: Date) => isDateInPast(date),
  };

  const modifiersStyles = {
    unavailable: {
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      textDecoration: 'line-through',
    },
    past: {
      color: '#9ca3af',
      backgroundColor: '#f9fafb',
    },
  };

  const getAvailabilityInfo = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dateAvailability = availability.get(dateStr);
    
    if (!dateAvailability) {
      return { available: true, spotsLeft: 6 };
    }
    
    return {
      available: dateAvailability.is_available,
      spotsLeft: dateAvailability.max_guests - dateAvailability.current_bookings
    };
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">{t.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
              <p className="text-gray-600">{t.loading}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">{t.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button 
              onClick={() => loadAvailability(currentMonth)}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {language === 'sk' ? 'Skúsiť znovu' : 'Try Again'}
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">{t.title}</CardTitle>
        <div className="flex justify-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span className="text-gray-600">{t.available}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
            <span className="text-gray-600">{t.unavailable}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          disabled={(date) => isDateUnavailable(date) || isDateInPast(date)}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          locale={locale}
          month={currentMonth}
          onMonthChange={handleMonthChange}
          className="rounded-md border shadow-sm"
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium",
            nav: "space-x-1 flex items-center",
            nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
            row: "flex w-full mt-2",
            cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground text-foreground font-medium",
            day_range_end: "day-range-end",
            day_selected: "bg-green-600 text-white hover:bg-green-600 hover:text-white focus:bg-green-600 focus:text-white",
            day_today: "bg-accent text-accent-foreground font-bold",
            day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
        />
        
        {selectedDate && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">{t.selectedDate}</p>
                <p className="text-lg font-semibold text-green-900">
                  {format(selectedDate, 'MMMM dd, yyyy', { locale })}
                </p>
                {(() => {
                  const availInfo = getAvailabilityInfo(selectedDate);
                  return availInfo.available && (
                    <p className="text-sm text-green-700">
                      {language === 'sk' 
                        ? `${availInfo.spotsLeft} voľných miest` 
                        : `${availInfo.spotsLeft} spots available`}
                    </p>
                  );
                })()}
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {t.availableBadge}
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}