import Database from "better-sqlite3";
import { mkdirSync } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");
mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, "app.db"));
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS enquiries (
    id TEXT PRIMARY KEY,
    received_at TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    country TEXT,
    travelers TEXT,
    date TEXT,
    trip TEXT,
    message TEXT
  );

  CREATE TABLE IF NOT EXISTS subscribers (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    subscribed_at TEXT NOT NULL
  );
`);

export interface Enquiry {
  id: string;
  receivedAt: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  travelers?: string;
  date?: string;
  trip?: string;
  message?: string;
}

const insertEnquiryStmt = db.prepare(`
  INSERT INTO enquiries (id, received_at, name, email, phone, country, travelers, date, trip, message)
  VALUES (@id, @receivedAt, @name, @email, @phone, @country, @travelers, @date, @trip, @message)
`);

export function insertEnquiry(enquiry: Enquiry): void {
  insertEnquiryStmt.run({
    id: enquiry.id,
    receivedAt: enquiry.receivedAt,
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone ?? null,
    country: enquiry.country ?? null,
    travelers: enquiry.travelers ?? null,
    date: enquiry.date ?? null,
    trip: enquiry.trip ?? null,
    message: enquiry.message ?? null,
  });
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

const insertSubscriberStmt = db.prepare(`
  INSERT OR IGNORE INTO subscribers (id, email, subscribed_at)
  VALUES (@id, @email, @subscribedAt)
`);

export function insertSubscriber(subscriber: Subscriber): { alreadySubscribed: boolean } {
  const result = insertSubscriberStmt.run(subscriber);
  return { alreadySubscribed: result.changes === 0 };
}
