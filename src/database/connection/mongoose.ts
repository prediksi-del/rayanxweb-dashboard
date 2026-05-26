import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "// CRITICAL ERROR: MONGODB_URI environment variable is missing inside .env configuration."
  );
}

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Mencegah error polusi variabel global pada runtime Node.js
declare global {
  // eslint-disable-next-line no-var
  var mongooseGlobal: GlobalMongoose | undefined;
}

// Inisialisasi awal penampung koneksi (Caching Mechanism)
let cached = global.mongooseGlobal;

if (!cached) {
  cached = global.mongooseGlobal = { conn: null, promise: null };
}

export async function connectDB(): Promise<typeof mongoose> {
  // Pastikan objek cached tidak kosong sebelum membaca propertinya
  if (cached && cached.conn) {
    return cached.conn;
  }

  if (cached && !cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 50,         // Batasan jumlah pool agar tidak menghabiskan koneksi MongoDB Atlas
      autoIndex: true,         // Mengaktifkan pembuatan indeks skema otomatis
      serverSelectionTimeoutMS: 5000, // Batas waktu tunggu pencarian node database (5 detik)
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
  }

  try {
    if (cached && cached.promise) {
      cached.conn = await cached.promise;
    }
  } catch (error) {
    if (cached) {
      cached.promise = null; // Hancurkan promise jika gagal agar request berikutnya bisa mencoba ulang
    }
    console.error("// MONGODB NETWORK REFUSED PROTOCOL:", error);
    throw error;
  }

  if (!cached || !cached.conn) {
    throw new Error("// DATABASE ENGINE INSTANCE COLLAPSED: Failed to initialize connection pool.");
  }

  return cached.conn;
}
