# Tip Distribution Calculator

A desktop application built with **Electron**, **React**, and **Vite** for distributing tips fairly among workers based on hours worked.

## Features

- Enter **credit tips** and **cash tips** separately
- Add any number of workers with their names and hours worked
- Automatically calculates each worker's proportional share of both tip types
- Displays a results table showing credit, cash, and total tips per worker

## Tech Stack

- [Electron](https://www.electronjs.org/) — cross-platform desktop app
- [React 19](https://react.dev/) — UI
- [Vite](https://vitejs.dev/) — build tool

## Getting Started

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Build for production
npm run build

# Run as Electron desktop app
npm run electron

# Build portable Windows executable
npm run dist
```

## How It Works

Tips are distributed proportionally based on hours worked. If a worker worked 4 of 8 total hours, they receive 50% of both the credit and cash tips.
