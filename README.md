# Tailor Travels - Bespoke Luxury Travel Platform

This is a production-optimized Next.js 15 platform for Tailor Travels, featuring a full CMS, AI-powered copywriting, and lightning-fast performance.

## 🚀 How to Publish (Live Deployment)

To take this website live, follow these steps inside Firebase Studio:

1.  **Open Firebase Sidebar**: Click the **Firebase icon** (the orange flame) in the left-hand vertical sidebar.
2.  **Login Step**: If asked to login, a browser window will open. Sign in with your Google account.
3.  **The "Code"**: If the terminal asks for an "authorization code", copy it from the browser window and paste it back into the Firebase prompt in Studio.
4.  **Deploy**: Click the **"Deploy to Hosting"** button. Studio will compile your site into the `out` folder and upload it.
5.  **View Site**: Once finished, your URL will be: `https://studio-6536263211-a9ebf.web.app`

## 🛠️ Custom Domain
To use your professional domain (e.g., `tailortravels.co.uk`):
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project.
3. Go to **Hosting** > **Add Custom Domain** and follow the instructions to update your DNS settings.

## 🔑 Admin Access
Access your management portal at `/admin`.
- **First Time?** Go to `/admin/setup` to create your account and seed demo data.
- **Manage Content**: Update holidays, destinations, and branch locations directly from the dashboard.

## 📈 Tech Stack
- **Framework**: Next.js 15 (Static Export)
- **Database**: Cloud Firestore (Real-time CMS)
- **Styling**: Tailwind CSS & ShadCN UI
- **AI**: Google Genkit (Gemini 2.5 Flash)