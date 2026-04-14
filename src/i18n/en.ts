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
