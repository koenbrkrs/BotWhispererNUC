# BotWhispererNUC

**Bot or Not?** — A three-level social deduction game where you detect bot-generated comments across simulated YouTube, Twitter/X, and WhatsApp interfaces.

## Overview

Players are shown a mix of real human comments and AI-generated bot comments on hot-button topics. The goal is to correctly identify which comments are written by bots and which are real — testing your ability to spot AI-generated content in the wild.

## Tech Stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS** for styling
- **Ollama** (local LLM) for generating bot comments
- **Electron** for museum/kiosk mode
- **SerialPort** for Arduino integration (museum mode)

## Getting Started

### Prerequisites

- Node.js & npm
- [Ollama](https://ollama.ai/) installed locally

### Development

```sh
# Install dependencies
npm install

# Start dev server (also starts Ollama and the logger)
npm run dev
```

### Museum / Kiosk Mode

```sh
# Build and launch in Electron kiosk mode
npm run museum
```

## Project Structure

```
src/
├── components/
│   ├── game/        # Core game UI (intro, end screen, HUD, etc.)
│   ├── youtube/     # YouTube-style comment interface
│   ├── twitter/     # Twitter/X-style feed interface
│   └── whatsapp/    # WhatsApp-style chat interface
├── hooks/           # Custom React hooks
├── utils/           # LLM generation, scoring, logging
├── pages/           # Route pages
└── types/           # TypeScript type definitions
```
