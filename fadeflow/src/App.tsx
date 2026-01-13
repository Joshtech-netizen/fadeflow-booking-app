import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Login } from './components/Login';
import { Barbers } from './components/Barbers'; 
import { Reviews } from './components/Reviews'; 
import { Clock, DollarSign, LayoutDashboard } from 'lucide-react';
import { Toaster } from 'react-hot-toast'; 

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
  
  // 🔐 Authentication States
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500 selection:text-white relative flex flex-col">
      <Toaster position="top-center" />
      
      {/* Navbar is sticky and always visible */}
      <Navbar />

      {/* 🕵️ ADMIN LOGIN BUTTON (Only visible if NOT logged in) */}
      {!isAdmin && (
        <div className="fixed bottom-6 right-6 z-50">
          <button 
            onClick={() => setShowLogin(true)}
            className="bg-slate-800 hover:bg-blue-600 text-white p-4 rounded-full shadow-2xl transition border border-slate-700 group"
            title="Barber Login"
          >
            <LayoutDashboard className="w-6 h-6 group-hover:scale-110 transition" />
          </button>
        </div>
      )}

      {/* 🔀 MAIN CONTENT SWITCHER */}
      {isAdmin ? (
        /* 🛡️ ADMIN VIEW */
        <div className="flex-grow">
          <AdminDashboard onLogout={() => setIsAdmin(false)} />
        </div>
      ) : (
        /* 👤 CUSTOMER VIEW */
        <div className="flex-grow flex flex-col">
          <main className="flex-grow"> 
            
            {/* HERO SECTION */}
            <div className="max-w-6xl mx-auto px-6 py-12 text-center mb-16 space-y-4 pt-20">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                Masterful Cuts, <span className="text-blue-500">Effortless Booking.</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Select a service below to secure your spot. No phone calls, no waiting.
              </p>
            </div>

            {/* SERVICES GRID (ID added for scroll navigation) */}
            <div id="services" className="max-w-6xl mx-auto px-6 mb-24">
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
            </div>

            {/* ✅ NEW: BARBERS & REVIEWS SECTIONS */}
            <Barbers />
            <Reviews />

          </main>

          {/* ✅ FOOTER */}
          <Footer />
        </div>
      )}

      {/* 📅 BOOKING MODAL (For Customers) */}
      {selectedService && (
        <BookingModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}

      {/* 🔐 LOGIN MODAL (For Barber) */}
      {showLogin && (
        <Login 
          onLoginSuccess={() => {
            setIsAdmin(true);   // Unlock Admin Dashboard
            setShowLogin(false); // Close Login Modal
          }} 
        />
      )}
    </div>
  );
}

export default App;