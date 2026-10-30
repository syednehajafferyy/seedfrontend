"use server";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email").max(150),
  phone: z.string().trim().regex(/^[+0-9\s-]{7,20}$/, "Enter a valid phone number"),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactState = { ok: boolean; message: string; errors?: Record<string, string[]> };

const recent = new Map<string, number>();

export async function submitInquiry(_: ContactState, fd: FormData): Promise<ContactState> {
  // Honeypot check
  if (fd.get("website")) return { ok: true, message: "Thank you. We will be in touch." };

  const started = Number(fd.get("t"));
  if (!started || Date.now() - started < 3000) {
    return { ok: false, message: "Please take a moment to complete the form." };
  }

  // Safe FormData conversion to avoid symbol iterator type errors
  const raw: Record<string, string> = {};
  fd.forEach((val, key) => {
    raw[key] = String(val);
  });

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please correct the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // Best-effort in-memory throttle per email
  const key = parsed.data.email.toLowerCase();
  if (Date.now() - (recent.get(key) ?? 0) < 30000) {
    return { ok: false, message: "Please wait before sending another inquiry." };
  }
  recent.set(key, Date.now());

  // Forward to backend API if configured
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (backendUrl) {
    try {
      await fetch(`${backendUrl}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
    } catch (err) {
      console.warn("Could not reach backend API:", err);
    }
  }

  return { ok: true, message: "Thank you. Your inquiry has been received." };
}
