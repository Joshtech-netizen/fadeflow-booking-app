import { Scissors, Instagram, Facebook, MapPin, Phone, Mail, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                FadeFlow
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Experience the art of grooming. Premium cuts, hot towel shaves, and a relaxing atmosphere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-500 transition">Services</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Our Barbers</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Book Appointment</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Admin Login</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span> Abossey Okai, Accra</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>(+233) 242 315 695</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>hello@fadeflow.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-bold mb-4">Hours</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span className="text-white font-medium">9:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white font-medium">10:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-slate-600">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} FadeFlow. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            <a href="#" className="bg-slate-900 p-2 rounded-full text-slate-400 hover:text-white hover:bg-blue-600 transition">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="bg-slate-900 p-2 rounded-full text-slate-400 hover:text-white hover:bg-blue-600 transition">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="bg-slate-900 p-2 rounded-full text-slate-400 hover:text-white hover:bg-blue-600 transition">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}