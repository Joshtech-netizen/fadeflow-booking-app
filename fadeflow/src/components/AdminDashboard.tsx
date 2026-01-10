import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { Clock, User, Phone, Scissors } from 'lucide-react';

export function AdminDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchBookings() {
    // 🔥 SUPABASE JOIN: Fetch booking AND the related service name
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        services ( name, price )
      `)
      .order('appointment_time', { ascending: true }); // Show earliest first

    if (error) console.error(error);
    else setBookings(data || []);
    
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBookings();
  }, []);

  async function deleteBooking(id: number) {
    if(!confirm("Cancel this appointment?")) return;
    
    await supabase.from('bookings').delete().eq('id', id);
    fetchBookings(); // Refresh the list
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Scissors className="text-blue-500" />
        Barber Dashboard
      </h2>

      {loading ? (
        <p>Loading schedule...</p>
      ) : (
        <div className="space-y-4">
          {bookings.length === 0 && <p className="text-slate-400">No upcoming appointments.</p>}
          
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
                  className="text-red-400 hover:text-red-300 text-xs font-bold mt-2 underline"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}