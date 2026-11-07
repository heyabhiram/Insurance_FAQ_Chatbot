# 🚗 Insurance FAQ Chatbot - Frontend

Modern, responsive web interface for the AI-Powered Vehicle Insurance FAQ Chatbot, built with **Next.js 15 (App Router)**, **React**, and **Tailwind CSS**.

---

## 🌟 Features

- **Interactive AI Chat:** Real-time chat with the FastAPI insurance backend.
- **Categorized Inquiries:** Quick access to common insurance topics (Third-Party, Comprehensive, IDV, NCB, Claims).
- **Responsive UI:** Clean, mobile-friendly interface styled with Tailwind CSS.
- **Environment Configured:** Simple integration with backend API endpoints via environment variables.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** Fetch API

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.17 or later
- npm / pnpm / yarn

### 2. Installation
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root of the `frontend` directory:
```bash
cp .env.example .env.local
```
Ensure the API URL points to your running FastAPI backend:
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) or [http://localhost:3000/chat](http://localhost:3000/chat) in your browser.

---

## 📦 Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Builds the production bundle.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint checks.
