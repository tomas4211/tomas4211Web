// ─── English dictionary ─────────────────────────────────────────────────────

import type { Dict } from './es';

export const en: Dict = {
  lang: 'en' as const,

  nav: {
    status: 'SYS.READY',
    execLabel: 'Executive',
    labsLabel: 'Labs',
    langToggle: 'ES',
  },

  hero: {
    role: 'Full-Stack Developer & Project Manager',
    tagline:
      'Full-Stack Developer | Project Manager | Self-taught Enthusiast.\nBuilding scalable solutions and automating environments since August 2022.\nCurrently pursuing TSU in Computer Science (3rd Semester) at IUJO.',
    ctaBtn: '$ Initialize Session',
    agendaBtn: 'Schedule Meeting',
    ctaHint: 'Type fastfetch after opening for specs',
  },

  identity: {
    pm: {
      label: 'Management & Architecture',
      title: 'Technical Leadership',
      description:
        'Technical lead on Credix CRM: multi-tenant architecture & Angular 19 migration.\nFull lifecycle: backlog → REST APIs in Node.js & Python · ICRC-1 on Elementum.',
      tags: ['Angular 19', 'NX Monorepo', 'Node.js', 'FastAPI', 'Scrum', 'CI/CD'],
    },
    cli: {
      label: 'Automation & Labs',
      title: 'Terminal Ninja',
      description:
        'AI & Python: Samsung Innovation Campus — Mango Brains project.\nLinux (Debian/Fedora) · Bash scripting · Telegram bots · Finanve PWA.',
      tags: ['GNU/Linux', 'Bash', 'Python', 'Zsh', 'Neovim', 'Web3'],
    },
  },

  metrics: [
    { val: 'Aug 2022', label: 'Since' },
    { val: 'IUJO S3',  label: 'In Progress' },
    { val: '×2',       label: 'GitHub Identities' },
  ],

  featuredProjects: {
    heading: 'Featured Projects',
    items: [
      {
        id: 'upcambios',
        title: 'UpCambios Venezuela',
        subtitle: 'Comprehensive Exchange Desk Platform',
        mediaType: 'image',
        image: '/screenshots/upcambios-screenshot.png',
        url: 'https://upcambiosve.com',
        cta: 'Visit Platform',
        tech: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS S3 / R2'],
        features: [
          { icon: 'shield', title: 'Rigorous KYC Flow', desc: 'Secure ID & Selfie upload directly to private Object Storage.' },
          { icon: 'server', title: 'Banking-Grade Admin', desc: 'Pre-signed URLs with 5-minute expiration for secure auditing.' },
          { icon: 'cloud', title: 'Serverless QA Optimization', desc: 'Zero-cost, scalable testing environment for client review.' },
          { icon: 'activity', title: 'Unified Production', desc: 'VPS + Nginx + PM2 + Cloudflare (WAF/SSL) for maximum security.' }
        ]
      },
      {
        id: 'credix-web',
        title: 'Credix Web',
        subtitle: 'Full Refactor: React → Angular',
        mediaType: 'image',
        image: '/screenshots/credix-web-screenshot.png',
        url: 'https://credix.net',
        cta: 'Visit Platform',
        tech: ['Angular 19', 'NX Monorepo', 'TypeScript', 'TailwindCSS'],
        features: [
          { icon: 'shield', title: 'Complex Forms', desc: 'Dynamic forms strictly adapted to the business model.' },
          { icon: 'server', title: 'Scalable Architecture', desc: 'Migration to NX Monorepo for shared libraries.' },
          { icon: 'cloud', title: 'Optimized Performance', desc: 'Significant improvement in LCP and load times.' },
          { icon: 'activity', title: 'Integrated SSO', desc: 'Centralized authentication and secure session handling.' }
        ]
      },
      {
        id: 'crm',
        title: 'Advanced CRM System',
        subtitle: 'Multi-Tenant & Multi-Currency Management',
        mediaType: 'image',
        image: '/screenshots/credix-crm/credix-crm-3.png',
        url: '#',
        cta: 'Internal Use',
        tech: ['Angular', 'Node.js', 'PostgreSQL', 'RBAC'],
        features: [
          { icon: 'shield', title: 'Multi-tenant Architecture', desc: 'Secure data isolation per client company.' },
          { icon: 'server', title: 'Multi-currency Support', desc: 'Native conversions and financial reporting.' },
          { icon: 'cloud', title: 'Sales Funnel', desc: 'Visual pipeline for lead management and tracking.' },
          { icon: 'activity', title: 'Access Control (RBAC)', desc: 'Modularity structured by departments and roles.' }
        ]
      },
      {
        id: 'finance-pwa',
        title: 'Finance PWA App',
        subtitle: 'Financial Progressive Web App',
        mediaType: 'video',
        video: '/screenshots/finance_PWA_screenshot.mp4',
        image: '',
        url: '#',
        cta: 'Private Repo',
        isGithub: true,
        tech: ['React', 'TypeScript', 'PWA', 'TailwindCSS'],
        features: [
          { icon: 'activity', title: 'Offline-First', desc: 'Data synchronization using Service Workers.' },
          { icon: 'server', title: 'State Management', desc: 'Scalable architecture for financial flows.' },
          { icon: 'cloud', title: 'Installable', desc: 'Native-like experience on mobile and desktop.' },
          { icon: 'shield', title: 'Security', desc: 'Encrypted storage for local information.' }
        ]
      },
      {
        id: 'mango-brains',
        title: 'Mango Brains',
        subtitle: 'EEG (Electroencephalogram) Analyzer',
        mediaType: 'code',
        image: '',
        url: 'https://github.com/RyuTsuki08/mango_brains',
        cta: 'View Repository',
        isGithub: true,
        tech: ['Python', 'Flask', 'Plotly / Seaborn', 'TailwindCSS'],
        features: [
          { icon: 'server', title: 'Brainwave Analysis', desc: 'Processing of brain activity patterns and emotional states.' },
          { icon: 'activity', title: 'Data Visualization', desc: 'Complex interactive charting using Plotly and Matplotlib.' },
          { icon: 'cloud', title: 'Web Architecture', desc: 'Flask server with Jinja2 for dynamic template rendering.' },
          { icon: 'shield', title: 'Research Backed', desc: 'Validated against clinical study datasets from UC Berkeley.' }
        ]
      },
      {
        id: 'cabiri',
        title: 'Project Cabiri',
        subtitle: 'Predictive AI with LSTM Networks',
        mediaType: 'code',
        image: '',
        url: 'https://github.com/i1-KP/Proyecto_Cabiri',
        cta: 'View Repository',
        isGithub: true,
        tech: ['Python', 'TensorFlow', 'Keras', 'LSTM'],
        features: [
          { icon: 'activity', title: 'Deep Learning', desc: 'Bidirectional LSTM neural networks and BatchNormalization.' },
          { icon: 'server', title: 'Sequence Processing', desc: 'Character-level tokenization for NLP analysis.' },
          { icon: 'shield', title: 'Cybersecurity App', desc: 'Analysis and generation of vulnerable passwords.' },
          { icon: 'cloud', title: 'Recursive Inference', desc: 'Iterative prediction and heuristic cracking algorithms.' }
        ]
      }
    ]
  },

  milestones: {
    heading: 'milestones',
    items: {
      credix_migration: {
        title: 'Credix Migration',
        subtitle: 'Angular 19 · Multi-tenant SSO',
        description:
          'Led the critical migration from Angular 14 → 19 on an enterprise fintech platform with multi-tenant architecture and automated component pipeline. 40% build time reduction.',
        metric: '+40% build speed',
      },
      finanve_pwa: {
        title: 'Finanve PWA',
        subtitle: 'Astro · Offline-first · BCV live rates',
        description:
          'Architected a Progressive Web App for financial management with real-time Venezuelan exchange rates and offline-first IndexedDB storage.',
        metric: '98 Lighthouse',
      },
      elementum_web3: {
        title: 'Elementum Web3',
        subtitle: 'Motoko · ICP · Zero gas fees',
        description:
          'Decentralized finance protocol on the Internet Computer Protocol with on-chain canister logic and Internet Identity for decentralized authentication.',
        metric: '100% on-chain',
      },
    },
  },

  github: {
    heading: 'Unified GitHub',
    execBadge: '· Executive',
    labsBadge: '· Personal Labs',
    noDescription: 'No description provided.',
  },

  agenda: {
    title1: 'Schedule',
    title2: 'Deployment',
    desc: 'Select a slot on my calendar to discuss your next project, high-level integrations, or system architecture.',
    btn: 'Schedule Meeting',
  },

  education: {
    heading: 'Formation',
    items: [
      {
        institution: 'IUJO (Instituto Universitario Jesús Obrero)',
        degree: 'TSU in Computer Science — 3rd Semester (Active)',
        year: 'In Progress',
      },
      {
        institution: 'Samsung Innovation Campus',
        degree: 'AI & Python Diploma',
        year: '2023',
      },
    ],
    cta: {
      title: 'Ready for Deployment',
      body: 'Available for high-stakes projects requiring both strong management and deep technical rigor.',
    },
  },

  footer: {
    copyright: '© 2026 Christian Paez // v2.0.0-NINJA',
    pmStatus: '● PM : ACTIVE',
    cliStatus: '● CLI: ONLINE',
  },

  terminal: {
    bootMsg: 'Christian_Paez_OS v2026 — zsh 5.9 + Oh My Posh 23',
    bootHint: 'Type help for commands. ↑↓ to navigate history.',
    langReboot: (target: string) =>
      `[SYSTEM] Switching language to ${target.toUpperCase()}... Rebooting interface...`,
    unknownCmd: (cmd: string) =>
      `zsh: command not found: ${cmd}. Type help for options.`,

    whoami: {
      user: 'Christian Paez',
      role: 'Full-Stack Developer & Project Manager | Self-taught Enthusiast',
      location: 'Caracas, Venezuela 🇻🇪',
      since: 'August 2022',
      status: 'Active Student — TSU Computer Science at IUJO (3rd Semester)',
      github: 'tomas4211 / RyuTsuki08',
    },

    ls: {
      execTitle: '📁 Executive Architecture [tomas4211]',
      labsTitle: '📁 Personal Labs [RyuTsuki08]',
      hint: 'Use cat [project].md for details.',
    },

    fastfetch: {
      os: 'Christian_Paez_OS v2026 x86_64',
      host: 'Caracas, Venezuela',
      shell: 'Zsh + Oh My Posh (Cyberpunk theme)',
      editor: 'Neovim / VSCode',
      de: 'No GUI — Pure CLI 😈',
      education: 'IUJO – TSU in Computer Science (3rd Semester, Active)',
      certs: 'Samsung AI & Python Diploma',
      stack: 'Angular · Astro · Motoko · Linux',
    },

    projects: {
      credix_migration: {
        name: 'Credix_Migration',
        summary:
          'Enterprise Angular 14 → 19 migration with multi-tenant architecture and SSO. Automated pipeline for 50+ components.',
        highlights: [
          '40% build time reduction with esbuild',
          'Multi-tenant SSO implementation',
          'Automated migration scripts for 50+ components',
          'Performance audit: LCP improved by 2.1s',
        ],
      },
      finanve_pwa: {
        name: 'Finanve_PWA',
        summary:
          'Progressive Web App for financial management with offline-first architecture and real-time BCV rate scraping.',
        highlights: [
          'Offline-first with full CRUD via IndexedDB',
          'BCV (Venezuelan bank) real-time exchange rate scraping',
          'Banesco TXT import parser',
          'Lighthouse score: 98/100',
        ],
      },
      elementum_web3: {
        name: 'Elementum_Web3',
        summary:
          'DeFi protocol on the Internet Computer Protocol with on-chain Motoko canister logic and Internet Identity.',
        highlights: [
          'On-chain canister logic with Motoko',
          'Candid interface for cross-chain calls',
          'Decentralized identity (Internet Identity)',
          'Zero gas fees via ICP subsidized cycles',
        ],
      },
      dotfiles: {
        name: 'Dotfiles',
        summary:
          'Personal GNU/Linux environment configuration and automation scripts. Cyberpunk Oh My Posh theme.',
        highlights: [
          'Oh My Posh custom Cyberpunk theme',
          'Neovim as primary IDE with LSP config',
          'Automated dotfiles installer script',
          'Aliases, functions & custom prompt',
        ],
      },
    },

    help: {
      title: 'christian@paez-os:~ — Available commands:',
      commands: [
        ['whoami', 'Show identity & profile'],
        ['ls', 'List all projects'],
        ['cat [project].md', 'Read project executive summary'],
        ['fastfetch / neofetch', 'System specs & ASCII art'],
        ['cd [dir]', 'Navigate directories (virtual)'],
        ['lang [es|en]', 'Switch interface language'],
        ['clear', 'Clear the terminal'],
        ['exit', 'Close terminal window'],
      ],
    },
  },
};
