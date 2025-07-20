# 🎮 GameVault – React Frontend

**GameVault** is a personal game library manager that lets users sync, organize, and browse their owned games across platforms like **Steam** and **Epic Games**.

This repository contains the **frontend** built with **React + TypeScript**, designed to interface with a FastAPI backend.

---

## ✨ Features

- 🎮 View synced games in a responsive, grid-based layout  
- 🔄 Sync support for **Steam** and **Epic** accounts  
- 📊 Displays platform icons and last synced timestamps  
- 🔍 Modal view for individual game details  
- ⚙️ Modular component-based architecture  
- 📦 Built with performance in mind using **Vite**

---

## 🧰 Tech Stack

| Category      | Tools Used                              |
|---------------|------------------------------------------|
| Framework     | React, TypeScript                       |
| Styling       | Tailwind CSS                            |
| Icons         | FontAwesome                             |
| Tooling       | Vite (build tool)                       |
| State / Logic | React Hooks (e.g., `useSync`)           |
| Backend API   | FastAPI (not included in this repo)     |

---

## 📂 Folder Structure (Simplified)

```
src/
├── components/     # UI Components (GameCard, Header, Sidebar, Modal)
├── data/           # Mock game data for testing
├── hooks/          # Custom sync logic
├── assets/         # Images and icons
├── utils/          # Utilities
├── App.tsx         # Main layout and routing
└── main.tsx        # Entry point
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm
- GameVault backend running at `http://127.0.0.1:8005`

### Installation

```bash
git clone https://github.com/ParthS33/GameVault_React.git
cd GameVault_React
npm install
```

### Run Development Server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧠 How It Works

- Game data can be loaded from the backend or local mocks  
- Modal and sidebar UI are controlled via shared state in `App.tsx`  
- Platform icons are dynamically mapped per game

---

## 🛠 Backend Integration (Future Work)

This frontend expects a compatible backend (e.g. GameVault FastAPI):

| Endpoint        | Purpose           |
|------------------|------------------|
| `/sync/steam`    | Steam login & game sync |
| `/sync/epic`     | Epic Games sync |
| `/games`         | Fetch synced games |

Backend handles authentication, game parsing, and sync storage.

---

## 📸 Screenshots

![GameVault UI](https://github.com/ParthS33/GameVault_React/blob/main/main_page.png?raw=true)

---

## 🧾 License

MIT License — feel free to fork, build on it, or use in your own gaming projects.

---

## 📬 Contact

Built by [@ParthS33](https://github.com/ParthS33)  

