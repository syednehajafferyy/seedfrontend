# Zaheer Seed Corporation — Frontend

The official Next.js App Router frontend application for **Zaheer Seed Corporation**, an agricultural seed breeding, processing, and distribution company based in Kasur, Pakistan.

---

## 🌾 Features & Highlights

- **Heritage & Agricultural Aesthetic**:
  - Forest Green (`#1F3D2B`), Deep Forest (`#16301F`), Olive Accent (`#6B7340`), Warm Paper (`#FAF7F0`), and Sand (`#EAE2D0`).
  - Typography using **Fraunces** serif and **Source Sans 3**.
- **Hero & Storytelling**:
  - Atmospheric hero banner highlighting seed quality and agricultural heritage.
  - Interactive "About Us" and 4-stage "Our Process" timeline (Breeding, Processing, Handling, Distribution).
- **Seeds Catalogue & Category Filters**:
  - Responsive catalog filtered by crop type (Cereals, Fibre Crops).
  - Individual detail pages (`/seeds/[slug]`) with full crop specifications.
- **Inquiry & Contact Form**:
  - Client-validated contact form with spam protection (honeypot & timing throttle).
  - WhatsApp quick-connect and direct telephone links (`+92 300 6579784`).
- **Decoupled Architecture**:
  - Self-contained frontend with zero database dependency for zero-configuration deployments.
  - Ready to integrate with the backend API (`zaheerbackend`) via `NEXT_PUBLIC_BACKEND_URL`.

---

## 📁 Repository Structure

```text
seedfrontend/
├── public/
│   └── images/             # Crop imagery, hero banner & brand logo
├── src/
│   ├── app/
│   │   ├── (site)/         # Public App Router pages (Home, Seeds, Detail)
│   │   ├── actions/        # Client inquiry submission server action
│   │   ├── globals.css     # Design tokens & animation styles
│   │   └── layout.tsx      # Root layout & Google Fonts integration
│   ├── components/         # UI Components (Header, Footer, Reveal, ContactForm)
│   └── lib/
│       └── data.ts         # Crop seed data model & backend API client
├── design-preview/
│   └── index.html          # Approved static design reference
├── next.config.mjs         # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel deployment preset
└── package.json            # Node.js dependencies
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Deployment on Vercel

1. Push or import this repository into [Vercel](https://vercel.com).
2. Framework Preset: **Next.js** (detected automatically via `vercel.json`).
3. (Optional) Set `NEXT_PUBLIC_BACKEND_URL` in Environment Variables to point to your backend API.
4. Deploy!
