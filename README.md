# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Bharath Pashudhan integration setup

The app supports both:
- Deep-link opening (`Open Deep Link`)
- Direct API submit (`Submit to API`)

Add these variables in `.env`:

```sh
VITE_BHARATH_PASHUDHAN_DEEP_LINK="https://provider-domain/path"
VITE_BHARATH_PASHUDHAN_API_URL="https://provider-domain/api/submissions"
VITE_BHARATH_PASHUDHAN_API_KEY="your-api-key-if-required"
```

Then restart the dev server:

```sh
npm run dev
```

### Steps to get API details from Bharat Pashudhan provider

1. Request API onboarding from Bharat Pashudhan tech/support team.
2. Ask for:
   - Base API URL for production (and sandbox if available)
   - Submission endpoint path and method (usually `POST`)
   - Auth type (`Bearer token`, API key header, OAuth, etc.)
   - Required payload schema and sample request/response
   - Error codes and rate limits
3. Put the received values into `.env`.
4. Test by classifying an image and using `Submit to API` on the Bharath Pashudhan page.

If their auth/header format is not `Authorization: Bearer <token>`, update `src/lib/bharathPashudhan.ts` accordingly.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
