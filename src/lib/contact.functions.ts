import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  service: z.string().min(1).max(120),
  message: z.string().trim().min(10).max(1500),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    let messageId: string | undefined;
    const RECIPIENT = "info@fortega.ca";

    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
      messageId = `contact-${crypto.randomUUID()}`;
      const result = await sendTemplateEmail("contact-notification", RECIPIENT, {
        templateData: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: data.service,
          message: data.message,
        },
        idempotencyKey: messageId,
        replyTo: data.email,
      });

      const { error: logError } = await supabaseAdmin.from("email_send_log").insert({
        message_id: messageId,
        template_name: "contact-form",
        recipient_email: RECIPIENT,
        status: result.sent ? "sent" : "suppressed",
      });
      if (logError) console.error("Failed to record contact email log", { code: logError.code, message: logError.message });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error("Contact submission failed", { messageId, message: errorMsg });
      try {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error: logError } = await supabaseAdmin.from("email_send_log").insert({
          message_id: messageId,
          template_name: "contact-form",
          recipient_email: RECIPIENT,
          status: "failed",
          error_message: errorMsg.slice(0, 1000),
        });
        if (logError) console.error("Failed to record contact email log", { code: logError.code, message: logError.message });
      } catch {
        console.error("Failed to record contact email failure");
      }
      throw new Error("Unable to send your request. Please try again or call 1-888-869-1679.");
    }

    return { ok: true };
  });
