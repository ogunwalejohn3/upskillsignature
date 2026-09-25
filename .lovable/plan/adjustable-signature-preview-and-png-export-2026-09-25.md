# Adjustable Signature Preview and PNG Export

## Goal
Let staff fine-tune the spacing in their signature, download the finished result as a PNG, and use the newly supplied organization logo everywhere.

## Changes
- Replace the current logo asset with the newly attached full Upskill Educational Initiative logo.
- Add a clear spacing control beside the live preview so users can make signature content more compact or more spacious.
- Apply the chosen spacing consistently to the preview, copied signature, copied HTML, HTML download, and PNG download.
- Add a PNG download action that captures only the finished signature at a crisp resolution.
- Keep the existing staff fields, organization details, email restriction, and copy actions unchanged.

## Technical details
- Store the uploaded logo through the project asset system and use its permanent published address in exported signatures.
- Render the PNG in the browser from the final signature preview using a browser-compatible capture library.
- Preserve email-safe table markup and inline styles for copied and downloaded HTML.
- Verify valid-email gating, spacing changes, logo loading, HTML export, PNG export, and mobile/desktop layout.
