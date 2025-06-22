
# CB UI - Chat Based User Interface (Frontend)

This is the frontend of a chat-based application built using **Next.js**, **TypeScript**, and **Tailwind CSS**. It provides a modern UI for user authentication and chatting, integrated with API endpoints for login, signup, profile, and session management.

---

## 🧰 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API Routes**: Built-in via Next.js API
- **Auth Handling**: Session-based via middleware
- **Package Manager**: npm

---

## 📁 Project Structure

```
cb-ui-main/
├── app/
│   ├── api/                # Auth API (login, signup, profile)
│   ├── chat/               # Chat interface
│   ├── Navbar.tsx          # Top navigation bar
│   ├── layout.tsx          # App layout template
│   └── globals.css         # Global styles
├── middleware.ts           # Route middleware for auth
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript config
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cb-ui-main.git
cd cb-ui-main
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Authentication Endpoints

| Endpoint        | Description         |
|----------------|---------------------|
| `/api/signup`  | User registration   |
| `/api/login`   | User login          |
| `/api/logout`  | Logout current user |
| `/api/me`      | Get current profile |
| `/api/profile` | Profile data        |

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---


## 🙌 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
