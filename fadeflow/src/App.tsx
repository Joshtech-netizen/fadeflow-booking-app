import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { Navbar } from './components/Navbar';
import { Clock, DollarSign } from 'lucide-react';
import { BookingModal } from './components/BookingModal';

interface Service {
  id: number;
  name: string;
  duration_minutes: number;
  price: number;
}

function App() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('price', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500 selection:text-white relative">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* HERO */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Masterful Cuts, <span className="text-blue-500">Effortless Booking.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Select a service below to secure your spot. No phone calls, no waiting.
          </p>
        </div>

        {/* SERVICES GRID */}
        {loading ? (
          <div className="text-center text-slate-500 animate-pulse">Loading menu...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div 
                key={service.id} 
                onClick={() => setSelectedService(service)} 
                className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition duration-300 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">
                    {service.name}
                  </h3>
                  <div className="bg-slate-800 p-2 rounded-lg group-hover:bg-blue-500/20 transition">
                    <DollarSign className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                
                <div className="flex justify-between items-end border-t border-slate-800 pt-4 mt-4">
                  <div className="flex items-center text-slate-400 text-sm gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration_minutes} mins</span>
                  </div>
                  <span className="text-2xl font-bold text-white">
                    ${service.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* MODAL (Only shows if a service is selected) */}
      {selectedService && (
        <BookingModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </div>
  );
}

export default App;