import { X, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useState } from 'react';
import { format, addDays, startOfToday } from 'date-fns';

interface Service {
  id: number;
  name: string;
  duration_minutes: number;
  price: number;
}

interface BookingModalProps {
  service: Service;
  onClose: () => void;
}

export function BookingModal({ service, onClose }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate next 5 days for date selection
  const nextDates = Array.from({ length: 5 }).map((_, i) => addDays(startOfToday(), i));

  // Sample time slots (in a real app, these would be fetched based on availability)
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", 
    "13:00", "13:30", "14:00", "14:30", "15:00"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <div>
            <h2 className="text-xl font-bold text-white">Book Appointment</h2>
            <p className="text-blue-400 text-sm font-medium">{service.name} • {service.duration_minutes} mins</p>
          </div>
          <button aria-label="Close" onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-8">
          
          {/* 1. Date Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" /> Select Date
            </h3>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {nextDates.map((date) => {
                const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                return (
                  <button
                    key={date.toString()}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedTime(null); // Reset time when date changes
                    }}
                    className={`flex-shrink-0 w-16 h-20 rounded-xl flex flex-col items-center justify-center border transition ${
                      isSelected 
                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20' 
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600 hover:bg-slate-750'
                    }`}
                  >
                    <span className="text-xs font-medium uppercase">{format(date, 'EEE')}</span>
                    <span className="text-xl font-bold">{format(date, 'd')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Time Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4" /> Available Slots
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-3 rounded-lg text-sm font-bold border transition ${
                    selectedTime === time
                      ? 'bg-green-600 border-green-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* 3. User Details Input */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
             <input 
               type="text" 
               placeholder="Your Name" 
               className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
             />
             <input 
               type="tel" 
               placeholder="Phone Number" 
               className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
             />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-950">
          <button 
            disabled={!selectedTime}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition shadow-lg shadow-blue-900/20"
          >
            {selectedTime ? `Confirm Booking for ${selectedTime}` : 'Select a Time'}
          </button>
        </div>

      </div>
    </div>
  );
}