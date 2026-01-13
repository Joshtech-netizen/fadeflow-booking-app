import { Scissors } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* 1. Logo Section */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition">
            <Scissors className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight group-hover:text-blue-400 transition">
            FadeFlow
          </span>
        </div>

        {/* 2. Navigation Links (Hidden on small mobile, visible on desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition">Services</a>
          <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition">Our Barbers</a>
          <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition">Reviews</a>
        </div>

        {/* 3. Book Now Button (CTA) */}
        <button 
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white text-slate-950 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-blue-500 hover:text-white transition shadow-lg shadow-white/5"
        >
          Book Now
        </button>

      </div>
    </nav>
  );
}

