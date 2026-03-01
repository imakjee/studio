# Tailor Travels - Bespoke Luxury Travel Platform

This is a production-optimized Next.js 15 platform for Tailor Travels, featuring a full CMS and high-performance static hosting.

## 🚀 How to Publish (Action Required)

To make your website live, you must complete the following steps in order:

1.  **Open Firebase Sidebar**: Click the **Orange Flame** icon in the far left vertical menu.
2.  **Login Step**: Click the login prompt if it appears. A browser window will open. Sign in with your Google account.
3.  **The Code**: **CRITICAL** - After logging in, the browser will give you a code. Copy that code, return to this tab, and paste it into the terminal/prompt that appeared in the sidebar.
4.  **Deploy**: Once authenticated, click the **"Deploy to Hosting"** button. This will:
    - Run `npm run build` (creating the `out` folder).
    - Upload your static files to Firebase Hosting.
5.  **View Site**: Your live URL will be: `https://studio-6536263211-a9ebf.web.app`

## 🛠️ Deployment Troubleshooting
- **Button missing?** Ensure `firebase.json` is in the root folder (it is now).
- **Site not found?** Ensure you ran the deploy *after* the build finished.
- **Login failed?** Close the sidebar and click the Firebase icon again to restart the auth flow.

## 🔑 Admin Access
Access your management portal at `/admin`.
- **Manage Content**: Update holidays, destinations, and branch locations.
- **Launch Guide**: View the checklist on the main Admin Dashboard.

## 📈 Tech Stack
- **Framework**: Next.js 15 (Static Export)
- **Database**: Cloud Firestore (Real-time CMS)
- **Hosting**: Firebase Hosting
