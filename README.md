# 🐞 Bug Tracker UI

A modern, modular React-based bug tracking interface built with Vite, Material UI, and Airtable.

This app allows users to **view**, **search**, **sort**, **add**, **edit**, and **delete** bugs, with data persisted to Airtable via API integration.

---

## ✨ Features

- 🔍 **Search** bugs by any field (case-insensitive, real-time)
- 📊 **Sort** by `Severity`, `Status`, or `Bug ID`
- 📝 **Edit** bug entries inline with dropdown enums
- ➕ **Add new** bugs via a top-row editor with required validation
- ❌ **Delete** bugs with confirmation modal
- 💾 Airtable API integration (via `airtable.js` service)

---

## 🧱 Tech Stack

- ⚛️ **React** (via Vite)
- 🎨 **Material UI (MUI)** for styling
- 🧩 **Modular architecture** (hooks, components, models, services)
- ☁️ **Airtable** for persistent data storage

---

## 📁 Project Structure

- ├── src/
- │ ├── components/ # UI components (table, modal, inputs)
- │ ├── hooks/ # Custom hooks (data fetching, sorting, editing)
- │ ├── models/ # Enum definitions
- │ ├── pages/ # Page-level components
- │ ├── services/ # Airtable API integration
- │ └── data/ # Optional test data

---

## 🚀 Getting Started

### 1. Install dependencies
`npm install`

### 2. Start development server
`npm run dev`

### 3. Build
- `npm run build`
- `npm run preview`

### 4. Notes
- security concern re: AirTable Personal Access Token (PAT)
- UI coloring yet incomplete
