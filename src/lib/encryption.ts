/**
 * PII Encryption Utility — AES-256-GCM
 *
 * Provides encrypt/decrypt functions for customer PII fields stored
 * in data/bookings.json. Uses Node.js built-in crypto module with
 * AES-256-GCM (authenticated encryption).
 *
 * Key Management:
 *   Set ENCRYPTION_KEY in environment to a 64-character hex string.
 *   Generate with: openssl rand -hex 32
 *
 *   In Vercel, set via Project Settings → Environment Variables.
 *   In local .env.local, add: ENCRYPTION_KEY=<64-hex-chars>
 *
 * Format:
 *   Encrypted output is packed as: ivBase64.authTagBase64.ciphertextBase64
 *   This self-describing format carries all data needed for decryption.
 *
 * Dev Mode:
 *   If ENCRYPTION_KEY is not set, a warning is logged and values are
 *   stored/returned as plaintext. This enables local development without
 *   requiring the encryption key.
 */

import crypto from "crypto";

const ALGORITHM = "aes-256-gcm" as const;
const IV_LENGTH = 16; // 128 bits

// ---- Internal helpers ----

/**
 * Retrieve and validate the 256-bit encryption key from the environment.
 * Returns null if the key is not configured (dev mode).
 */
function getEncryptionKey(): Buffer | null {
  const raw = process.env.ENCRYPTION_KEY;

  if (!raw || raw.trim().length === 0) {
    return null;
  }

  // Strip any surrounding quotes that .env files sometimes add
  const hexKey = raw.replace(/^["']|["']$/g, "").trim();

  if (!/^[0-9a-fA-F]{64}$/.test(hexKey)) {
    console.warn(
      "[encryption] ENCRYPTION_KEY is not a valid 64-character hex string — falling back to plaintext",
    );
    return null;
  }

  return Buffer.from(hexKey, "hex");
}

// ---- Public API ----

/**
 * Encrypt a plaintext string using AES-256-GCM.
 *
 * @param plaintext - The value to encrypt (e.g. customerName, phone, email)
 * @returns Packed format "ivBase64.authTagBase64.ciphertextBase64",
 *          or the original plaintext if no key is configured (dev mode)
 */
export function encryptPII(plaintext: string): string {
  if (!plaintext) return plaintext;

  const key = getEncryptionKey();

  if (!key) {
    console.warn(
      "[encryption] ENCRYPTION_KEY not set — storing PII in plaintext (dev mode)",
    );
    return plaintext;
  }

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let ciphertext = cipher.update(plaintext, "utf-8", "base64");
  ciphertext += cipher.final("base64");
  const authTag = cipher.getAuthTag();

  // Pack as iv.authTag.ciphertext (all base64, dot-separated)
  return `${iv.toString("base64")}.${authTag.toString("base64")}.${ciphertext}`;
}

/**
 * Decrypt a value previously encrypted with `encryptPII`.
 *
 * @param packaged - The packed "ivBase64.authTagBase64.ciphertextBase64" string
 * @returns The original plaintext, or the input value if:
 *          - No key is configured (dev mode)
 *          - The value is already plaintext (no dots separator)
 *          - Decryption fails (wrong key, corrupted data)
 */
export function decryptPII(packaged: string): string {
  if (!packaged) return packaged;

  const key = getEncryptionKey();

  if (!key) {
    // Dev mode — no key configured, return as-is
    return packaged;
  }

  // If the value doesn't contain dots, it's already plaintext (legacy data)
  if (!packaged.includes(".")) {
    return packaged;
  }

  const parts = packaged.split(".");

  if (parts.length !== 3) {
    console.warn(
      "[encryption] Invalid encrypted format — expected 3 dot-separated parts, got %d",
      parts.length,
    );
    return packaged;
  }

  try {
    const [ivB64, authTagB64, ciphertextB64] = parts;
    const iv = Buffer.from(ivB64, "base64");
    const authTag = Buffer.from(authTagB64, "base64");

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(ciphertextB64, "base64", "utf-8");
    decrypted += decipher.final("utf-8");

    return decrypted;
  } catch (error) {
    console.error("[encryption] Decryption failed:", error);
    // Return the raw value so the caller can decide how to handle it.
    // A corrupted value is better than a crash.
    return packaged;
  }
}
