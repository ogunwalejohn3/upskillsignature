# Upskill Signature Studio

Build a lightweight, responsive, single-page web application for an Internal Email Signature Generator for the organization Upskill Educational Initiative.
________________________________________
Key Requirements:
1.	No Authentication:
o	The tool must be directly accessible via browser link with zero login, sign-up, or user accounts required.
2.	Pre-configured Company Branding (Hardcoded): The following organizational details must be built directly into the template and non-editable by standard staff:
o	Organization Name: Upskill Educational Initiative
o	Official Website: Pre-configured website URL (e.g., clickable text or button pointing to the initiative's official website).
o	Organization Logo: Image placeholder URL styled with fixed dimensions (around 120px–150px wide) suitable for email clients.
o	Official Contact / Address: Pre-filled address and organizational footer/disclaimer text.
•	Color Palette: Dark Navy: #201E56, Deep Teal: #0388A6, Light Cyan: #B4E1F
3.	Dynamic User Inputs (Form Fields): Only give staff inputs for their individual details:
o	Full Name (Required)
o	Job Title (Required)
o	Department / Program Unit (Required)
o	Work Email (Required)
o	Direct Phone Number / WhatsApp
4.	Live Interactive Preview:
o	Two-column layout on desktop (inputs on the left, signature preview on the right) and single-column on mobile.
o	Updates instantly in real-time as the user types into any input field.
5.	Email Client HTML Compatibility (Strict):
o	The generated signature must use HTML <table> layout with inline CSS (style="..." attributes on every element).
o	No CSS Grid, flexbox, or external stylesheet dependencies inside the signature container, ensuring full compatibility across Gmail, Microsoft Outlook (desktop & web), and Apple Mail.
o	Use safe web fonts (e.g., Arial, Helvetica, sans-serif or Segoe UI).
6.	One-Click Copy Features:
o	"Copy Signature" Button: Copies rich formatted HTML directly to the clipboard so staff can simply paste (Ctrl+V / Cmd+V) into their email client's signature box.
o	"Copy HTML Code" Button: Copies raw HTML source for clients requiring code view.
o	A clean success toast/notification confirming the copy action.
________________________________________
Tech Stack:
•	Pure HTML, CSS, and Vanilla JavaScript contained inside a single index.html file so it can be hosted for free on GitHub Pages, Netlify, or Vercel without a backend or database.
Provide the complete, production-ready code with clear comments where the logo image URL and website address can be updated.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://upskillsignature.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/08c5920d-ac82-5d2f-9d1f-a2ed45fd271b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
