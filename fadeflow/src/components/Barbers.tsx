import { Instagram, Twitter } from 'lucide-react';

const barbers = [
  {
    id: 1,
    name: "Kwame Mensah",
    role: "Master Barber",
    image: "https://images.unsplash.com/photo-1581803118522-7b723e4cc734?auto=format&fit=crop&q=80&w=800",
    specialty: "Precision Fades"
  },
  {
    id: 2,
    name: "David Asante",
    role: "Beard Specialist",
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800",
    specialty: "Hot Towel Shaves"
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Stylist",
    image: "https://images.unsplash.com/photo-1599351431202-6e0000e401a4?auto=format&fit=crop&q=80&w=800",
    specialty: "Textured Cuts"
  }
];

export function Barbers() {
  return (
    <section id="barbers" className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Meet the <span className="text-blue-500">Masters</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our team of expert barbers brings years of experience and passion to every cut.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {barbers.map((barber) => (
            <div key={barber.id} className="group relative overflow-hidden rounded-2xl">
              <img 
                src={barber.image} 
                alt={barber.name} 
                className="w-full h-[400px] object-cover filter grayscale group-hover:grayscale-0 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition duration-300">
                <h3 className="text-xl font-bold text-white">{barber.name}</h3>
                <p className="text-blue-400 text-sm font-medium mb-2">{barber.role}</p>
                <p className="text-slate-300 text-xs mb-4">{barber.specialty}</p>
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition delay-100">
                  <Instagram className="w-5 h-5 text-white hover:text-blue-500 cursor-pointer" />
                  <Twitter className="w-5 h-5 text-white hover:text-blue-500 cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}