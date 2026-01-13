/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { Clock, User, Phone, Scissors, LogOut } from 'lucide-react';
import { AdminStats } from './AdminStats';

// 1. Define the Prop Type
interface AdminDashboardProps {
  onLogout: () => void;
}

interface Booking {
  id: number;
  appointment_time: string;
  status: string;
  customer_name: string;
  customer_phone: string;
  services: {
    name: string;
    price: number;
  };
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchBookings() {
    // Fetch bookings AND the related service name (Join)
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        services ( name, price )
      `)
      .order('appointment_time', { ascending: true });

    if (error) console.error(error);
    else setBookings(data || []);
    
    setLoading(false);
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  async function deleteBooking(id: number) {
    if(!confirm("Cancel this appointment?")) return;
    
    await supabase.from('bookings').delete().eq('id', id);
    fetchBookings(); // Refresh the list
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      
      {/* 2. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-slate-800 pb-6">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Scissors className="text-blue-500" />
          Barber Dashboard
        </h2>
        
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 font-bold px-4 py-2 rounded-lg hover:bg-red-500/10 transition"
        >
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </div>

      {loading ? (
        <div className="text-center text-slate-500 py-12">Loading schedule...</div>
      ) : (
        <>
          {/* ✅ 3. VISUAL ANALYTICS (Revenue Chart) */}
          <AdminStats bookings={bookings} />

          {/* 4. Bookings List */}
          <div className="space-y-4">
            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-4">Upcoming Appointments</h3>
            
            {bookings.length === 0 && <p className="text-slate-400 text-center py-12">No upcoming appointments.</p>}
            
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-blue-500/30 transition">
                
                {/* Left: Time & Date */}
                <div className="flex items-center gap-4">
                  <div className="bg-slate-800 p-3 rounded-lg text-center min-w-[80px]">
                    <p className="text-xs text-slate-400 uppercase font-bold">
                      {format(new Date(booking.appointment_time), 'MMM')}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {format(new Date(booking.appointment_time), 'd')}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-blue-400 font-bold text-lg">
                      <Clock className="w-5 h-5" />
                      {format(new Date(booking.appointment_time), 'h:mm a')}
                    </div>
                    <p className="text-slate-300 font-medium mt-1">
                      {booking.services?.name} 
                      <span className="text-slate-500 text-sm ml-2">(${booking.services?.price})</span>
                    </p>
                  </div>
                </div>

                {/* Right: Customer Details */}
                <div className="flex flex-col md:items-end gap-1 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" /> {booking.customer_name}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> {booking.customer_phone}
                  </div>
                  
                  <button 
                    onClick={() => deleteBooking(booking.id)}
                    className="text-red-400 hover:text-red-300 text-xs font-bold mt-2 underline text-left md:text-right"
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}