import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';

const router = Router();

// Le formulaire envoie via l'API transactionnelle Brevo (HTTPS, port 443) :
// Railway bloque les ports SMTP sortants, donc on ne peut pas passer par le
// SMTP IONOS. Brevo (société FR, données en UE) relaie le message vers la
// boîte de Virginie. From = son adresse (à authentifier dans Brevo),
// Reply-To = le visiteur.
const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';
const FROM = process.env.CONTACT_FROM || 'virginie@feedyourhead.fr';
const TO = process.env.CONTACT_TO || FROM;

// Anti-spam : 10 envois/h par IP.
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

router.post('/', limiter, async (req, res) => {
  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_input' });

  const { name, email, company, message, website } = parsed.data;

  // Honeypot tripped → pretend success, send nothing.
  if (website) return res.json({ ok: true });

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn('[contact] BREVO_API_KEY manquante — envoi désactivé');
    return res.status(503).json({ error: 'email_not_configured' });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const r = await fetch(BREVO_ENDPOINT, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { email: FROM, name: 'Feed Your Head — formulaire' },
        to: [{ email: TO }],
        replyTo: { email, name }, // la réponse va droit au visiteur
        subject: `Nouveau message du site${company ? ` — ${company}` : ''} (${name})`,
        textContent:
          `Nom : ${name}\n` +
          `Email : ${email}\n` +
          `Entreprise : ${company || '—'}\n` +
          `\n${message}\n`,
      }),
    });

    if (!r.ok) {
      const detail = await r.text().catch(() => '');
      console.error('[contact] Brevo a refusé:', r.status, detail.slice(0, 300));
      return res.status(502).json({ error: 'send_failed' });
    }
    res.json({ ok: true });
  } catch (err) {
    const reason = err.name === 'AbortError' ? 'timeout' : err.message;
    console.error('[contact] envoi échoué:', reason);
    res.status(502).json({ error: 'send_failed' });
  } finally {
    clearTimeout(timer);
  }
});

export default router;
