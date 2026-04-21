# Image-Based Cattle Breed Classification

AI-powered web app to classify cattle breeds from images, view breed insights, and generate structured Bharat Pashudhan submission payloads.

## Features

- Image upload and camera capture for breed classification
- Prediction dashboard with confidence and top predictions
- Breed details (origin, milk yield, horn type, usage, etc.)
- Bharat Pashudhan integration page with:
  - JSON payload generation and download
  - Payload copy to clipboard
  - Optional deep-link launch
  - Optional API submit flow
  - Local submission history (reuse/copy/download previous payloads)

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm

### Installation

```sh
git clone https://github.com/Shailesh7772/Image-Based-Cattle-Breed-Classification.git
cd Image-Based-Cattle-Breed-Classification
npm install
```

### Run in Development

```sh
npm run dev
```

Open the local URL shown in terminal (usually `http://localhost:8080`).

### Production Build

```sh
npm run build
npm run preview
```

## Environment Variables

Create or update `.env` in the project root:

```sh
VITE_SUPABASE_PROJECT_ID=""
VITE_SUPABASE_PUBLISHABLE_KEY=""
VITE_SUPABASE_URL=""

VITE_BHARATH_PASHUDHAN_DEEP_LINK=""
VITE_BHARATH_PASHUDHAN_API_URL=""
VITE_BHARATH_PASHUDHAN_API_KEY=""
```

### Bharat Pashudhan Notes

- If `VITE_BHARATH_PASHUDHAN_DEEP_LINK` is set, the app enables **Open Deep Link**.
- If `VITE_BHARATH_PASHUDHAN_API_URL` is set, the app enables **Submit to API**.
- Current API auth uses `Authorization: Bearer <API_KEY>`.  
  If your provider requires different headers, update `src/lib/bharathPashudhan.ts`.

## Project Scripts

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint
- `npm run test` - run tests once
- `npm run test:watch` - run tests in watch mode

## Repository

GitHub: [Shailesh7772/Image-Based-Cattle-Breed-Classification](https://github.com/Shailesh7772/Image-Based-Cattle-Breed-Classification)
