// ─── Spanish dictionary ────────────────────────────────────────────────────

export const es = {
  lang: 'es' as const,

  // Navbar
  nav: {
    status: 'SIS.LISTO',
    execLabel: 'Ejecutivo',
    labsLabel: 'Laboratorio',
    langToggle: 'EN',
  },

  // Hero
  hero: {
    role: 'Full-Stack Developer & Project Manager',
    tagline:
      'Desarrollador Full-Stack | Project Manager | Entusiasta Autodidacta.\nConstruyendo soluciones escalables y automatizando entornos desde agosto de 2022.\nActualmente cursando el 3er semestre de TSU en Informática en el IUJO.',
    ctaBtn: '$ Iniciar Sesión',
    ctaHint: 'Escribe fastfetch después de abrir para ver las specs',
  },

  // Identity cards
  identity: {
    pm: {
      label: 'Gestión & Arquitectura',
      title: 'Liderazgo Técnico',
      description:
        'Liderazgo en Credix CRM: arquitectura multi-tenant y migración a Angular 19.\nCiclo completo: backlog → APIs REST en Node.js y Python · ICRC-1 en Elementum.',
      tags: ['Angular 19', 'NX Monorepo', 'Node.js', 'FastAPI', 'Scrum', 'CI/CD'],
    },
    cli: {
      label: 'Automatización & Labs',
      title: 'Ninja de la Terminal',
      description:
        'IA & Python: Samsung Innovation Campus — Mango Brains.\nLinux (Debian/Fedora) · Bash scripting · Bots Telegram · Finanve PWA.',
      tags: ['GNU/Linux', 'Bash', 'Python', 'Zsh', 'Neovim', 'Web3'],
    },
  },

  // Metrics
  metrics: [
    { val: 'Ago 2022', label: 'Trayectoria' },
    { val: 'IUJO S3',  label: 'En curso' },
    { val: '×2',       label: 'Identidades GitHub' },
  ],

  // Milestones section
  milestones: {
    heading: 'hitos',
    items: {
      credix_migration: {
        title: 'Migración Credix',
        subtitle: 'Angular 19 · SSO Multi-tenant',
        description:
          'Lideré la migración crítica de Angular 14 → 19 en una plataforma fintech enterprise con arquitectura multi-tenant y pipeline automatizado de componentes. Reducción del 40% en tiempo de build.',
        metric: '+40% velocidad',
      },
      finanve_pwa: {
        title: 'Finanve PWA',
        subtitle: 'Astro · Offline-first · Tasas BCV en vivo',
        description:
          'Arquitecté una Progressive Web App para gestión financiera con tasas de cambio venezolanas en tiempo real y almacenamiento IndexedDB offline-first.',
        metric: '98 Lighthouse',
      },
      elementum_web3: {
        title: 'Elementum Web3',
        subtitle: 'Motoko · ICP · Sin comisiones de gas',
        description:
          'Protocolo DeFi en el Internet Computer Protocol con lógica de canister on-chain e Internet Identity para autenticación descentralizada.',
        metric: '100% on-chain',
      },
    },
  },

  // GitHub section
  github: {
    heading: 'GitHub Unificado',
    execBadge: '· Ejecutivo',
    labsBadge: '· Laboratorio Personal',
    noDescription: 'Sin descripción.',
  },

  // Education
  education: {
    heading: 'Formación',
    items: [
      {
        institution: 'IUJO (Instituto Universitario Jesús Obrero)',
        degree: 'TSU en Informática — 3er Semestre (Activo)',
        year: 'En curso',
      },
      {
        institution: 'Samsung Innovation Campus',
        degree: 'Diplomado en Inteligencia Artificial & Python',
        year: '2023',
      },
    ],
    cta: {
      title: 'Listo para Despliegue',
      body: 'Disponible para proyectos de alto impacto que requieran gestión profesional y profunda rigurosidad técnica.',
    },
  },

  // Footer
  footer: {
    copyright: '© 2026 Christian Paez // v2.0.0-NINJA',
    pmStatus: '● PM : ACTIVO',
    cliStatus: '● CLI: EN LÍNEA',
  },

  // Terminal strings
  terminal: {
    bootMsg: 'Christian_Paez_OS v2026 — zsh 5.9 + Oh My Posh 23',
    bootHint: 'Escribe help para ver comandos. ↑↓ para navegar historial.',
    langReboot: (target: string) =>
      `[SISTEMA] Cambiando idioma a ${target.toUpperCase()}... Reiniciando interfaz...`,
    unknownCmd: (cmd: string) =>
      `zsh: comando no encontrado: ${cmd}. Escribe help para opciones.`,

    whoami: {
      user: 'Christian Paez',
      role: 'Full-Stack Developer & Project Manager | Entusiasta Autodidacta',
      location: 'Caracas, Venezuela 🇻🇪',
      since: 'agosto 2022',
      status: 'Estudiante Activo — TSU Informática IUJO (3er Semestre)',
      github: 'tomas4211 / RyuTsuki08',
    },

    ls: {
      execTitle: '📁 Arquitectura Ejecutiva [tomas4211]',
      labsTitle: '📁 Laboratorio Personal [RyuTsuki08]',
      hint: 'Usa cat [proyecto].md para detalles.',
    },

    fastfetch: {
      os: 'Christian_Paez_OS v2026 x86_64',
      host: 'Caracas, Venezuela',
      shell: 'Zsh + Oh My Posh (Cyberpunk theme)',
      editor: 'Neovim / VSCode',
      de: 'Sin GUI — Puro CLI 😈',
      education: 'IUJO – TSU en Informática (3er Semestre, Activo)',
      certs: 'Samsung IA & Python Diplomado',
      stack: 'Angular · Astro · Motoko · Linux',
    },

    projects: {
      credix_migration: {
        name: 'Credix_Migration',
        summary:
          'Migración enterprise de Angular 14 a 19 con arquitectura multi-tenant y SSO. Pipeline automatizado para 50+ componentes.',
        highlights: [
          '40% reducción en tiempo de build con esbuild',
          'Implementación de SSO multi-tenant',
          'Scripts automáticos para 50+ componentes',
          'Auditoría de rendimiento: LCP mejorado 2.1s',
        ],
      },
      finanve_pwa: {
        name: 'Finanve_PWA',
        summary:
          'Progressive Web App para gestión financiera con arquitectura offline-first y scraping de tasas BCV en tiempo real.',
        highlights: [
          'Offline-first con CRUD completo via IndexedDB',
          'Tasas del BCV (banco venezolano) en tiempo real',
          'Parser de importación TXT Banesco',
          'Lighthouse score: 98/100',
        ],
      },
      elementum_web3: {
        name: 'Elementum_Web3',
        summary:
          'Protocolo DeFi en el Internet Computer Protocol con lógica de canister on-chain en Motoko e Internet Identity.',
        highlights: [
          'Lógica de canister on-chain con Motoko',
          'Interfaz Candid para llamadas cross-chain',
          'Identidad descentralizada (Internet Identity)',
          'Cero comisiones de gas via ciclos ICP',
        ],
      },
      dotfiles: {
        name: 'Dotfiles',
        summary:
          'Configuración del entorno GNU/Linux personal y scripts de automatización. Tema Cyberpunk para Oh My Posh.',
        highlights: [
          'Tema Cyberpunk personalizado en Oh My Posh',
          'Neovim como IDE principal con configuración LSP',
          'Script instalador automatizado de dotfiles',
          'Aliases, funciones y prompt personalizado',
        ],
      },
    },

    help: {
      title: 'christian@paez-os:~ — Comandos disponibles:',
      commands: [
        ['whoami', 'Mostrar identidad y perfil'],
        ['ls', 'Listar todos los proyectos'],
        ['cat [proyecto].md', 'Leer resumen ejecutivo del proyecto'],
        ['fastfetch / neofetch', 'Specs del sistema y arte ASCII'],
        ['cd [dir]', 'Navegar directorios (virtual)'],
        ['lang [es|en]', 'Cambiar idioma de la interfaz'],
        ['clear', 'Limpiar la terminal'],
        ['exit', 'Cerrar ventana'],
      ],
    },
  },
} as const;

// Utility: widen all readonly/literal types to their mutable base
// so the EN dictionary can use different strings and mutable arrays.
type Deepen<T> =
  T extends (...args: infer A) => infer R   ? (...args: A) => R      :
  T extends ReadonlyArray<infer U>           ? Deepen<U>[]            :
  T extends object                           ? { [K in keyof T]: Deepen<T[K]> } :
  T extends string                           ? string                 :
  T;

export type Dict = Deepen<typeof es>;
