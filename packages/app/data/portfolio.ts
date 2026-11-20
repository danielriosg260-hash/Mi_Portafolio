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
  role: 'Desarrollador de Software',
  tagline: 'Transformando ideas en soluciones digitales.',
  subtitle: 'Desarrollo Web · Aplicaciones Móviles · Soluciones Tecnológicas',
  location: 'Medellín, Colombia',
  status: 'Disponible para nuevos retos',
  bio: 'Desarrollador de software enfocado en la creación de aplicaciones web y móviles. Me apasiona la tecnología, la resolución de problemas y el desarrollo de soluciones funcionales que aporten valor a las personas y a las organizaciones.',
  description:
    'Construyendo soluciones digitales que conectan ideas y tecnología.',
}

export const CONTACT = {
  // ⚠️ Reemplaza estos placeholders por tus datos reales.
  email: 'daniel.rios.dev@gmail.com',
  github: 'https://github.com/danielriosg',
  linkedin: 'https://www.linkedin.com/in/daniel-rios-giraldo',
  whatsapp: 'https://wa.me/573000000000',
  whatsappLabel: '+57 300 000 0000',
  githubLabel: 'github.com/danielriosg',
  linkedinLabel: 'in/daniel-rios-giraldo',
}

export const ABOUT = {
  title: 'Conoce un poco sobre mí',
  paragraphs: [
    'Soy Daniel Ríos Giraldo, desarrollador de software con formación en Análisis y Desarrollo de Software y experiencia práctica en el desarrollo de soluciones tecnológicas.',
    'A lo largo de mi proceso de formación y experiencia laboral he trabajado en proyectos que me han permitido fortalecer mis conocimientos en programación, desarrollo web, aplicaciones móviles, bases de datos y pruebas de software.',
    'Me interesa participar en proyectos que representen nuevos retos, aportar ideas, aprender nuevas tecnologías y construir soluciones que respondan a necesidades reales.',
    'Me considero una persona responsable, comprometida, creativa y con disposición para aprender constantemente. Disfruto trabajar en equipo, compartir conocimientos y convertir ideas en proyectos funcionales.',
  ],
  facts: [
    { label: 'Ubicación', value: 'Medellín, Colombia' },
    { label: 'Profesión', value: 'Desarrollador de Software' },
    { label: 'Área', value: 'Desarrollo Web y Móvil' },
    { label: 'Formación', value: 'Análisis y Desarrollo de Software' },
    { label: 'Intereses', value: 'Tecnología, programación e innovación' },
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
    id: 'exp-actual',
    role: 'Desarrollador de Software',
    company: 'Empresa de desarrollo de software',
    period: '2024 – Actualidad',
    type: 'Tiempo completo',
    summary:
      'Actualmente participo en procesos de desarrollo de software dentro de un entorno empresarial, fortaleciendo mis conocimientos técnicos y contribuyendo a la construcción de soluciones tecnológicas mediante el trabajo colaborativo, la implementación de funcionalidades y el desarrollo de proyectos.',
    bullets: [
      'Participación en el desarrollo de aplicaciones y soluciones tecnológicas.',
      'Implementación de interfaces y funcionalidades utilizando las tecnologías asignadas.',
      'Colaboración en el análisis, diseño y construcción de proyectos.',
      'Uso de herramientas de desarrollo y control de versiones.',
      'Aprendizaje y aplicación de buenas prácticas de desarrollo de software.',
    ],
    highlight: true,
  },
  {
    id: 'exp-anterior',
    role: 'Auxiliar de producción y atención al cliente',
    company: 'Cariñitos de Mamá',
    period: 'Experiencia anterior',
    type: 'Operativo / Atención al cliente',
    summary:
      'Experiencia en preparación de productos, atención al cliente y apoyo en actividades operativas, fortaleciendo habilidades de comunicación, organización, trabajo en equipo y responsabilidad.',
    bullets: [
      'Atención y orientación al cliente.',
      'Organización de tareas y trabajo en equipo.',
      'Responsabilidad y compromiso con los procesos operativos.',
    ],
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
    kind: 'Aplicación web · Gestión de citas',
    year: '2025',
    problem:
      'La programación manual de citas en barberías genera dobles reservas, olvidos y una mala organización de la atención al cliente.',
    solution:
      'Aplicación web diseñada para facilitar la gestión de citas, servicios y horarios en barberías, brindando una herramienta digital que permite organizar la atención al cliente y mejorar la administración de las reservas.',
    features: [
      'Registro e inicio de sesión',
      'Gestión de usuarios y roles',
      'Agendamiento de citas',
      'Consulta de disponibilidad',
      'Administración de servicios',
      'Gestión de reservas',
      'Historial de citas',
    ],
    tech: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript', 'Base de datos'],
    status: 'En desarrollo',
    gradient: ['#22d3ee', '#7c3aed'],
    emoji: '💈',
  },
  {
    id: 'carrito',
    name: 'Carrito de compras',
    kind: 'Aplicación web · E-commerce',
    year: '2025',
    problem:
      'Consultar productos y calcular totales de forma manual es lento, tedioso y propenso a errores.',
    solution:
      'Aplicación web que permite consultar productos mediante una API, visualizar sus características y gestionar un carrito de compras de forma dinámica, persistiendo los datos entre sesiones.',
    features: [
      'Consumo de API REST',
      'Visualización de productos',
      'Selección de productos',
      'Carrito de compras dinámico',
      'Cálculo de cantidades y valores',
      'Persistencia con LocalStorage',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'API REST', 'LocalStorage'],
    status: 'Completado',
    gradient: ['#a855f7', '#ec4899'],
    emoji: '🛒',
  },
  {
    id: 'node-mongo',
    name: 'Gestión con Node.js y MongoDB',
    kind: 'API backend · Usuarios y clientes',
    year: '2025',
    problem:
      'Los datos de usuarios y clientes necesitaban un backend robusto, escalable y con operaciones CRUD organizadas.',
    solution:
      'Aplicación backend orientada a la gestión de usuarios y clientes, utilizando Node.js y MongoDB para el almacenamiento y procesamiento de datos.',
    features: [
      'Registro de usuarios',
      'Gestión de clientes',
      'Persistencia en MongoDB',
      'Operaciones CRUD',
      'Organización de rutas y controladores',
      'Integración de funcionalidades backend',
    ],
    tech: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JavaScript'],
    status: 'Completado',
    gradient: ['#34d399', '#22d3ee'],
    emoji: '🍃',
  },
  {
    id: 'flutter',
    name: 'Aplicaciones móviles',
    kind: 'Desarrollo móvil · Flutter',
    year: '2025',
    problem:
      'Las ideas debían llegar al bolsillo de los usuarios con una experiencia nativa y multiplataforma.',
    solution:
      'Desarrollo de aplicaciones móviles mediante Flutter, explorando la creación de interfaces, navegación, componentes y funcionalidades para dispositivos móviles.',
    features: [
      'Interfaces nativas multiplataforma',
      'Navegación entre pantallas',
      'Componentes reutilizables',
      'Gestión de estado',
    ],
    tech: ['Flutter', 'Dart'],
    status: 'En evolución',
    gradient: ['#38bdf8', '#6366f1'],
    emoji: '📱',
  },
  {
    id: 'selenium',
    name: 'Automatización de pruebas',
    kind: 'QA · Selenium',
    year: '2025',
    problem:
      'Las pruebas manuales consumían mucho tiempo y dejaban pasar errores en flujos críticos de las aplicaciones.',
    solution:
      'Implementación de pruebas automatizadas para validar el comportamiento de aplicaciones web mediante la automatización de acciones realizadas por el usuario en el navegador.',
    features: [
      'Automatización de navegación',
      'Validación de formularios',
      'Pruebas de inicio de sesión',
      'Verificación de funcionalidades',
      'Identificación de errores',
    ],
    tech: ['Python', 'Selenium', 'Django', 'Chrome WebDriver'],
    status: 'Completado',
    gradient: ['#f59e0b', '#ef4444'],
    emoji: '🧪',
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
    color: '#22d3ee',
    items: [
      { name: 'HTML5', level: 'Experiencia práctica' },
      { name: 'CSS3', level: 'Experiencia práctica' },
      { name: 'JavaScript', level: 'Experiencia práctica' },
      { name: 'EJS', level: 'Conocimientos' },
      { name: 'React', level: 'Experiencia práctica' },
    ],
  },
  {
    title: 'Backend',
    color: '#a855f7',
    items: [
      { name: 'Python', level: 'Experiencia práctica' },
      { name: 'Django', level: 'Experiencia práctica' },
      { name: 'Node.js', level: 'Experiencia práctica' },
      { name: 'Express', level: 'Conocimientos' },
    ],
  },
  {
    title: 'Desarrollo móvil',
    color: '#38bdf8',
    items: [
      { name: 'Flutter', level: 'Experiencia práctica' },
      { name: 'Dart', level: 'Conocimientos' },
      { name: 'React Native', level: 'Experiencia práctica' },
      { name: 'Expo', level: 'Experiencia práctica' },
    ],
  },
  {
    title: 'Bases de datos',
    color: '#34d399',
    items: [
      { name: 'MySQL', level: 'Conocimientos' },
      { name: 'MongoDB', level: 'Experiencia práctica' },
      { name: 'SQLite', level: 'Conocimientos' },
    ],
  },
  {
    title: 'Herramientas',
    color: '#f472b6',
    items: [
      { name: 'Git', level: 'Experiencia práctica' },
      { name: 'GitHub', level: 'Experiencia práctica' },
      { name: 'VS Code', level: 'Experiencia práctica' },
      { name: 'Linux', level: 'Conocimientos' },
      { name: 'Postman', level: 'Experiencia práctica' },
    ],
  },
  {
    title: 'Pruebas y calidad',
    color: '#fbbf24',
    items: [
      { name: 'Selenium', level: 'Experiencia práctica' },
      { name: 'Pruebas funcionales', level: 'Experiencia práctica' },
      { name: 'Casos de prueba', level: 'Conocimientos' },
      { name: 'Validación de aplicaciones', level: 'Experiencia práctica' },
    ],
  },
]

export const EDUCATION = [
  {
    id: 'sena',
    title: 'Tecnología en Análisis y Desarrollo de Software',
    place: 'Servicio Nacional de Aprendizaje — SENA',
    location: 'Medellín, Colombia',
    topics: [
      'Desarrollo de software',
      'Programación',
      'Bases de datos',
      'Análisis de requerimientos',
      'Diseño de sistemas',
      'Desarrollo web',
      'Desarrollo móvil',
      'Pruebas de software',
      'Metodologías de desarrollo',
    ],
    highlight: true,
  },
  {
    id: 'admin',
    title: 'Técnico Auxiliar Administrativo y Financiero',
    place: 'Formación complementaria',
    location: 'Medellín, Colombia',
    topics: [
      'Procesos administrativos',
      'Organización',
      'Servicio al cliente',
      'Gestión empresarial',
    ],
    highlight: false,
  },
]

export const SKILLS = {
  technical: [
    'Desarrollo de aplicaciones web',
    'Desarrollo backend',
    'Desarrollo frontend',
    'Desarrollo de aplicaciones móviles',
    'Bases de datos',
    'Consumo de APIs',
    'Control de versiones',
    'Pruebas de software',
    'Análisis de requerimientos',
    'Resolución de problemas',
  ],
  personal: [
    'Trabajo en equipo',
    'Responsabilidad',
    'Adaptabilidad',
    'Comunicación',
    'Organización',
    'Aprendizaje continuo',
    'Creatividad',
    'Compromiso',
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
