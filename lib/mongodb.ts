import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "your-mongo-uri"; // Replace this with your actual Mongo URI in .env

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

type Cached = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // Ensures that global.mongoose can be used with proper typing
  var mongoose: Cached;
}

const globalWithMongoose = global as typeof global & { mongoose?: Cached };

const cached: Cached = globalWithMongoose.mongoose || {
  conn: null,
  promise: null,
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
