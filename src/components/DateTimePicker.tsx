import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface DateTimePickerProps {
  value: string; // ISO string e.g. YYYY-MM-DDTHH:mm
  onChange: (value: string) => void;
}

export default function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  // Initialize date from value or use current date
  const initialDate = value ? new Date(value) : new Date();
  
  const [currentMonth, setCurrentMonth] = useState(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState(initialDate.getDate());
  
  // Format hours and minutes for padded display
  const [hour, setHour] = useState(initialDate.getHours().toString().padStart(2, '0'));
  const [minute, setMinute] = useState(initialDate.getMinutes().toString().padStart(2, '0'));

  // Sync state to parent value when any part changes
  useEffect(() => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDay, parseInt(hour), parseInt(minute));
    // Check if valid date
    if (!isNaN(newDate.getTime())) {
      // Format to YYYY-MM-DDTHH:mm
      const yyyy = newDate.getFullYear();
      const mm = (newDate.getMonth() + 1).toString().padStart(2, '0');
      const dd = newDate.getDate().toString().padStart(2, '0');
      const formatted = `${yyyy}-${mm}-${dd}T${hour}:${minute}`;
      if (formatted !== value) {
        onChange(formatted);
      }
    }
  }, [currentMonth, selectedDay, hour, minute]);

  // Update internal state if value changes externally (e.g. from preset buttons)
  useEffect(() => {
    if (value) {
      const vDate = new Date(value);
      if (!isNaN(vDate.getTime())) {
        if (vDate.getMonth() !== currentMonth.getMonth() || vDate.getFullYear() !== currentMonth.getFullYear()) {
          setCurrentMonth(new Date(vDate.getFullYear(), vDate.getMonth(), 1));
        }
        setSelectedDay(vDate.getDate());
        setHour(vDate.getHours().toString().padStart(2, '0'));
        setMinute(vDate.getMinutes().toString().padStart(2, '0'));
      }
    }
  }, [value]);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  return (
    <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row">
      {/* Calendar Section */}
      <div className="p-4 flex-1 border-b md:border-b-0 md:border-r border-outline-variant/50">
        <div className="flex items-center justify-between mb-4">
          <button type="button" onClick={prevMonth} className="p-1 hover:bg-surface-variant rounded-lg transition-colors text-on-surface-variant"><ChevronLeft size={20} /></button>
          <div className="font-bold text-on-surface">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </div>
          <button type="button" onClick={nextMonth} className="p-1 hover:bg-surface-variant rounded-lg transition-colors text-on-surface-variant"><ChevronRight size={20} /></button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-[10px] font-bold text-on-surface-variant uppercase">{day}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="h-8"></div>
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const isSelected = selectedDay === dayNum && 
                               currentMonth.getMonth() === (value ? new Date(value).getMonth() : initialDate.getMonth()) && 
                               currentMonth.getFullYear() === (value ? new Date(value).getFullYear() : initialDate.getFullYear());
            const isToday = new Date().getDate() === dayNum && 
                            new Date().getMonth() === currentMonth.getMonth() && 
                            new Date().getFullYear() === currentMonth.getFullYear();
                            
            return (
              <button
                key={dayNum}
                type="button"
                onClick={() => setSelectedDay(dayNum)}
                className={`h-8 w-full rounded-md text-sm transition-all font-medium ${
                  isSelected 
                    ? 'bg-primary text-on-primary shadow-md shadow-primary/20' 
                    : isToday 
                      ? 'bg-primary/10 text-primary hover:bg-primary/20' 
                      : 'hover:bg-surface-variant text-on-surface'
                }`}
              >
                {dayNum}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Time Section */}
      <div className="p-4 w-full md:w-48 bg-surface-variant/10 flex flex-col justify-center">
        <div className="flex items-center justify-center gap-2 text-on-surface-variant mb-4 font-bold text-sm">
          <Clock size={16} />
          Waktu (WIB)
        </div>
        
        <div className="flex items-center justify-center gap-2">
          <div className="flex flex-col gap-1 items-center">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">Jam</span>
            <select 
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="bg-surface border border-outline-variant rounded-lg p-2 text-lg font-bold text-center appearance-none focus:ring-2 focus:ring-primary focus:outline-none"
              style={{ paddingRight: '1rem' }}
            >
              {Array.from({ length: 24 }).map((_, i) => (
                <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>
              ))}
            </select>
          </div>
          <span className="text-xl font-bold text-on-surface-variant mt-4">:</span>
          <div className="flex flex-col gap-1 items-center">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">Menit</span>
            <select 
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="bg-surface border border-outline-variant rounded-lg p-2 text-lg font-bold text-center appearance-none focus:ring-2 focus:ring-primary focus:outline-none"
              style={{ paddingRight: '1rem' }}
            >
              {Array.from({ length: 60 }).map((_, i) => (
                <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs font-medium text-primary bg-primary/10 py-2 px-3 rounded-lg">
          {new Date(value || new Date().toISOString()).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          <br/>
          {hour}:{minute} WIB
        </div>
      </div>
    </div>
  );
}
