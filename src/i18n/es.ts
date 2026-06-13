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
    agendaBtn: 'Agendar Reunión',
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

  // Projects Carousel
  featuredProjects: {
    heading: 'Proyectos Destacados',
    items: [
      {
        id: 'upcambios',
        title: 'UpCambios Venezuela',
        subtitle: 'Plataforma Integral para Mesa de Cambio',
        mediaType: 'image',
        image: '/screenshots/upcambios-screenshot.png',
        url: 'https://upcambiosve.com',
        cta: 'Visitar Plataforma',
        tech: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS S3 / R2'],
        features: [
          { icon: 'shield', title: 'Flujo KYC Riguroso', desc: 'Carga segura de Cédula y Selfie a Object Storage privado.' },
          { icon: 'server', title: 'Seguridad Bancaria Admin', desc: 'Pre-signed URLs con caducidad (5 min) para revisar documentos.' },
          { icon: 'cloud', title: 'Optimización QA Serverless', desc: 'Entorno de pruebas escalable y de coste cero para clientes.' },
          { icon: 'activity', title: 'Producción Unificada', desc: 'VPS + Nginx + PM2 + Cloudflare (WAF/SSL) para máxima seguridad.' }
        ]
      },
      {
        id: 'credix-web',
        title: 'Credix Web',
        subtitle: 'Refactorización Completa: React → Angular',
        mediaType: 'image',
        image: '/screenshots/credix-web-screenshot.png',
        url: 'https://credix.net',
        cta: 'Visitar Plataforma',
        tech: ['Angular 19', 'NX Monorepo', 'TypeScript', 'TailwindCSS'],
        features: [
          { icon: 'shield', title: 'Formulario Complejo', desc: 'Formulario dinámico adaptado estrictamente al modelo de negocio.' },
          { icon: 'server', title: 'Arquitectura Escalable', desc: 'Migración a NX Monorepo para compartir librerías.' },
          { icon: 'cloud', title: 'Rendimiento Optimizado', desc: 'Mejora significativa en LCP y tiempos de carga.' },
          { icon: 'activity', title: 'SSO Integrado', desc: 'Autenticación centralizada y manejo de sesiones seguras.' }
        ]
      },
      {
        id: 'crm',
        title: 'Sistema CRM Avanzado',
        subtitle: 'Gestión Multi-Tenant y Multi-Moneda',
        mediaType: 'image',
        image: '/screenshots/credix-crm/credix-crm-3.png',
        url: '#',
        cta: 'Uso Interno',
        tech: ['Angular', 'Node.js', 'PostgreSQL', 'RBAC'],
        features: [
          { icon: 'shield', title: 'Arquitectura Multi-tenant', desc: 'Aislamiento de datos seguro por empresa cliente.' },
          { icon: 'server', title: 'Soporte Multi-moneda', desc: 'Conversiones y reportes financieros nativos.' },
          { icon: 'cloud', title: 'Embudo de Ventas', desc: 'Pipeline visual para gestión y seguimiento de leads.' },
          { icon: 'activity', title: 'Control de Acceso (RBAC)', desc: 'Modularidad estructurada por departamentos y roles.' }
        ]
      },
      {
        id: 'finance-pwa',
        title: 'Finance PWA App',
        subtitle: 'Progressive Web App Financiera',
        mediaType: 'video',
        video: '/screenshots/finance_PWA_screenshot.mp4',
        image: '',
        url: '#',
        cta: 'Repo Privado',
        isGithub: true,
        tech: ['React', 'TypeScript', 'PWA', 'TailwindCSS'],
        features: [
          { icon: 'activity', title: 'Offline-First', desc: 'Sincronización de datos mediante Service Workers.' },
          { icon: 'server', title: 'Gestión de Estado', desc: 'Arquitectura escalable para flujos financieros.' },
          { icon: 'cloud', title: 'Instalable', desc: 'Experiencia nativa en dispositivos móviles y escritorio.' },
          { icon: 'shield', title: 'Seguridad', desc: 'Almacenamiento encriptado de información local.' }
        ]
      },
      {
        id: 'mango-brains',
        title: 'Mango Brains',
        subtitle: 'Analizador de EEG (Electroencefalogramas)',
        mediaType: 'code',
        image: '',
        url: 'https://github.com/RyuTsuki08/mango_brains',
        cta: 'Ver Repositorio',
        isGithub: true,
        tech: ['Python', 'Flask', 'Plotly / Seaborn', 'TailwindCSS'],
        features: [
          { icon: 'server', title: 'Análisis de Ondas', desc: 'Procesamiento de patrones de actividad cerebral y emociones.' },
          { icon: 'activity', title: 'Data Visualization', desc: 'Gráficas complejas interactivas con Plotly y Matplotlib.' },
          { icon: 'cloud', title: 'Arquitectura Web', desc: 'Servidor Flask con Jinja2 para renderizado dinámico.' },
          { icon: 'shield', title: 'Investigación Base', desc: 'Validado con datasets de estudios clínicos de UC Berkeley.' }
        ]
      },
      {
        id: 'cabiri',
        title: 'Proyecto Cabiri',
        subtitle: 'IA Predictiva con Redes LSTM',
        mediaType: 'code',
        image: '',
        url: 'https://github.com/i1-KP/Proyecto_Cabiri',
        cta: 'Ver Repositorio',
        isGithub: true,
        tech: ['Python', 'TensorFlow', 'Keras', 'LSTM'],
        features: [
          { icon: 'activity', title: 'Deep Learning', desc: 'Redes neuronales LSTM bidireccionales y BatchNormalization.' },
          { icon: 'server', title: 'Procesamiento de Secuencias', desc: 'Tokenización a nivel de caracteres para análisis NLP.' },
          { icon: 'shield', title: 'Aplicación en Ciberseguridad', desc: 'Análisis y generación de contraseñas vulnerables.' },
          { icon: 'cloud', title: 'Inferencia Recursiva', desc: 'Predicción iterativa y algoritmos de cracking heurístico.' }
        ]
      }
    ]
  },

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

  // Agenda
  agenda: {
    title1: 'Agendar',
    title2: 'Despliegue',
    desc: 'Selecciona un espacio en mi calendario para discutir tu próximo proyecto, integraciones de alto nivel o arquitectura de sistemas.',
    btn: 'Agendar Reunión',
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
