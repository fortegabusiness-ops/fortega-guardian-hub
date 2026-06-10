import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  company: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  service: z.string().min(1).max(120),
  message: z.string().trim().min(10).max(1500),
});

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const messageId = `contact-${crypto.randomUUID()}`;
    const subject = `New contact request from ${data.name} (${data.company})`;
    const html = `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${esc(data.name)}</p>
      <p><strong>Company:</strong> ${esc(data.company)}</p>
      <p><strong>Email:</strong> ${esc(data.email)}</p>
      <p><strong>Phone:</strong> ${esc(data.phone)}</p>
      <p><strong>Service:</strong> ${esc(data.service)}</p>
      <p><strong>Message:</strong></p>
      <p>${esc(data.message).replace(/\n/g, "<br/>")}</p>
    `;
    const text = `New Contact Request\n\nName: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${data.service}\n\nMessage:\n${data.message}`;

    const payload = {
      to: "info@fortega.ca",
      from: "Fortega Website <notify@notify.fortega.ca>",
      sender_domain: "notify.fortega.ca",
      subject,
      html,
      text,
      reply_to: data.email,
      purpose: "transactional",
      label: "contact-form",
      message_id: messageId,
      idempotency_key: messageId,
      queued_at: new Date().toISOString(),
    };

    const { error } = await supabaseAdmin.rpc("enqueue_email", {
      queue_name: "transactional_emails",
      payload,
    });
    if (error) throw new Error(error.message);

    await supabaseAdmin.from("email_send_log").insert({
      message_id: messageId,
      template_name: "contact-form",
      recipient_email: "info@fortega.ca",
      status: "pending",
    });

    return { ok: true };
  });