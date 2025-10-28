# 💤 SleePT — Passive-Aggressive AI Chatbot

A WebSocket-based AI chatbot with persistent sessions, quirky chat presets, and a fun, animated UI. SleePT encourages procrastination—just like a true “productivity coach” would… if he were sarcastic, manipulative, and oddly comforting.

---

## 🚀 Overview

**SleePT** is a humorous and interactive AI chatbot built for entertainment and creative dialogue. Featuring real-time WebSocket communication, session persistence via MongoDB, and a smooth, animated frontend, SleePT creates the illusion of chatting with a life coach who doesn't really want you to do anything—at all.

Whether you want a laugh, a strange excuse to avoid work, or just an oddly motivational way to waste time, SleePT is here to help.

---

## 📚 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Setup & Installation](#️-setup--installation)
- [How It Works](#-how-it-works)
- [Example MongoDB Document](#-example-mongodb-document)
- [Fun & Responsive UI](#-fun--responsive-ui)
- [Tech Stack](#-tech-stack)
- [Mongoose Model](#-mongoose-model)
- [The SleePT Persona](#-the-sleept-persona)
- [Chat Presets](#-the-5-chat-presets)
- [Contributors](#-team)
- [License](#-license)

---

## 🧩 Features

- ✅ **Real-time chat** using WebSockets
- ✅ **Persistent chat sessions** via MongoDB
- ✅ **Fully responsive UI** built with Next.js + Tailwind CSS
- ✅ **Five built-in chat presets** for instant conversation starters
- ✅ **New Chat button** to reset sessions
- ✅ **Automatic reconnect** and session recovery
- ✅ **Stored chat history** reloads after refresh

---

## 🗂️ Project Structure

```
sleePT-simple/
├── server/
│   ├── app.js               # WebSocket + MongoDB backend
│   ├── models/
│   │   └── Chat.js          # Mongoose schema for chat sessions
│   └── .env                 # Environment variables
│
├── app/
│   ├── page.tsx             # Main chat UI (frontend)
│   ├── compents/
│   │   ├── BlindDropdown.tsx  # Dropdown with 5 chat presets
│   │   └── MovingMascot.tsx   # Animated mascot on startup
│   └── public/
│       └── SendButton.svg
│
└── README.md
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/sleePT-simple.git
cd sleePT-simple
```

### 2️⃣ Install dependencies

```bash
# Backend
cd server && npm install

# Frontend
cd ../ && npm install
```

### 3️⃣ Create the `.env` file in `/server`

```env
mongodbUrl=mongodb://127.0.0.1:27017/sleePT
PORT=8082
OPENAI_API_KEY=your_api_key_here
```

Ensure MongoDB is running locally or remotely.

### 4️⃣ Run the backend

```bash
cd server
nodemon app.js
```

You should see:

```
✅ Connected to MongoDB
💬 WebSocket server running on ws://localhost:8082
```

### 5️⃣ Run the frontend

```bash
npm run dev
```

Then open your browser at:

👉 http://localhost:3000

---

## 💬 How It Works

- On launch, the app connects to the WebSocket backend.
- Each user gets a unique session ID stored in `localStorage`.
- All user and AI messages are saved in MongoDB.
- Refreshing the page reloads chat history automatically.
- Clicking **New Chat** resets the session.
- Chat **presets** offer fast and funny conversation starters.

---

## 🧠 Example MongoDB Document

```json
{
  "_id": "671f9ef5341cbb123456789a",
  "sessionId": "3d55bfa2-81de-41a9-85ad-29e21e9a86aa",
  "messages": [
    { "role": "user", "content": "I should clean my room." },
    { "role": "assistant", "content": "Mmm, 'should' is such a harsh word..." }
  ]
}
```

---

## 🎨 Fun & Responsive UI

The interface is built with **Next.js** and **Tailwind CSS** to ensure:

- 📱 Mobile-first, fully responsive design
- 💬 Smooth animations and transitions
- 🐿️ An **animated mascot** (MovingMascot) to greet users
- 🎯 A **BlindDropdown** component with 5 engaging chat prompts

---

## 🧱 Tech Stack

| Layer       | Technology                  |
|-------------|-----------------------------|
| Frontend    | Next.js (React + TypeScript)|
| Styling     | Tailwind CSS                |
| Backend     | Node.js + WebSocket (`ws`)  |
| Database    | MongoDB + Mongoose          |
| AI Engine   | OpenAI API (ChatGPT)        |

---

## 🧩 Mongoose Model

**`models/Chat.js`**

```js
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  messages: [
    {
      role: { type: String, enum: ["user", "assistant"], required: true },
      content: { type: String, required: true }
    }
  ]
});

export const Chat = mongoose.model("Chat", chatSchema);
```

---

## 🧠 The SleePT Persona

SleePT is a parody AI “life coach” designed to manipulate you into *not* doing things—but with flair.

> “At 3:17 PM? Everyone knows creativity peaks at round numbers.  
> How about you spend the next hour researching fonts instead? It’s basically working on your essay…”

---

## 💬 The 5 Chat Presets

Use the **BlindDropdown** to pick one of these starter prompts:

1. *Help me make an excuse for not doing my homework.*
2. *Give me a reason to procrastinate productively.*
3. *Convince me to relax instead of studying.*
4. *Help me come up with a creative way to waste time.*
5. *Tell me why I should start tomorrow instead.*

These prompts launch a new chat, keeping SleePT’s sarcastic tone while giving you different entry points.

---

## 👥 Team

This project was collaboratively developed by a team of five, combining expertise in design, engineering, AI, and user experience.

- **Hirad Fakouri** — Backend Engineer  
- **Conor Haughney** — Lead Frontend Engineer  
- **Alex Nicolson** — UI/UX Designer & Frontend Engineer  
- **Shay Saha** — Lead UI/UX Designer  
- **James McGrath** — Prompt Engineer & Frontend Engineer

---

## 🧾 License

**MIT License** © 2025 — SleePT Development Team
