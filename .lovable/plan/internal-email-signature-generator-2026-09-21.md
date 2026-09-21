# Internal Email Signature Generator

## Goal
Build a lightweight, responsive signature generator for Upskill Educational Initiative, directly accessible without sign-in.

## Experience
- Present staff-only fields for name, role, department, work email, and phone/WhatsApp.
- Update a desktop two-column/mobile single-column preview instantly as fields change.
- Keep company name, website, address, brand colors, and logo fixed in the generated signature.
- Provide clear required-field states and a polished empty/default preview.

## Signature output
- Generate email-safe table markup with inline styles and safe system fonts only.
- Include clickable website, email, and phone links.
- Copy either rendered rich HTML or the raw source in one click, with success/error notifications.
- Use `https://www.upskillinitiative.org/` for the website and `a clearly marked replaceable logo URL placeholder` for the logo.
- Use the supplied address. Since no disclaimer wording was supplied, use a concise confidentiality notice and identify it as assumed in the completion summary.

## Technical details
- Implement the experience at `/` in the existing app without authentication or persistence.
- Centralize the visual system in semantic Tailwind v4 tokens using the supplied navy, teal, and cyan palette.
- Keep the generated signature itself independent of app styles: table-based markup and inline CSS only.
- Add unique page metadata and verify desktop/mobile rendering plus both clipboard paths where browser permissions allow.
