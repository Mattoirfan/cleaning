# Netlify Deployment Guide (Using GitHub)

This guide walks you step-by-step through deploying **PureNest Cleaning Co.** to **Netlify** using your **GitHub repository**.

Netlify provides instant global CDN hosting, automatic HTTPS/SSL, continuous deployment on every `git push`, and serverless function support for the backend API.

---

## ⚡ Quick 3-Step Deployment (Easiest Method)

### Step 1: Push Your Project to GitHub

If you haven't already pushed your code to GitHub:

1. Create a new repository on [GitHub](https://github.com/new) (e.g. `purenest-cleaning-website`).
2. In your local terminal inside the project directory, run:
   ```bash
   git init
   git add .
   git commit -m "feat: PureNest Cleaning Co. ready for Netlify deployment"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```

---

### Step 2: Connect GitHub to Netlify

1. Sign up or log in to [Netlify](https://app.netlify.com).
2. On your Netlify team dashboard, click **Add new site** → **Import an existing project**.
3. Select **GitHub** as your Git provider and authorize Netlify.
4. Search for and select your repository: `<YOUR-REPO-NAME>`.
5. Netlify will **automatically detect the pre-configured `netlify.toml`**:
   - **Base directory**: (leave blank / root)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`
6. *(Optional)* Click **Add environment variables** if you want a custom admin passcode:
   - Key: `ADMIN_PASSCODE`
   - Value: `your_secret_passcode` (defaults to `purenest2026` if not set)
7. Click **Deploy `<your-site-name>`**.

That's it! Netlify will pull your code, install dependencies, run the build, and deploy your website to a live URL (e.g., `https://purenest-cleaning.netlify.app`) within 60 seconds.

---

### Step 3: Every Future Push Deploys Automatically

From now on, whenever you push any code change to GitHub:
```bash
git add .
git commit -m "Update service details"
git push origin main
```
Netlify will automatically detect the commit, run the build, and publish the update live with zero downtime.

---

## 🌐 Custom Domain & Free SSL Setup

1. In your Netlify Site dashboard, go to **Site configuration** → **Domain management**.
2. Click **Add a domain** and type your registered domain (e.g., `purenestcleaning.com`).
3. Follow the DNS instructions to point your domain to Netlify:
   - **CNAME record**: Point `www` to your Netlify site URL (e.g., `purenest-cleaning.netlify.app`).
   - **A record**: Point `@` (root apex domain) to `75.2.60.5` (Netlify's load balancer IP).
4. Under **SSL/TLS Certificate**, Netlify will automatically provision a **free Let's Encrypt SSL certificate** for HTTPS.

---

## 🛠️ Included Netlify Configurations

Your project already has everything pre-configured:

| File | Purpose |
| :--- | :--- |
| `netlify.toml` | Declares build command (`npm run build`), publish directory (`dist`), functions, redirects, and security headers. |
| `public/_redirects` | Ensures SPA client-side routing works on refresh without returning 404 errors. |
| `netlify/functions/enquiries.ts` | Serverless endpoint for handling customer quote enquiries (`POST /api/enquiries`). |
| `netlify/functions/admin-auth.ts` | Serverless endpoint for staff portal passcode authentication (`POST /api/admin/auth`). |
| `.github/workflows/deploy.yml` | GitHub Actions CI workflow to verify builds on every pull request and push. |

---

## 🔍 Verification Checklist

After deployment finishes:
- [ ] Open your Netlify URL and verify that all 4 pages (*Home*, *Services*, *About Us*, *Contact Us*) load cleanly.
- [ ] Test page refresh on subpages (`#services`, `#about`, `#contact`) to verify routing.
- [ ] Fill out a test enquiry on the **Contact Us** page to confirm the **Booking Reference ID** generated.
- [ ] Click **Staff Portal** in the header or footer (passcode: `purenest2026`) to verify the management console.
