import { Router } from 'express';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';

const router = Router();

// Max 10 submissions per hour per IP — the form sends through Virginie's
// authenticated IONOS mailbox, so this is purely anti-spam (not an open relay).
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'too_many_requests' },
});

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(200).optional().default(''),
  message: z.string().trim().min(1).max(5000),
  website: z.string().max(200).optional(), // honeypot — must stay empty
});

let cached = null;
function getTransporter() {
  if (cached) return cached;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT) || 587;
  cached = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 465 = implicit TLS, 587 = STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    // Fail fast: without these, a stuck SMTP connection would hang the
    // request (and the visitor's form) indefinitely.
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
  return cached;
}

router.post('/', limiter, async (req, res) => {
  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_input' });

  const { name, email, company, message, website } = parsed.data;

  // Honeypot tripped → pretend success, send nothing.
  if (website) return res.json({ ok: true });

  const tx = getTransporter();
  if (!tx) {
    console.warn('[contact] SMTP not configured (set SMTP_HOST/SMTP_USER/SMTP_PASS)');
    return res.status(503).json({ error: 'email_not_configured' });
  }

  const to = process.env.CONTACT_TO || process.env.SMTP_USER;
  try {
    await tx.sendMail({
      // From must be the authenticated mailbox (IONOS requirement).
      from: `"${name} — via le site" <${process.env.SMTP_USER}>`,
      to,
      replyTo: `"${name}" <${email}>`, // reply goes straight to the visitor
      subject: `Nouveau message du site${company ? ` — ${company}` : ''} (${name})`,
      text:
        `Nom : ${name}\n` +
        `Email : ${email}\n` +
        `Entreprise : ${company || '—'}\n` +
        `\n${message}\n`,
    });
    res.json({ ok: true });
  } catch (err) {
    // err.code helps pinpoint the cause: ETIMEDOUT/ECONNECTION = réseau/host,
    // EAUTH (535) = identifiants, EENVELOPE = adresse From/To refusée.
    console.error('[contact] send failed:', err.code || '', err.message);
    res.status(502).json({ error: 'send_failed' });
  }
});

export default router;
