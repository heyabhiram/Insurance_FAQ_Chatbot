# 🚗 AI-Powered Vehicle Insurance FAQ Chatbot - Frontend

A modern, responsive, and intuitive web application providing an interactive conversational interface for the AI-Powered Vehicle Insurance FAQ Chatbot. Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**.

---

## 🏛️ Application Architecture

The frontend is architected as a modular Single-Page Application (SPA) leveraging Next.js App Router, client-side session state management, and real-time backend health monitoring.

```mermaid
flowchart TD
    subgraph UI ["User Interface Layer"]
        Landing["Landing Page (/) \nQuick Navigation & Feature Highlights"]
        ChatPage["Chat Route (/chat)\nFull-Featured Conversational Workspace"]
        Header["Application Header\nBrand Identity & Real-time Backend Status Badge"]
        QuickPills["Category Suggestion Bar\nTopical Filters: Third-Party, Comprehensive, IDV, NCB, Claims"]
        MessageArea["Message Stream Container\nUser Prompts, Bot Explanations, Source Tags & Confidence"]
        InputBar["Composer & Action Bar\nTextarea, Shortcut Listeners (Enter), Send Trigger"]
    end

    subgraph StateManagement ["Client State & Lifecycle Layer"]
        SessionStore[("Browser SessionStorage\nPersistent conversation_id per Tab")]
        MsgQueue["Message History State\nOptimistic UI Updates & Bot Answers"]
        HealthMonitor["Health Poller\nPeriodic GET /health Verification"]
        ScrollManager["Auto-Scroll Controller\nSmooth Scrolling via useRef DOM Binding"]
    end

    subgraph ServiceLayer ["API Integration & Network Layer"]
        ApiClient["Fetch API Client\nDynamic Base URL Resolution via NEXT_PUBLIC_API_URL"]
        PayloadSerializer["Payload Serializer\nFormulates ChatRequest & Deserializes ChatResponse"]
        ErrorHandler["Resilience & Fallback Handler\nGraceful Offline Indicators & Error Feedback"]
    end

    subgraph Backend ["FastAPI Backend (Target Service)"]
        HealthEndpoint["GET /health"]
        ChatEndpoint["POST /api/v1/chat"]
    end

    Landing -->|"Navigate"| ChatPage
    ChatPage --> Header
    ChatPage --> QuickPills
    ChatPage --> MessageArea
    ChatPage --> InputBar

    InputBar -->|"Submit Message"| MsgQueue
    QuickPills -->|"Select FAQ Prompt"| MsgQueue

    MsgQueue -->|"Optimistic Render"| MessageArea
    MsgQueue -->|"Trigger API Call"| PayloadSerializer
    PayloadSerializer --> ApiClient

    ApiClient -->|"POST JSON"| ChatEndpoint
    ApiClient -->|"Polling"| HealthEndpoint

    ChatEndpoint -->|"ChatResponse Payload"| PayloadSerializer
    HealthEndpoint -->|"Service Status"| HealthMonitor

    HealthMonitor -->|"Update Status"| Header
    PayloadSerializer -->|"Append Bot Message"| MsgQueue
    MsgQueue -->|"DOM Mutated"| ScrollManager
    ScrollManager -->|"Scroll to Bottom"| MessageArea
    ErrorHandler -.->|"Catch Network Outages"| MessageArea
```

---

## 🧩 Architectural Layers & Components

### 1. App Router & Navigation Architecture
- **Root Layout (`src/app/layout.tsx`):** Provides global metadata, typography styling via Tailwind CSS, and base responsive HTML containers.
- **Landing Gateway (`src/app/page.tsx`):** Showcases product capabilities, common insurance inquiry categories, and quick links to open the chat interface.
- **Dedicated Chat Route (`src/app/chat/page.tsx`):** Isolated workspace dedicated to the conversation session, message streaming, and source citations.

### 2. State Management & Lifecycle Architecture
- **Session Continuity:** Generates and maintains a unique `conversation_id` in `sessionStorage` per browser tab. This enables multi-turn conversation tracking across requests without requiring mandatory user authentication.
- **Optimistic Message Updates:** Immediately appends the user's inquiry to the local message list while transitioning the UI into a loading state, providing instant feedback.
- **DOM Auto-Scrolling:** Leverages React's `useRef` tied to the scroll anchor, automatically executing smooth scrolling upon new incoming messages or status changes.

### 3. Component & UI Architecture
- **Interactive Quick Pills:** Categorized chip buttons allowing users to explore popular insurance topics (e.g., *IDV Calculation*, *NCB Transfer*, *Cashless Garage Claims*) with one click.
- **Attribution & Metadata Badges:** Renders metadata returned from the backend, including detected user intent, retrieved FAQ source IDs (`faq_001`, `faq_002`), and retrieval confidence scores.
- **Backend Health Badge:** Dynamically displays whether the FastAPI backend server is `online`, `offline`, or `checking`, keeping users informed of connectivity status.

### 4. API Communication & Resilience Architecture
- **Configurable Network Boundary:** All API requests dynamically resolve the backend URL through `NEXT_PUBLIC_API_URL`, supporting local development and cloud deployments seamlessly.
- **Graceful Error Handling:** If the backend is unreachable or returns an HTTP error, the application displays an informative error card without breaking the interface.

---

## 🔄 User Interaction & Message Sequence

```mermaid
sequenceDiagram
    autonumber
    actor User as Policyholder / User
    participant View as Next.js Chat Interface
    participant State as React State & Session
    participant API as Backend REST Gateway
    participant LLM as FastAPI + RAG Engine

    User->>View: Opens /chat interface
    View->>State: Check or create sessionStorage conversation_id
    View->>API: GET /health
    API-->>View: {"status": "healthy", "faq_indexed_count": 55}
    View->>View: Display "Backend Online" badge

    User->>View: Types question or clicks category pill
    View->>State: Add user prompt optimistically (isLoading = true)
    View->>API: POST /api/v1/chat {"message": "...", "conversation_id": "..."}
    API->>LLM: Semantic search & RAG answer synthesis
    LLM-->>API: Answer + Intent + Source FAQs + Confidence
    API-->>View: HTTP 200 JSON Response
    View->>State: Append bot response (isLoading = false)
    State->>View: Trigger smooth scroll to bottom ref
    View-->>User: Displays verified answer with source badges
```

---

## 🛠️ Technology Stack & Rationale

| Technology | Role | Rationale |
|---|---|---|
| **Next.js 15 (App Router)** | Web Framework | Server-driven rendering, optimized bundles, fast routing, and built-in Turbopack bundler. |
| **React 19** | UI Library | Modern component lifecycle, declarative hooks (`useState`, `useEffect`, `useRef`), and high rendering efficiency. |
| **TypeScript** | Type Safety | Enforces strict compile-time types for messages, payloads, and component props, preventing runtime errors. |
| **Tailwind CSS** | Styling System | Utility-first responsive styling ensuring rapid development and lightweight production stylesheets. |
| **Lucide React** | Iconography | Lightweight, consistent SVG icon set for navigation, status indicators, and category pills. |

---

## 🚀 Setup & Execution Guide

### 1. Prerequisites
- Node.js 18.17 or later
- npm, yarn, or pnpm
- Running FastAPI backend (default: `http://127.0.0.1:8000`)

### 2. Installation
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env.local` file from the provided template:
```bash
cp .env.example .env.local
```

Set the backend API URL in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### 4. Development Server
Start the Next.js development server with Turbopack:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) or navigate directly to the chat interface at [http://localhost:3000/chat](http://localhost:3000/chat).

### 5. Production Build & Execution
```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
```

### 6. Linting
```bash
npm run lint
```
