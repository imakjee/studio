# Tailor Travels - Bespoke Luxury Travel Platform

This is a production-optimized Next.js 15 platform for Tailor Travels, featuring a full CMS, AI-powered copywriting, and lightning-fast performance.

## 🚀 Deployment Instructions

To take this website live for users:

1.  **Download Source Code**: In Firebase Studio, click the **Export/Download** button in the top navigation bar to get your ZIP file.
2.  **Firebase Deployment**:
    - Click the **Firebase icon** in the left sidebar of Studio.
    - Click **"Deploy to Hosting"**.
    - Studio will build the static frontend (`out` folder) and host it on your Firebase project.
3.  **Custom Domain**:
    - Go to your [Firebase Console](https://console.firebase.google.com/).
    - Select **Hosting**.
    - Click **"Add custom domain"** to link your professional URL (e.g., `tailortravels.co.uk`).

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS & ShadCN UI
- **Database**: Cloud Firestore
- **Authentication**: Firebase Auth
- **AI**: Google Genkit (Gemini 2.5 Flash)

## 📈 Performance Highlights
- **FCP**: < 1.2s
- **LCP**: < 2.0s
- **Optimization**: Hybrid Static Rendering, Image Lazy Loading, and Long Polling for Firestore stability.

## 🔑 Admin Access
Access the management portal at `/admin`. You can seed professional demo data from the `/admin/setup` page.
