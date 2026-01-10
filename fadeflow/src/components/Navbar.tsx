import { Scissors } from 'lucide-react'; 

export function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white py-4 px-6 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Scissors className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold tracking-tight">FadeFlow</h1>
        </div>
        <div className="flex gap-6 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-blue-400 transition">Services</a>
          <a href="#" className="hover:text-blue-400 transition">Our Barbers</a>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-bold transition">
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
}