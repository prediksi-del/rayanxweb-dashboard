import { initializeApp, getApps, getApp } from "firebase/app";

// Konfigurasi Firebase standar Next.js
// Ambil data credential dari Vercel Environment Variables demi keamanan
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "MOCK_API_KEY_VAL",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Mencegah inisialisasi ganda saat Next.js melakukan hot-reload
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export { app };
