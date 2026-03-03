# Tailor Travels - Deployment Guide

This project is optimized for **Hostinger (Frontend)** and **Firebase (Backend)**.

## 🚀 How to Deploy to Hostinger

Follow these steps to put your website live on Hostinger:

1.  **Build the Project**:
    - Run `npm run build` in your terminal.
    - This will create a folder named `out` in your project root.

2.  **Prepare for Upload**:
    - Open the `out` folder.
    - Select all files and folders inside `out`.
    - Right-click and "Compress to ZIP" (name it `website.zip`).

3.  **Hostinger Panel**:
    - Log in to your Hostinger hPanel.
    - Go to **File Manager** for your domain.
    - Open the `public_html` directory.
    - **Upload** your `website.zip` file here.
    - **Extract** the ZIP file inside `public_html`.
    - Ensure the `.htaccess` file is also present in `public_html`.

4.  **Firebase Backend**:
    - Your Firestore database and Authentication will continue to work automatically from Hostinger as they are connected via API keys in `src/firebase/config.ts`.

## 🔑 Admin Access
Access your management portal at `yourdomain.com/admin/`.
- Use the **Setup Page** (`/admin/setup/`) if you haven't created your first admin user yet.

## 📉 Tech Stack
- **Frontend**: Next.js 15 (Static Export)
- **Backend**: Firebase Firestore & Auth
- **Hosting**: Hostinger Shared Hosting
