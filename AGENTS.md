## 🧠 Project Overview

DrinkMaster is a mobile-first web application for party drinking games, inspired by apps like Picolo and Juega Tequila. It is built using React, Tailwind CSS, and Vite, and is intended to be used entirely client-side. The project is structured to allow incremental contributions via feature branches and pull requests.

---

## 🛠️ Setup Instructions

To prepare the environment, each CODEX task should run the following setup command:

npm install

This will install all project dependencies using Node.js v20+ (already configured in the environment).

---

## ⚙️ Development Scripts

- Start development server:
  npm run dev

- Build production version:
  npm run build

- Lint code (optional):
  npm run lint

---

## 🚀 Deployment

The project is intended to be deployed using **Vercel**, using automatic deployment from the `main` branch via GitHub.

---

## 📌 Contribution Rules for CODEX Agents

- Each task should create its **own branch** based on the latest `main`.
- After completing a task, CODEX should open a **pull request**.
- DO NOT continue working on the same branch after a PR is merged.
- Pull requests should be reviewed locally before merging.
- After merging a PR, the branch can be deleted (automatically or manually).
- Each PR should be focused on a **single feature or change**.

---

## 📁 File Structure Overview
.
├── public/               # Static assets
├── src/
│   ├── components/       # React components
│   ├── assets/           # Images, sounds, etc.
│   ├── App.jsx           # Root component
│   └── index.css         # TailwindCSS entry
├── tailwind.config.js
├── vite.config.js
├── package.json
├── AGENTS.md             # This file
└── README.md             # Project info

---

## 🤖 Useful Tags

If you want to include metadata or labels for CODEX agents to detect tasks better, you can use:

- `@codex-task`
- `@codex-feature`
- `@codex-ui`
- `@codex-devops`

---

## 🙌 Final Note

This project follows a clean, task-based development workflow with CODEX and GitHub. Each contribution is expected to follow the atomic-PR style: **small, focused, reviewed, and merged**.

Enjoy building with DrinkMaster! 🍻