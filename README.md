# SmartVenue 🏟️

SmartVenue is a premium, "Deep Tech" venue management and attendee engagement platform designed for modern stadiums and large-scale event spaces. It leverages real-time data analytics, interactive mapping, and AI-driven insights to optimize crowd flow, security, and the overall attendee experience.

![Premium Dark Theme](https://img.shields.io/badge/Aesthetic-Deep%20Tech%20Dark-purple)
![React](https://img.shields.io/badge/Frontend-React-61dafb)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38b2ac)

## ✨ Features

- **Venue Command Dashboard**: A high-fidelity "Command Center" featuring real-time crowd density heatmaps, wait-time benchmarking, and live security feeds.
- **Interactive Live Map**: A state-of-the-art SVG map with:
  - Functional **Zoom In/Out** and Reset controls.
  - Live node markers for Medical Stations, Security Hubs, and Entry Gates.
  - Dynamic sector selection with AI-driven navigation recommendations.
- **Food & Facilities Hub**: Real-time tracking of queue lengths and occupancy for stalls and facilities, integrated with AI recommendations for the best times to visit.
- **AI Personal Assistant**: A dedicated interface for attendees to get personalized help, find directions, or report issues.
- **Community Feed**: Live event updates and community announcements.

## 🚀 Tech Stack

### Frontend
- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS (Custom "Deep Tech" theme with Glassmorphism)
- **Visualization**: Recharts (for high-contrast analytics)
- **Icons**: Lucide React
- **Animations**: CSS Framer-motion inspired transitions

### Backend
- **Framework**: FastAPI (Python)
- **Real-time**: WebSockets for live venue telemetry streaming
- **Data**: Mock data engine simulating thousands of concurrent sensor updates

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Meowz-18/SmartVenue.git
   cd SmartVenue
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python main.py
   ```

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## 🎨 Design Philosophy

SmartVenue adheres to a **Premium Deep Tech Aesthetic**:
- **Palette**: Slate-950 backgrounds with neon accents (Magenta, Blue, Purple).
- **Surface**: Iridescent glassmorphism (`backdrop-blur-xl`) and subtle micro-animations.
- **Typography**: Bold, high-contrast layouts inspired by modern high-end editorial design.

---

Built with ❤️ for the next generation of live events.
