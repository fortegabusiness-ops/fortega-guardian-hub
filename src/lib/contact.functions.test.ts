/// <reference types="bun" />
import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";

let setupFails = false;
let sendFails = false;
let logFails = false;
const inserted: Record<string, unknown>[] = [];
const safeMessage = "Unable to send your request. Please try again or call 1-888-869-1679.";

mock.module("@tanstack/react-start", () => ({
  createServerFn: () => ({
    inputValidator: () => ({ handler: (handler: unknown) => handler }),
  }),
}));
mock.module("@/integrations/supabase/client.server", () => ({
  get supabaseAdmin() {
    if (setupFails) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY configuration");
    return {
      from: () => {
        if (setupFails) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY configuration");
        return { insert: async (row: Record<string, unknown>) => {
        if (logFails) throw new Error("Internal database failure");
        inserted.push(row);
        return { error: null };
        } };
      },
    };
  },
}));
mock.module("@/lib/email-templates/send-email", () => ({
  sendTemplateEmail: async () => {
    if (sendFails) throw new Error("LOVABLE_API_KEY is not configured");
    return { sent: true };
  },
}));

const { submitContact } = await import("./contact.functions");
const invoke = submitContact as unknown as (args: { data: Record<string, string> }) => Promise<{ ok: boolean }>;
const data = { name: "Test", email: "test@example.com", phone: "1234567890", service: "Other", message: "Test request details" };
let consoleError: ReturnType<typeof mock>;
let originalConsoleError: typeof console.error;

beforeEach(() => {
  setupFails = sendFails = logFails = false;
  inserted.length = 0;
  originalConsoleError = console.error;
  consoleError = mock(() => {});
  console.error = consoleError;
});
afterEach(() => { console.error = originalConsoleError; });

describe("contact error confidentiality", () => {
  test("successful requests still send and record success", async () => {
    expect(await invoke({ data })).toEqual({ ok: true });
    expect(inserted[0].status).toBe("sent");
  });
  test("missing configuration is contained including failed failure logging", async () => {
    setupFails = true;
    await expect(invoke({ data })).rejects.toThrow(safeMessage);
  });
  test("send errors stay private and are recorded server-side", async () => {
    sendFails = true;
    await expect(invoke({ data })).rejects.toThrow(safeMessage);
    expect(inserted[0].status).toBe("failed");
    expect(inserted[0].error_message).toBe("LOVABLE_API_KEY is not configured");
  });
  test("logging failures cannot replace the safe public error", async () => {
    sendFails = logFails = true;
    await expect(invoke({ data })).rejects.toThrow(safeMessage);
  });
});