// All project content lives in this one file.
// The home page list and every /projects/[slug] page are generated from it.

export type Feature = { title: string; items: string[] };
export type Decision = { title: string; text: string };
export type Shot = { file: string; caption: string };

export type CaseStudy = {
  builtFor: string;
  role: string;
  overview: string[];
  problem: string;
  features: Feature[];
  decisions: Decision[];
  screens?: Shot[];
  learned: string[];
};

export type Project = {
  slug: string;
  name: string;
  year: string;
  summary: string;
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
  cover?: string; // optional file name inside /public/screens
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "canvas-for-a-cause",
    name: "Canvas for a Cause",
    year: "2026",
    summary:
      "A charity art auction for the Pan-Atlantic University Student Council. Bidders sign in and bid on artwork during a set auction window. Admins manage listings, timing and bids from their own dashboard.",
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "FastAPI",
      "SQLAlchemy",
      "Alembic",
      "PostgreSQL",
      "JWT",
      "Cloudinary",
    ],
    repoUrl: "https://github.com/Bojeah/Canvas-for-a-cause",
    cover: "canvas-home.png",
    caseStudy: {
      builtFor: "Pan-Atlantic University Student Council",
      role: "Full-stack developer",
      overview: [
        "Canvas for a Cause is a charity art-auction platform. Registered bidders browse the artwork catalogue, follow the auction window and place bids. Administrators run the whole event from a separate admin area.",
        "It is a React and TypeScript frontend talking to a FastAPI backend. The database is SQLite for local development and PostgreSQL in production.",
      ],
      problem:
        "A live auction only works if people trust it. Bids have to be accepted or refused by clear rules, the clock has to be the same for everyone, and organisers need to see what happened and who did it. A shared spreadsheet or a chat thread cannot give you that. This project puts those rules on the server and gives the council tools to run the auction without a developer on call.",
      features: [
        {
          title: "For bidders",
          items: [
            "Register and log in with a full name, email and password",
            "Browse the artwork catalogue and open each piece",
            "See the current auction window and each artwork's bid status",
            "Place bids that are validated and rate limited on the server",
            "Email notifications where email services are configured",
            "Responsive light and dark interface with network-status feedback",
          ],
        },
        {
          title: "For administrators",
          items: [
            "Separate admin login",
            "Create, edit and delete artwork, with image upload through Cloudinary",
            "Set or close the global auction window",
            "Review every bid and close individual auctions",
            "Audit log of admin and authentication activity",
            "Configurable maximum number of artworks",
          ],
        },
      ],
      decisions: [
        {
          title: "Tokens in HTTP-only cookies",
          text: "The login token is kept in an HTTP-only cookie, so JavaScript on the page cannot read it. That limits the damage if a script ever gets injected.",
        },
        {
          title: "Rules enforced on the server",
          text: "Bid validation and rate limiting run in the API, not in the browser. The browser can be changed by anyone; the server cannot.",
        },
        {
          title: "An audit trail",
          text: "Admin and sign-in actions are written to an audit log, so the council can see who changed what during the event.",
        },
        {
          title: "Migrations from day one",
          text: "Alembic tracks every schema change, and SQLite locally with PostgreSQL in production keeps setup quick without losing a production-grade database.",
        },
      ],
      screens: [
        {
          file: "canvas-home.png",
          caption: "The artwork catalogue as a bidder sees it.",
        },
        {
          file: "canvas-bid.png",
          caption: "An artwork page with the auction window and bid form.",
        },
        {
          file: "canvas-admin.png",
          caption: "The admin dashboard for artwork, bids and auction timing.",
        },
      ],
      learned: [
        "Time rules belong on the server. With one global auction window and individual closing, every bid has to be checked against the clock by the API.",
        "Cookie-based authentication changes how the frontend and the API talk to each other, including credentials and cross-origin settings.",
        "An audit log is cheap to add early and very hard to add after something goes wrong.",
        "Database migrations make a small project feel like a real one: every change is versioned and repeatable.",
      ],
    },
  },
  {
    slug: "cashbubble",
    name: "CashBubble",
    year: "2026",
    summary:
      "A digital disbursement and cash flow management platform built around modular payment vouchers. Senders generate vouchers that recipients can redeem as cash, airtime, mobile data, or electricity without needing a registered account.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Flutter",
      "Paystack",
      "RBAC",
    ],
    liveUrl: "https://www.thecashbubble.com/",
    cover: "cashbubble-main.png",
    caseStudy: {
      builtFor: "CashBubble (Collaborative Product Build)",
      role: "Full-stack & Cross-platform Engineer",
      overview: [
        "CashBubble is a digital disbursement platform centered on modular payment vouchers called cash bubbles. Individuals and organizations fund vouchers and distribute them across multiple channels with strict access governance.",
        "Recipients redeem funds directly into bank accounts, airtime, mobile data, or utility tokens without creating an account first, removing onboarding friction for one-off or bulk payouts.",
      ],
      problem:
        "Sending funds or stipends to multiple recipients often breaks down when recipients lack accounts on a specific fintech app or when senders lack visibility after initiating a transfer. CashBubble solves this by decoupling the payment instrument from user registration while giving senders real-time auditability and control.",
      features: [
        {
          title: "For senders & organizations",
          items: [
            "Generate modular payment vouchers with configurable redemption rules",
            "Fund disbursements via Paystack payment gateway",
            "Role-based access control (RBAC) and multi-factor authentication for team operations",
            "Real-time monitoring and complete audit trails across high-volume disbursements",
          ],
        },
        {
          title: "For recipients",
          items: [
            "Accountless voucher redemption flow on web and mobile",
            "Flexible payout channels: direct bank cash, airtime, mobile data, or electricity",
            "Instant verification and status confirmation upon redemption",
          ],
        },
      ],
      decisions: [
        {
          title: "Accountless redemption architecture",
          text: "Forcing recipients to sign up before claiming funds kills conversion. Tokenized voucher verification lets verified recipients claim payouts immediately while keeping fraud checks server-side.",
        },
        {
          title: "Shared domain rules across Next.js and Flutter",
          text: "Keeping validation, fee calculation, and state transitions consistent across the web dashboard and Flutter mobile app prevents client drift.",
        },
      ],
      screens: [
        {
          file: "cashbubble-main.png",
          caption:
            "CashBubble web interface and voucher disbursement workflow.",
        },
      ],
      learned: [
        "Designing idempotent payment and voucher redemption endpoints so duplicate requests never double-dispense funds.",
        "Coordinating clean feature-branch Git workflows and pixel-accurate UI components across a multi-developer team.",
        "Balancing strict multi-factor governance for senders with a frictionless, zero-account experience for recipients.",
      ],
    },
  },
  {
    slug: "music-chords-emulator",
    name: "Music Chords Emulator",
    year: "2026",
    summary:
      "A Windows app that turns hand gestures into chords. A webcam tracks your hand, where it sits picks the root note, and how many fingers you hold up picks the chord.",
    stack: ["C#", ".NET 10", "ONNX Runtime", "OpenCvSharp", "NAudio"],
    repoUrl: "https://github.com/Bojeah/music_chords_emulator",
    caseStudy: {
      builtFor: "Personal project",
      role: "Solo developer",
      overview: [
        "Music Chords Emulator is a Windows desktop application. It reads the webcam, finds a hand, tracks 21 landmarks on it with ONNX models, and plays the current chord through the default audio output.",
        "The window shows the camera feed with detection overlays, so you can see what the app sees as you move.",
      ],
      problem:
        "Playing a chord normally needs an instrument. This project asks how much of that a webcam and a hand can replace. The hard part is not playing sound. It is turning noisy, jumpy detections into a steady musical result you can control on purpose.",
      features: [
        {
          title: "Detection",
          items: [
            "Real-time webcam hand tracking",
            "Palm detection followed by 21-point hand landmark detection",
            "Landmark smoothing and temporal filtering to reduce unstable detections",
          ],
        },
        {
          title: "Music",
          items: [
            "The palm's horizontal position picks one of 12 root notes, C to B",
            "The number of extended fingers picks the chord quality",
            "Chord audio generated in code with oscillators, with no sample files",
            "On-screen diagnostics for detection, gesture, root, motion and frames",
          ],
        },
      ],
      decisions: [
        {
          title: "Two-step detection",
          text: "Find the palm first, then run landmark detection on that region. It is the same idea as locating a face before reading it.",
        },
        {
          title: "Smoothing before sound",
          text: "Raw detections wobble from frame to frame. Filtering them over time stops the chord flickering between notes.",
        },
        {
          title: "Audio built in code",
          text: "Chords are produced by oscillators at runtime, so any root and any chord quality is available without recording anything.",
        },
      ],
      learned: [
        "Running ONNX models inside a C# application and keeping them fast enough for real time.",
        "Model output is noisy, so filtering over time matters as much as the model itself.",
        "Mapping a continuous input, like hand position, onto discrete musical choices needs clear zones and stable boundaries.",
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const withStudy = projects.filter((p) => p.caseStudy);
  const i = withStudy.findIndex((p) => p.slug === slug);
  return withStudy[(i + 1) % withStudy.length];
}

