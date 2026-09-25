import { createFileRoute } from "@tanstack/react-router";
import { Check, Clipboard, Code2, Download, ImageDown, Mail, Phone } from "lucide-react";
import { toBlob, toPng } from "html-to-image";
import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { upskillLogoDataUrl } from "@/assets/upskill-logo-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Email Signature Generator | Upskill Educational Initiative" },
      { name: "description", content: "Create an official Upskill Educational Initiative staff email signature." },
      { property: "og:title", content: "Upskill Educational Initiative Email Signature Generator" },
      { property: "og:description", content: "Create an official, email-ready staff signature in moments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Details = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
};

type Spacing = "compact" | "balanced" | "relaxed";

const SPACING_OPTIONS: Array<{ value: Spacing; label: string }> = [
  { value: "compact", label: "Compact" },
  { value: "balanced", label: "Balanced" },
  { value: "relaxed", label: "Relaxed" },
];

const SPACING_VALUES: Record<Spacing, { logoPadding: string; contentPadding: string; titleMargin: number; itemMargin: number; disclaimerPadding: number }> = {
  compact: { logoPadding: "2px 16px 2px 0", contentPadding: "0 0 0 16px", titleMargin: 7, itemMargin: 2, disclaimerPadding: 10 },
  balanced: { logoPadding: "4px 20px 4px 0", contentPadding: "2px 0 2px 20px", titleMargin: 12, itemMargin: 4, disclaimerPadding: 14 },
  relaxed: { logoPadding: "8px 24px 8px 0", contentPadding: "5px 0 5px 24px", titleMargin: 17, itemMargin: 7, disclaimerPadding: 19 },
};

const WEBSITE_URL = "https://www.upskillinitiative.org/"; // Update the official website here.
const ADDRESS = "2 Ibeju-Lekki Street, Dolphin Estate, Ikoyi, Lagos, Nigeria";
const DISCLAIMER = "This email and any attachments are confidential and intended solely for the named recipient.";
const EMAIL_DOMAIN = "@upskillinitiative.org";
// This permanent public URL works in the app and pasted signatures on any hosting provider.
const LOGO_URL = "https://upskillsignature.lovable.app/__l5e/assets-v1/2727d634-baeb-42e5-8855-193d388e7589/upskill-logo-full.png";
const ICON_BASE_URL = "https://upskillsignature.lovable.app/signature-icons";
const PREVIEW_ICON_BASE_URL = "/signature-icons";

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);

function buildSignature(details: Details, logoUrl: string, spacing: Spacing, iconBaseUrl = ICON_BASE_URL) {
  const name = escapeHtml(details.fullName.trim() || "Your Full Name");
  const title = escapeHtml(details.jobTitle.trim() || "Job Title");
  const email = escapeHtml(details.email.trim() || `name${EMAIL_DOMAIN}`);
  const phone = escapeHtml(details.phone.trim());
  const phoneHref = details.phone.replace(/[^+\d]/g, "");
  const space = SPACING_VALUES[spacing];

  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border-spacing:0;font-family:Arial,Helvetica,sans-serif;color:#201E56;max-width:620px;width:100%;"><tbody style="font-family:Arial,Helvetica,sans-serif;"><tr style="font-family:Arial,Helvetica,sans-serif;"><td style="width:182px;padding:${space.logoPadding};vertical-align:top;border-right:3px solid #0388A6;font-family:Arial,Helvetica,sans-serif;"><a href="${WEBSITE_URL}" target="_blank" style="display:inline-block;text-decoration:none;font-family:Arial,Helvetica,sans-serif;"><img src="${logoUrl}" width="166" alt="Upskill Educational Initiative" style="display:block;width:166px;max-width:166px;height:auto;border:0;outline:none;text-decoration:none;" /></a></td><td style="padding:${space.contentPadding};vertical-align:top;font-family:Arial,Helvetica,sans-serif;"><p style="margin:0 0 3px 0;font-family:Arial,Helvetica,sans-serif;font-size:20px;line-height:25px;font-weight:700;color:#201E56;">${name}</p><p style="margin:0 0 ${space.titleMargin}px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;font-weight:700;color:#0388A6;">${title}</p><p style="margin:0 0 ${space.itemMargin}px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#201E56;"><img src="${iconBaseUrl}/email.png" width="14" height="14" alt="" style="display:inline-block;width:14px;height:14px;margin:0 7px 0 0;border:0;vertical-align:-2px;" /><a href="mailto:${email}" style="font-family:Arial,Helvetica,sans-serif;color:#201E56;text-decoration:none;">${email}</a></p>${phone ? `<p style="margin:0 0 ${space.itemMargin}px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#201E56;"><img src="${iconBaseUrl}/phone.png" width="14" height="14" alt="" style="display:inline-block;width:14px;height:14px;margin:0 7px 0 0;border:0;vertical-align:-2px;" /><a href="tel:${phoneHref}" style="font-family:Arial,Helvetica,sans-serif;color:#201E56;text-decoration:none;">${phone}</a></p>` : ""}<p style="margin:0 0 ${space.itemMargin + 5}px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#201E56;"><img src="${iconBaseUrl}/website.png" width="14" height="14" alt="" style="display:inline-block;width:14px;height:14px;margin:0 7px 0 0;border:0;vertical-align:-2px;" /><a href="${WEBSITE_URL}" target="_blank" style="font-family:Arial,Helvetica,sans-serif;color:#201E56;text-decoration:none;">www.upskillinitiative.org</a></p><p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;color:#506070;">${ADDRESS}</p></td></tr><tr style="font-family:Arial,Helvetica,sans-serif;"><td colspan="2" style="padding:${space.disclaimerPadding}px 0 0 0;font-family:Arial,Helvetica,sans-serif;"><p style="margin:0;padding-top:9px;border-top:1px solid #B4E1FF;font-family:Arial,Helvetica,sans-serif;font-size:9px;line-height:14px;color:#6B7280;">${DISCLAIMER}</p></td></tr></tbody></table>`;
}

function Index() {
  const [details, setDetails] = useState<Details>({ fullName: "", jobTitle: "", email: "", phone: "" });
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [notice, setNotice] = useState("");
  const [spacing, setSpacing] = useState<Spacing>("balanced");
  const previewRef = useRef<HTMLDivElement>(null);
  const signatureHtml = useMemo(() => buildSignature(details, LOGO_URL, spacing), [details, spacing]);
  const previewHtml = useMemo(() => buildSignature(details, upskillLogoDataUrl, spacing, PREVIEW_ICON_BASE_URL), [details, spacing]);
  const requiredComplete = Boolean(details.fullName.trim() && details.jobTitle.trim() && details.email.trim());
  const emailValid = /^[A-Z0-9._%+-]+@upskillinitiative\.org$/i.test(details.email.trim());
  const canGenerate = requiredComplete && emailValid;

  const update = (key: keyof Details, value: string) => setDetails((current) => ({ ...current, [key]: value }));
  const announce = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const copyRichSignature = async () => {
    if (!canGenerate || !previewRef.current) return;
    try {
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
        await navigator.clipboard.write([new ClipboardItem({ "text/html": new Blob([signatureHtml], { type: "text/html" }), "text/plain": new Blob([previewRef.current.innerText], { type: "text/plain" }) })]);
      } else {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(previewRef.current);
        selection?.removeAllRanges();
        selection?.addRange(range);
        document.execCommand("copy");
        selection?.removeAllRanges();
      }
      announce("Signature copied. Paste it into your email settings.");
    } catch {
      announce("Copy was blocked. Please try again.");
    }
  };

  const copyHtml = async () => {
    if (!canGenerate) return;
    try {
      await navigator.clipboard.writeText(signatureHtml);
      announce("HTML code copied.");
    } catch {
      announce("Copy was blocked. Please try again.");
    }
  };

  const downloadHtml = () => {
    if (!canGenerate) return;
    const documentHtml = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(details.fullName)} — Email Signature</title></head><body>${signatureHtml}</body></html>`;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([documentHtml], { type: "text/html" }));
    link.download = `${details.fullName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")}-email-signature.html`;
    link.click();
    URL.revokeObjectURL(link.href);
    announce("Signature file downloaded.");
  };

  const downloadPng = async () => {
    if (!canGenerate || !previewRef.current) return;
    try {
      const preview = previewRef.current;
      const images = Array.from(preview.querySelectorAll("img"));
      await Promise.all(
        images.map(async (image) => {
          if (image.complete) {
            await image.decode().catch(() => undefined);
            return;
          }
          await new Promise<void>((resolve) => {
            image.addEventListener("load", () => resolve(), { once: true });
            image.addEventListener("error", () => resolve(), { once: true });
          });
        }),
      );
      await document.fonts?.ready;

      const exportOptions = {
        backgroundColor: "#ffffff",
        cacheBust: true,
        pixelRatio: 2,
        style: { padding: "24px" },
      };
      const blob = await toBlob(preview, exportOptions);
      const link = document.createElement("a");
      link.href = blob ? URL.createObjectURL(blob) : await toPng(preview, exportOptions);
      link.download = `${details.fullName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")}-email-signature.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      if (blob) window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
      announce("PNG signature downloaded.");
    } catch {
      announce("PNG download failed. Please try again.");
    }
  };

  const fields: Array<{ key: keyof Details; label: string; placeholder: string; type?: string; required?: boolean }> = [
    { key: "fullName", label: "Full name", placeholder: "e.g. Ada Okafor", required: true },
    { key: "jobTitle", label: "Job title", placeholder: "e.g. Program Manager", required: true },
    { key: "email", label: "Work email", placeholder: `name${EMAIL_DOMAIN}`, type: "email", required: true },
    { key: "phone", label: "Direct phone / WhatsApp", placeholder: "+234 800 000 0000", type: "tel" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-5 sm:px-8">
          <div className="flex h-[68px] w-[174px] shrink-0 items-center justify-center rounded-md bg-card px-3 py-2 shadow-signature sm:w-[196px]"><img src={upskillLogoDataUrl} alt="Upskill Educational Initiative" className="h-full w-full object-contain" /></div>
          <div><p className="text-sm font-semibold text-brand-cyan">Upskill Educational Initiative</p><h1 className="text-xl font-bold sm:text-2xl">Email Signature Generator</h1></div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[minmax(300px,0.72fr)_minmax(520px,1.28fr)] lg:items-start lg:px-8 lg:py-12">
        <section aria-labelledby="details-heading" className="min-w-0">
          <div className="mb-7"><p className="mb-2 text-xs font-bold uppercase text-secondary">Staff details</p><h2 id="details-heading" className="text-2xl font-bold text-foreground">Build your signature</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Enter your work details. Your signature updates as you type.</p></div>
          <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
            {fields.map((field) => {
              const emailError = field.key === "email" && touchedEmail && details.email !== "" && !emailValid;
              return <div key={field.key}>
                <label htmlFor={field.key} className="mb-2 block text-sm font-semibold text-foreground">{field.label}{field.required && <span className="ml-1 text-secondary" aria-hidden="true">*</span>}</label>
                <input id={field.key} value={details[field.key]} onChange={(event) => update(field.key, event.target.value)} onBlur={() => field.key === "email" && setTouchedEmail(true)} type={field.type ?? "text"} required={field.required} aria-invalid={emailError} aria-describedby={field.key === "email" ? "email-note" : undefined} placeholder={field.placeholder} className="h-12 w-full rounded-md border border-input bg-card px-4 text-[16px] text-foreground outline-none transition focus:border-secondary focus:ring-2 focus:ring-brand-cyan placeholder:text-muted-foreground" />
                {field.key === "email" && <p id="email-note" className={`mt-2 text-xs ${emailError ? "font-semibold text-destructive" : "text-muted-foreground"}`}>{emailError ? `Use your ${EMAIL_DOMAIN} work email.` : `Only ${EMAIL_DOMAIN} addresses are accepted.`}</p>}
              </div>;
            })}
          </form>
        </section>

        <section aria-labelledby="preview-heading" className="min-w-0 lg:sticky lg:top-8">
          <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div className="min-w-0"><p className="mb-2 text-xs font-bold uppercase text-secondary">Live preview</p><h2 id="preview-heading" className="text-2xl font-bold text-foreground">Your email signature</h2></div><span className="hidden shrink-0 items-center gap-1.5 text-xs font-semibold text-muted-foreground sm:flex"><Check className="size-4 text-secondary" /> Email-client ready</span></div>
          <div className="mb-4 grid gap-2 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
            <span className="text-sm font-semibold text-foreground">Content spacing</span>
            <div className="grid grid-cols-3 rounded-md border border-border bg-card p-1" aria-label="Signature content spacing">
              {SPACING_OPTIONS.map((option) => <Button key={option.value} type="button" size="sm" variant={spacing === option.value ? "default" : "ghost"} aria-pressed={spacing === option.value} onClick={() => setSpacing(option.value)} className="px-2">{option.label}</Button>)}
            </div>
          </div>
          <div className="overflow-x-auto rounded-md border border-border bg-preview p-5 shadow-signature sm:p-8"><div ref={previewRef} className="min-w-[500px]" dangerouslySetInnerHTML={{ __html: previewHtml }} /></div>
          {!canGenerate && <p className="mt-3 text-sm text-muted-foreground">Complete all required fields with a valid work email to copy or download.</p>}
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Button type="button" onClick={copyRichSignature} disabled={!canGenerate}><Clipboard className="size-4" /> Copy signature</Button>
            <Button type="button" variant="secondary" onClick={copyHtml} disabled={!canGenerate}><Code2 className="size-4" /> Copy HTML</Button>
            <Button type="button" variant="secondary" onClick={downloadHtml} disabled={!canGenerate}><Download className="size-4" /> HTML</Button>
            <Button type="button" variant="secondary" onClick={downloadPng} disabled={!canGenerate}><ImageDown className="size-4" /> PNG</Button>
          </div>
          <div className="mt-6 grid gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:grid-cols-2"><span className="flex items-center gap-2"><Mail className="size-4 text-secondary" /> Gmail, Outlook & Apple Mail</span><span className="flex items-center gap-2"><Phone className="size-4 text-secondary" /> Phone number is optional</span></div>
        </section>
      </div>
      <div aria-live="polite" aria-atomic="true" className={`fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-md bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-toast transition ${notice ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}><Check className="size-4 text-brand-cyan" />{notice}</div>
    </main>
  );
}
