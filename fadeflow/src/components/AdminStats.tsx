import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { format, parseISO } from 'date-fns';

interface Booking {
  id: number;
  appointment_time: string;
  status: string;
  services: {
    price: number;
  };
}

interface AdminStatsProps {
  bookings: Booking[];
}

interface ChartDataItem {
  date: string;
  revenue: number;
}

export function AdminStats({ bookings }: AdminStatsProps) {
  // 1. Calculate Total Revenue & Appointments
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.services?.price || 0), 0);
  const totalAppointments = bookings.length;

  // 2. Prepare Chart Data (Group by Day)
  const chartData = bookings.reduce((acc: ChartDataItem[], booking) => {
    const date = format(parseISO(booking.appointment_time), 'MMM d');
    const price = booking.services?.price || 0;
    
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.revenue += price;
    } else {
      acc.push({ date, revenue: price });
    }
    return acc;
  }, []);

  // Sort chart by date (simple sort, might need better logic for crossing months)
  chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      
      {/* Stat Card 1: Revenue */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <h3 className="text-slate-400 text-sm font-bold uppercase mb-2">Total Revenue</h3>
        <p className="text-3xl font-extrabold text-white">${totalRevenue.toFixed(2)}</p>
      </div>

      {/* Stat Card 2: Appointments */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <h3 className="text-slate-400 text-sm font-bold uppercase mb-2">Total Bookings</h3>
        <p className="text-3xl font-extrabold text-white">{totalAppointments}</p>
      </div>

      {/* Chart: Revenue Trend */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl lg:col-span-3">
        <h3 className="text-slate-400 text-sm font-bold uppercase mb-6">Revenue Overview</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', color: '#fff' }}
                cursor={{ fill: '#1e293b' }}
              />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}