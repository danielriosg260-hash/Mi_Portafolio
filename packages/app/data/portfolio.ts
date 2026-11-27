/**
 * Fuente única de verdad del contenido del portafolio.
 * Tanto la web (Next.js) como la app móvil (Expo) leen de aquí.
 *
 * 👉 EDITA ESTE ARCHIVO PARA CAMBIAR CUALQUIER TEXTO, ENLACE O DATO.
 */

export const PROFILE = {
  name: 'Daniel Ríos Giraldo',
  shortName: 'Daniel',
  initials: 'DR',
  role: 'Desarrollador de Software | Web & Mobile',
  tagline: 'Transformando ideas en soluciones digitales.',
  subtitle:
    'Desarrollo Web · Aplicaciones Móviles · Backend y Bases de Datos · Pruebas de Software',
  location: 'Medellín, Colombia',
  status: 'Desarrollador practicante · Tecnoparque SENA',
  stage: 'Etapa productiva (11 nov 2026 – 10 may 2027)',
  bio: 'Desarrollador de software Full-Stack con experiencia en desarrollo web, aplicaciones móviles, arquitectura de bases de datos y aseguramiento de calidad (QA). Actualmente integro el equipo de desarrollo en Tecnoparque – Nodo SENA, participando en la creación de soluciones tecnológicas escalables. Enfocado en transformar problemas reales en código limpio, funcional y bien estructurado.',
  description:
    'Desarrollando ideas, aprendiendo tecnologías y construyendo soluciones digitales.',
  objective:
    'Continuar desarrollándome profesionalmente en el área de ingeniería y desarrollo de software, fortaleciendo mis conocimientos técnicos y adquiriendo experiencia en la construcción de aplicaciones web, móviles y soluciones tecnológicas que respondan a necesidades reales.',
}

export const CONTACT = {
  email: 'danielriosg260@gmail.com',
  github: 'https://github.com/danielriosg260-hash',
  linkedin: 'https://www.linkedin.com/in/daniel-r%C3%ADos-267585325/',
  whatsapp: 'https://wa.me/573114292229',
  whatsappLabel: '+57 311 429 2229',
  phone: '+57 311 429 2229',
  phoneHref: 'tel:+573114292229',
  githubLabel: 'github.com/danielriosg260-hash',
  linkedinLabel: 'in/daniel-ríos-267585325',
}

export const ABOUT = {
  title: 'Sobre mí',
  subtitle:
    'Conoce mi historia, mi formación y mi camino en el desarrollo de software.',
  paragraphs: [
  'Soy Daniel Ríos Giraldo, desarrollador de software Full-Stack y Tecnólogo en Análisis y Desarrollo de Software (SENA). Mi enfoque está en construir aplicaciones web y móviles escalables, respaldadas por arquitecturas de bases de datos sólidas y buenas prácticas de aseguramiento de calidad (QA).',
  'Actualmente desarrollo mi etapa productiva en Tecnoparque – Nodo SENA, integrándome en entornos tecnológicos colaborativos para diseñar e implementar soluciones reales. A lo largo de mi trayectoria he construido proyectos completos —desde plataformas de agendamiento y e-commerce hasta sistemas de respaldo automatizado— trabajando con stacks modernos como Next.js, Node.js, Python/Django, PostgreSQL y MongoDB.',
  'Mi formación previa como Técnico Auxiliar Administrativo y Financiero, sumada a mi experiencia en producción y atención al cliente, me brinda una ventaja clave: no solo escribo código, sino que entiendo los procesos operativos, la lógica de negocio y las necesidades reales del usuario final.',
  'Me caracterizo por una mentalidad analítica, perseverante y orientada a la resolución de problemas. Busco seguir aportando valor en equipos de desarrollo donde pueda asumir nuevos retos técnicos y transformar ideas complejas en productos digitales funcionales y de alto impacto.',
  ],
  facts: [
    { label: 'Ubicación', value: 'Medellín, Colombia' },
    { label: 'Profesión', value: 'Desarrollador de Software' },
    { label: 'Formación actual', value: 'Tecnólogo en ADSO — SENA' },
    { label: 'Escenario de práctica', value: 'Tecnoparque – Nodo SENA' },
    { label: 'Cargo actual', value: 'Desarrollador practicante' },
    { label: 'Área profesional', value: 'Desarrollo Web y Móvil' },
    { label: 'Intereses', value: 'Web, Mobile, Backend, Bases de Datos y QA' },
  ],
}

export type Experience = {
  id: string
  role: string
  company: string
  period: string
  type: string
  summary: string
  bullets: string[]
  highlight?: boolean
}

export const EXPERIENCE: Experience[] = [
  {
    id: 'exp-tecnoparque',
    role: 'Desarrollador Practicante',
    company: 'Tecnoparque – Nodo SENA',
    period: '11 nov 2026 – 10 may 2027',
    type: 'Etapa productiva / Prácticas profesionales',
    summary:
      'Actualmente realizo mi etapa productiva en Tecnoparque – Nodo SENA, un entorno orientado a la innovación, el desarrollo tecnológico y la construcción de soluciones. Fortalezco mis conocimientos en análisis, desarrollo y construcción de aplicaciones de software, participando en procesos de soluciones web y móviles, implementación de funcionalidades, bases de datos y pruebas de software.',
    bullets: [
      'Desarrollo de aplicaciones web y aplicaciones móviles.',
      'Implementación de interfaces y funcionalidades frontend y desarrollo backend.',
      'Gestión y manejo de bases de datos relacionales y NoSQL.',
      'Pruebas y validación de software para asegurar la calidad.',
      'Análisis y solución de problemas dentro de un entorno colaborativo.',
      'Aprendizaje y aplicación continua de nuevas tecnologías.',
    ],
    highlight: true,
  },
  {
    id: 'exp-carinitos',
    role: 'Auxiliar de producción y atención al cliente',
    company: 'Cariñitos de Mamá',
    period: 'Experiencia laboral previa',
    type: 'Operativo / Servicio al cliente',
    summary:
      'Experiencia en preparación y elaboración de productos, apoyo en actividades operativas y atención al cliente, desarrollando habilidades clave de organización, comunicación, trabajo en equipo, responsabilidad y orientación al cliente.',
    bullets: [
      'Preparación y elaboración de productos, apoyando procesos de producción.',
      'Atención y orientación a las necesidades de los clientes con calidad y servicio.',
      'Organización del espacio de trabajo y colaboración activa en equipo.',
      'Cumplimiento responsable y comprometido de las tareas asignadas.',
    ],
    highlight: false,
  },
]

export type Project = {
  id: string
  name: string
  kind: string
  year: string
  problem: string
  solution: string
  features: string[]
  tech: string[]
  status: 'En desarrollo' | 'Completado' | 'En evolución'
  gradient: [string, string]
  emoji: string
  github?: string
  demo?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'tecnocorte',
    name: 'TecnoCorte',
    kind: 'Aplicación web · Gestión de citas para barberías',
    year: '2025–2026',
    problem:
      'Muchas barberías realizan la programación de citas mediante WhatsApp, llamadas o por orden de llegada, lo que genera desorganización, dobles reservas, olvidos, tiempos de espera y pérdida de clientes.',
    solution:
      'Aplicación web diseñada para centralizar la gestión de citas, organizar los horarios disponibles, administrar los servicios ofrecidos y facilitar la interacción entre clientes y la barbería.',
    features: [
      'Registro, inicio y cierre de sesión seguro',
      'Gestión de usuarios, roles, permisos y clientes',
      'Agendamiento de citas y consulta de disponibilidad',
      'Administración de servicios y gestión de reservas',
      'Cancelación e historial de citas',
      'Organización de horarios y agenda del barbero',
    ],
    tech: ['Python', 'Django', 'HTML5', 'CSS3', 'JavaScript', 'Bases de datos', 'Git', 'GitHub'],
    status: 'En evolución',
    gradient: ['#f6d585', '#b38b2d'],
    emoji: '💈',
    github: 'https://github.com/tecnocorte-barber/TecnoCorte_proyecto',
    demo: 'https://tecno-corte-proyecto.vercel.app/',
  },
  {
    id: 'carrito',
    name: 'Carrito de compras con API',
    kind: 'Aplicación web · Frontend & API REST',
    year: '2025',
    problem:
      'La consulta de productos, selección de artículos y cálculo de valores en una interfaz estática resulta poco práctica, lenta y propensa a errores.',
    solution:
      'Interfaz web interactiva que consume información de una API REST externa, permite seleccionar productos y gestionar un carrito de compras dinámico con persistencia entre sesiones.',
    features: [
      'Consumo de API REST e integración de datos externos',
      'Consulta y visualización interactiva de productos',
      'Agregar, modificar cantidades y eliminar productos',
      'Cálculo dinámico automático de subtotales y total',
      'Persistencia del carrito con LocalStorage',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'API REST', 'LocalStorage'],
    status: 'Completado',
    gradient: ['#e5c158', '#8a6d1c'],
    emoji: '🛒',
    github: 'https://github.com/danielriosg260-hash',
  },
  {
    id: 'flutter',
    name: 'Aplicaciones móviles con Flutter',
    kind: 'Desarrollo Mobile · Flutter & Dart',
    year: '2025–2026',
    problem:
      'La necesidad de construir experiencias móviles fluidas, nativas y multiplataforma tanto para Android como iOS a partir de una única base de código.',
    solution:
      'Desarrollo y aprendizaje de aplicaciones móviles utilizando Flutter y Dart, explorando la creación de interfaces nativas, navegación fluida entre pantallas y arquitectura de componentes modulares.',
    features: [
      'Interfaces nativas y multiplataforma',
      'Navegación declarativa entre pantallas',
      'Construcción de componentes reutilizables',
      'Gestión de estado y arquitectura móvil',
      'Implementación de funcionalidades interactivas',
    ],
    tech: ['Flutter', 'Dart', 'Android', 'iOS', 'Git'],
    status: 'En evolución',
    gradient: ['#ffd700', '#785b1a'],
    emoji: '📱',
    github: 'https://github.com/danielriosg260-hash',
  },
  {
    id: 'selenium',
    name: 'Automatización de pruebas (QA)',
    kind: 'QA & Pruebas funcionales · Selenium',
    year: '2025–2026',
    problem:
      'Las pruebas manuales consumen mucho tiempo y dificultan la validación repetitiva de los flujos críticos de las aplicaciones web, dejando pasar posibles errores.',
    solution:
      'Suite de pruebas automatizadas con Selenium WebDriver en Python que simula las acciones de los usuarios en navegadores web, validando formularios, autenticación y flujos clave.',
    features: [
      'Automatización de navegación en Chrome WebDriver',
      'Validación de formularios e interacción con campos',
      'Pruebas de inicio de sesión y autenticación',
      'Verificación de funcionalidades y detección de errores',
      'Ejecución de suites de pruebas funcionales repetibles',
    ],
    tech: ['Python', 'Selenium', 'Django', 'Chrome WebDriver'],
    status: 'Completado',
    gradient: ['#dfb15b', '#5c430e'],
    emoji: '🧪',
    github: 'https://github.com/danielriosg260-hash',
  },
  {
    id: 'node-mongo',
    name: 'Gestión con Node.js y MongoDB',
    kind: 'API backend · Usuarios y clientes',
    year: '2025',
    problem:
      'Los datos de usuarios y clientes requerían un backend estructurado, seguro y con operaciones CRUD eficientes y persistentes.',
    solution:
      'Aplicación backend orientada a la gestión de usuarios y clientes, utilizando Node.js y MongoDB para el almacenamiento y procesamiento estructurado de datos.',
    features: [
      'Registro y administración de usuarios y clientes',
      'Persistencia en MongoDB con Mongoose',
      'Operaciones CRUD completas y optimizadas',
      'Organización modular de rutas y controladores',
      'Pruebas y validación de endpoints HTTP',
    ],
    tech: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JavaScript'],
    status: 'Completado',
    gradient: ['#f6d585', '#6b5314'],
    emoji: '🍃',
    github: 'https://github.com/danielriosg260-hash',
  },
]

export type TechGroup = {
  title: string
  color: string
  items: { name: string; level: 'Experiencia práctica' | 'Conocimientos' | 'En aprendizaje' }[]
}

export const TECH: TechGroup[] = [
  {
    title: 'Frontend',
    color: '#d4af37',
    items: [
      { name: 'HTML5', level: 'Experiencia práctica' },
      { name: 'CSS3', level: 'Experiencia práctica' },
      { name: 'JavaScript', level: 'Experiencia práctica' },
      { name: 'React', level: 'Experiencia práctica' },
      { name: 'EJS', level: 'Conocimientos' },
    ],
  },
  {
    title: 'Backend',
    color: '#e5c158',
    items: [
      { name: 'Python', level: 'Experiencia práctica' },
      { name: 'Django', level: 'Experiencia práctica' },
      { name: 'Node.js', level: 'Experiencia práctica' },
      { name: 'Express', level: 'Conocimientos' },
    ],
  },
  {
    title: 'Desarrollo móvil',
    color: '#f6d585',
    items: [
      { name: 'Flutter', level: 'Experiencia práctica' },
      { name: 'Dart', level: 'Conocimientos' },
      { name: 'React Native', level: 'Experiencia práctica' },
      { name: 'Expo', level: 'Experiencia práctica' },
    ],
  },
  {
    title: 'Bases de datos',
    color: '#dfb15b',
    items: [
      { name: 'MongoDB', level: 'Experiencia práctica' },
      { name: 'MySQL', level: 'Conocimientos' },
      { name: 'SQLite', level: 'Conocimientos' },
    ],
  },
  {
    title: 'Herramientas',
    color: '#cda243',
    items: [
      { name: 'Git', level: 'Experiencia práctica' },
      { name: 'GitHub', level: 'Experiencia práctica' },
      { name: 'VS Code', level: 'Experiencia práctica' },
      { name: 'Postman', level: 'Experiencia práctica' },
      { name: 'Linux', level: 'Conocimientos' },
    ],
  },
  {
    title: 'Pruebas y calidad',
    color: '#e6c66d',
    items: [
      { name: 'Selenium', level: 'Experiencia práctica' },
      { name: 'Pruebas funcionales', level: 'Experiencia práctica' },
      { name: 'Validación de aplicaciones', level: 'Experiencia práctica' },
      { name: 'Casos de prueba', level: 'Conocimientos' },
    ],
  },
]

export type EducationItem = {
  id: string
  title: string
  place: string
  location: string
  period?: string
  description?: string
  topics: string[]
  highlight?: boolean
}

export const EDUCATION: EducationItem[] = [
  {
    id: 'sena',
    title: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
    place: 'Servicio Nacional de Aprendizaje — SENA',
    location: 'Medellín, Colombia',
    period: '10 feb 2025 – Actualidad (Etapa productiva)',
    description:
      'Formación tecnológica orientada al análisis, diseño, desarrollo, implementación y mantenimiento de soluciones de software.',
    topics: [
      'Fundamentos y lógica de programación',
      'Programación orientada a objetos',
      'Análisis de requerimientos y diseño de software',
      'Desarrollo frontend y desarrollo backend',
      'Desarrollo de aplicaciones web y móviles',
      'Bases de datos relacionales y NoSQL',
      'APIs y servicios web',
      'Pruebas de software y aseguramiento de calidad',
      'Control de versiones con Git y GitHub',
      'Metodologías de desarrollo y trabajo colaborativo',
    ],
    highlight: true,
  },
  {
    id: 'admin',
    title: 'Técnico Auxiliar Administrativo y Financiero',
    place: 'Formación técnica profesional',
    location: 'Medellín, Colombia',
    period: 'Finalizado · 26 de noviembre de 2024',
    description:
      'Formación orientada a procesos administrativos, organizacionales, gestión empresarial y atención al cliente.',
    topics: [
      'Procesos administrativos y financieros',
      'Organización documental y de información',
      'Atención y servicio al cliente',
      'Gestión empresarial y apoyo operativo',
      'Comunicación organizacional',
      'Responsabilidad y cumplimiento',
    ],
    highlight: false,
  },
  {
    id: 'bachiller',
    title: 'Bachiller Académico',
    place: 'Educación secundaria',
    location: 'Medellín, Colombia',
    period: 'Finalizado · 26 de noviembre de 2024',
    description:
      'Formación académica integral, desarrollo de pensamiento lógico, analítico y comunicación.',
    topics: [
      'Formación académica integral',
      'Pensamiento analítico y lógico',
      'Comunicación y trabajo en equipo',
    ],
    highlight: false,
  },
]

export const SKILLS = {
  technical: [
    'Desarrollo de aplicaciones web',
    'Desarrollo frontend (HTML5, CSS3, JavaScript, React)',
    'Desarrollo backend (Python, Django, Node.js, Express)',
    'Desarrollo de aplicaciones móviles (Flutter, Dart)',
    'Creación y consumo de APIs REST',
    'Bases de datos (MongoDB, MySQL, SQLite)',
    'Automatización de pruebas con Selenium',
    'Pruebas funcionales y validación de software',
    'Control de versiones con Git y GitHub',
    'Análisis de requerimientos y resolución de problemas',
    'Manejo de herramientas (VS Code, Postman, Linux)',
  ],
  personal: [
    'Responsabilidad y compromiso',
    'Trabajo en equipo y colaboración',
    'Creatividad e innovación',
    'Comunicación asertiva',
    'Adaptabilidad y perseverancia',
    'Organización y atención al detalle',
    'Aprendizaje continuo y autónomo',
    'Servicio y orientación al cliente',
    'Pensamiento lógico',
    'Disposición para afrontar nuevos retos',
  ],
}

export const NAV_SECTIONS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'tecnologias', label: 'Tecnologías' },
  { id: 'formacion', label: 'Formación' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'contacto', label: 'Contacto' },
] as const

export const MARQUEE_TECH = [
  'React',
  'Next.js',
  'React Native',
  'Expo',
  'TypeScript',
  'Node.js',
  'Express',
  'Python',
  'Django',
  'MongoDB',
  'MySQL',
  'Git',
  'Selenium',
  'Flutter',
  'Postman',
]
