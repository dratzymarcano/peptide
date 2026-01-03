# Peptide Research E-Commerce Project

This is a high-performance, SEO-optimized Astro website designed for selling research-use-only peptides. It features a static catalog, a client-side enquiry cart, and a serverless backend for handling quote requests.

## Project Structure

*   `src/pages/`: Routes for the website.
    *   `peptides/[slug].astro`: Dynamic product pages generated from content.
    *   `api/enquiry.ts`: Serverless function to handle form submissions.
*   `src/content/products/`: Markdown files containing product data and long-form content.
*   `src/components/`: Reusable UI components (Header, Footer, Cart, etc.).
*   `src/scripts/`: Client-side logic (Cart store using Nano Stores).

## Setup & Local Development

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start Dev Server:**
    ```bash
    npm run dev
    ```

3.  **Build for Production:**
    ```bash
    npm run build
    ```

## Adding Products

1.  Create a new `.md` file in `src/content/products/`.
2.  Follow the frontmatter schema defined in `src/content/config.ts`.
3.  Ensure the `slug` follows the pattern `/peptides/buy-[keyword]`.
4.  Add at least 800 words of research-focused content in the body.

## Configuration

### Environment Variables

Create a `.env` file in the root for local development (and set these in Cloudflare Pages settings for production):

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

### Cloudflare Pages Deployment

1.  Connect your GitHub repository to Cloudflare Pages.
2.  **Build Command:** `npm run build`
3.  **Build Output Directory:** `dist`
4.  **Environment Variables:** Add the Supabase credentials in the dashboard.
5.  **Compatibility Flags:** Ensure `nodejs_compat` is enabled if using specific Node APIs in functions.

## Enquiry Workflow

1.  User adds items to the Enquiry Cart.
2.  User submits the form (requires "Research Use Only" confirmation).
3.  Data is posted to `/api/enquiry`.
4.  Server validates and saves to Supabase `enquiries` table.
5.  **Admin Action:**
    *   Log in to Supabase Dashboard.
    *   Review new rows in `enquiries`.
    *   If approved, manually generate an invoice (PDF) and email it to the customer.
    *   Update status to `approved` or `invoiced`.

## Safety & Compliance

*   **Research Only:** All content must strictly adhere to "Research Use Only" language. No human use claims.
*   **Disclaimer:** The site includes global disclaimers and a mandatory checkbox at checkout.
