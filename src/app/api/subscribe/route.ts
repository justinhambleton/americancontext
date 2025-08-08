import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "edge"; // use the Edge runtime for low-latency serverless DB calls

function isValidEmail(value: string): boolean {
  const email = value.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const email = (body?.email as string | undefined)?.trim().toLowerCase() ?? "";

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      return NextResponse.json(
        { error: "Server not configured. Missing DATABASE_URL." },
        { status: 500 }
      );
    }

    const sql = neon(connectionString);

    // Ensure table exists (idempotent)
    await sql`CREATE TABLE IF NOT EXISTS email_signups (
      email TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`;

    // Insert with upsert-like behavior; ignore duplicates
    await sql`INSERT INTO email_signups (email) VALUES (${email}) ON CONFLICT (email) DO NOTHING`;

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    // Log the error for diagnostics (Edge runtime supports console output)
    console.error("/api/subscribe POST failed", error);
    return NextResponse.json(
      { error: "Unexpected server error. Please try again later." },
      { status: 500 }
    );
  }
}
