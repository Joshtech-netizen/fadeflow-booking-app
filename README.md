# 💈 FadeFlow - Booking SaaS for Barbers

![FadeFlow Banner](https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=2000)

**FadeFlow** is a full-stack scheduling application that helps service businesses automate appointments, manage customers, and track revenue.

👉 **[Live Demo](https://fadeflow-booking-app.vercel.app/)**

---

## 🚀 Key Features

### 👤 Customer Facing
- **Real-time Availability:** Prevents double-bookings using Supabase logic.
- **Email Notifications:** Automated confirmation emails via EmailJS.
- **Responsive Design:** Mobile-first UI built with Tailwind CSS.

### 🛡️ Admin Dashboard
- **Secure Authentication:** Barber login protected by Supabase Auth.
- **Visual Analytics:** Revenue and booking trends visualized with Recharts.
- **Appointment Management:** View, manage, and cancel bookings instantly.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Lucide Icons
- **Backend:** Supabase (PostgreSQL, Auth, Row Level Security)
- **Deployment:** Vercel (CI/CD)
- **Utilities:** EmailJS (Notifications), Recharts (Analytics), Date-fns (Time logic)

---

## 📸 Screenshots

| Customer Booking | Admin Dashboard |
|:---:|:---:|
| * <img width="1895" height="893" alt="Screenshot 2026-01-14 133319" src="https://github.com/user-attachments/assets/10a70808-579a-406f-88fd-0ff4de809761" />
 * | *<img width="1887" height="907" alt="Screenshot 2026-01-14 132959" src="https://github.com/user-attachments/assets/abdf3bec-198f-4cbc-9753-89e6b1a19bf5" />
* |
---

## 📦 How to Run Locally

1. **Clone the repo**
   ```bash
   git clone [https://github.com/Joshtech-netizen/fadeflow.git](https://github.com/Joshtech-netizen/fadeflow.git)
2. **Install dependencies**
      npm install
3. **Set up Environment Variables** Create a .env.local file and add your Supabase & EmailJS keys:
      VITE_SUPABASE_URL=your_url
      VITE_SUPABASE_ANON_KEY=your_key
4. **Run the server**
      npm run dev

## 🔒 Security
This project uses Row Level Security (RLS) to ensure that while public users can create bookings, only authenticated admins can delete or view sensitive dashboard data.

## 👤 Author
**Joshua** - Full Stack Developer

GitHub
