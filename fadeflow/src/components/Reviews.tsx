import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "James O.",
    rating: 5,
    text: "Best haircut I've had in Accra. Kwame really knows how to handle a fade. The booking app made it so easy.",
    date: "2 days ago"
  },
  {
    id: 2,
    name: "Michael B.",
    rating: 5,
    text: "Professional atmosphere and great vibes. I didn't have to wait in line because I booked ahead. Highly recommend!",
    date: "1 week ago"
  },
  {
    id: 3,
    name: "Emmanuel K.",
    rating: 4,
    text: "Great service, very clean shop. The hot towel shave is a must-try.",
    date: "2 weeks ago"
  }
];

export function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-slate-900 border-y border-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Client <span className="text-blue-500">Stories</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition shadow-2xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-700'}`} 
                  />
                ))}
              </div>
              <p className="text-slate-300 italic mb-6 leading-relaxed">"{review.text}"</p>
              <div className="flex justify-between items-center border-t border-slate-800 pt-4">
                <span className="text-white font-bold">{review.name}</span>
                <span className="text-xs text-slate-500">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}