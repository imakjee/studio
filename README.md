# Tailor Travels - Bespoke Luxury Travel Platform

This is a production-optimized Next.js 15 platform for Tailor Travels, featuring a full CMS, AI-powered copywriting, and lightning-fast performance.

## 🚀 How to Publish (Live Deployment)

To take this website live for your users, follow these steps inside Firebase Studio:

1.  **Build the Project**: Firebase Studio automatically handles the build process, but ensure your code changes are saved.
2.  **Open Firebase Sidebar**: Click the **Firebase icon** (the orange flame) in the left-hand vertical sidebar of this editor.
3.  **Deploy**: 
    - Look for the **"Hosting"** section in the sidebar.
    - Click the **"Deploy to Hosting"** button.
    - Studio will compile your site into the `out` folder and upload it to your project.
4.  **View Site**: Once finished, a URL will be provided (e.g., `https://your-project-id.web.app`).

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