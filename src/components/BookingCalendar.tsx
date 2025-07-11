import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { format } from 'date-fns';
import { sk, enUS } from 'date-fns/locale';

interface BookingCalendarProps {
  onDateSelect: (date: Date | undefined) => void;
  selectedDate: Date | undefined;
  language: 'sk' | 'en';
}

export default function BookingCalendar({ onDateSelect, selectedDate, language }: BookingCalendarProps) {
  // Mock data for unavailable dates
  const [unavailableDates] = useState<Date[]>([
    new Date(2024, 11, 15), // December 15, 2024
    new Date(2024, 11, 16), // December 16, 2024
    new Date(2024, 11, 25), // December 25, 2024
    new Date(2024, 11, 26), // December 26, 2024
    new Date(2025, 0, 1),   // January 1, 2025
  ]);

  const translations = {
    sk: {
      title: 'Vyberte si termín',
      available: 'Dostupné',
      unavailable: 'Nedostupné',
      selectedDate: 'Vybraný dátum',
      availableBadge: 'Dostupné'
    },
    en: {
      title: 'Select Your Stay',
      available: 'Available',
      unavailable: 'Unavailable',
      selectedDate: 'Selected Date',
      availableBadge: 'Available'
    }
  };

  const t = translations[language];
  const locale = language === 'sk' ? sk : enUS;

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(unavailableDate => 
      date.toDateString() === unavailableDate.toDateString()
    );
  };

  const isDateInPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const modifiers = {
    unavailable: unavailableDates,
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

  return (
    <Card className="w-full max-w-md">
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