## HealthFlow — Professional Healthcare Dashboard

HealthFlow is a high-performance, type-safe Healthcare SaaS Dashboard designed for clinic administrators to manage patient records, monitor facility performance, and track real-time activity. Built with a focus on User Experience (UX) and Data Integrity, it features a fully persistent state and a responsive, modern "Emerald" aesthetic.

## Live Demo

https://healthflow-saas-dashboard.vercel.app/

Email - test@raga.com
Password - password@123

## 📋 Patient Management (CRUD)

- Create, Read, Update, Delete: Comprehensive patient record management with specialized views for viewing details and editing data.

- Dual View Mode: Toggle between a high-density List View and a visual Grid View.

- Real-time Search: Instant filtering by patient name or diagnosis using optimized client-side logic.

## 📊 Performance Analytics

- Data Visualization: Interactive charts built with Recharts showing monthly patient inflow and revenue growth trends.

- KPI Tracking: Quick-glance stats for total patients, active treatments, and critical cases.

## 💾 Robust Architecture

- State Persistence: Integrated Redux-to-LocalStorage sync ensures patient data survives browser refreshes without a backend.

- Type Safety: 100% TypeScript coverage for data models, Redux actions, and component props.

- Responsive Design: Fully optimized for Mobile, Tablet, and Desktop using Tailwind CSS.

## 🔔 System Feedback

- Toasts & Notifications: Real-time feedback for user actions via Sonner and OS-level system notifications via Service Workers.

## 🛠️ Tech Stack

1. Frontend - React 18, TypeScript, Tailwind CSS
2. State Management - Redux Toolkit (RTK)
3. Routing - React Router Dom v6
4. Icons - Lucide React
5. Charts - Recharts
6. Feedback - Sonner (Toasts), Browser Notification API
7. Persistence - LocalStorage API

## 🧠 Technical Highlights

1. Optimized Modal Architecture
   Solved the "Cascading Render" warning by removing unnecessary useEffect hooks for state synchronization. Instead, utilized the React key prop strategy on the PatientModal to force a clean component reset whenever a different patient is selected.

2. State Persistence Layer
   Implemented a custom store subscriber that serializes the patients slice to localStorage. Added a robust hydration check in the initialState to prioritize persisted data over mock data, ensuring a seamless user experience.

3. Type-Safe Redux Implementation
   Used useAppDispatch and useAppSelector hooks to ensure full type inference across the application, reducing runtime errors and improving developer velocity.

## ⚙️ Installation & Setup

1.  Clone the repository:

    git clone https://github.com/yuvaspravin/healthflow-saas-dashboard.git

2.  Install dependencies:

    npm install

3.  Run the development server:

    npm run dev

4.  Build for production:

    npm run build

## ✉️ Contact

Yuvas Pravin

[(https://www.linkedin.com/in/yuvas-pravin/)]
