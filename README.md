# SmartAssist PWA

SmartAssist is a mobile-first Progressive Web App built with React + Vite, TailwindCSS, Framer Motion, and Web APIs for assistive workflows.

## Features

- Onboarding wizard with support profile setup
- Home dashboard with usage stats
- Communication module: Speech-to-Text + Text-to-Speech
- Navigation assistance: camera feed + mock object detection + vibration
- Learning module: summarize + simplify (ELI5) mock AI
- Hearing assistance: live microphone sound intensity meter + loud sound alerts
- Settings: font size, contrast, theme, voice selection, onboarding reset
- Accessibility-first controls with ARIA labels and large tap targets
- PWA support: installable manifest + service worker offline caching

## Tech Stack

- Frontend: React (Vite), TailwindCSS, Framer Motion, Web Speech API, MediaDevices API
- Backend: Node.js, Express.js
- Data: MongoDB (optional via `MONGO_URI`) with fallback in-memory/localStorage

## Project Structure

```text
src/
  components/
  pages/
  hooks/
  utils/
  App.jsx
  main.jsx
server/
  server.js
public/
  manifest.json
  service-worker.js
```

## Run Frontend

```bash
npm install
npm run dev
```

App runs on the Vite dev server (usually `http://localhost:5173`).

## Run Backend

```bash
node server/server.js
```

API runs on `http://localhost:4000`.

Optional MongoDB:

```bash
# PowerShell
$env:MONGO_URI="mongodb://localhost:27017/smartassist"
node server/server.js
```

## Notes

- UI is optimized for mobile (`min-width: 360px`, centered app shell max width `480px`).
- Real AI/object detection models are mocked for demo mode and can be replaced later with production APIs.
- For best SpeechRecognition support, use Chromium-based browsers.
