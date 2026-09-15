/**
 * Datos y utilidades compartidas del mockup.
 * Todo enlace interno o asset debe pasar por `withBase` para funcionar
 * bajo la base de GitHub Pages (`/doblessa-centro-spai/`).
 */

const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function withBase(path = '/'): string {
  const clean = path.replace(/^\/+/, '');
  return `${base}/${clean}`;
}

export const img = (path: string) => withBase(`images/${path}`);
export const imgWebp = (path: string) => withBase(`images/${path.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`);

export type Tone = 'infantil' | 'adultos' | 'neutral';

export const SITE = {
  name: 'Centro Spai',
  locale: 'es_ES',
  city: 'Burriana',
  region: 'Castellón',
  defaultImage: 'images/inicio/hero-centro-spai.jpg',
  /**
   * Dirección tomada de la documentación de investigación, marcada allí
   * como "validar antes de publicar". Teléfonos, email y horario NO están
   * verificados, por eso no se muestran como datos reales.
   */
  address: {
    street: 'Calle San José, 18',
    postalCode: '12530',
    locality: 'Burriana',
    region: 'Castellón',
    verified: false,
  },
} as const;

export const ROUTES = {
  home: '/',
  infantil: '/fisioterapia-infantil-burriana/',
  colicos: '/colicos-del-lactante-burriana/',
  osteopatia: '/osteopatia-bebes-burriana/',
  adultos: '/fisioterapia-adultos-burriana/',
  embarazo: '/embarazo-posparto/',
  centro: '/el-centro/',
  talleres: '/talleres/',
  contacto: '/contacto/',
  privacidad: '/politica-de-privacidad/',
  avisoLegal: '/aviso-legal/',
} as const;

export const citaHref = (tone: Tone = 'neutral') =>
  tone === 'neutral'
    ? withBase(ROUTES.contacto)
    : withBase(`${ROUTES.contacto}?tipo=${tone === 'adultos' ? 'adulto' : 'infantil'}`);

export interface NavItem {
  label: string;
  href: string;
  /** Rutas que marcan este item como activo. */
  match: string[];
  children?: { label: string; href: string }[];
}

export const NAV: NavItem[] = [
  {
    label: 'Infantil',
    href: ROUTES.infantil,
    match: [ROUTES.infantil, ROUTES.colicos, ROUTES.osteopatia],
    children: [
      { label: 'Fisioterapia infantil', href: ROUTES.infantil },
      { label: 'Cólicos del lactante', href: ROUTES.colicos },
      { label: 'Osteopatía para bebés', href: ROUTES.osteopatia },
    ],
  },
  {
    label: 'Adultos y bienestar',
    href: ROUTES.adultos,
    match: [ROUTES.adultos, ROUTES.embarazo],
    children: [
      { label: 'Fisioterapia para adultos', href: ROUTES.adultos },
      { label: 'Embarazo y posparto', href: ROUTES.embarazo },
    ],
  },
  { label: 'El centro', href: ROUTES.centro, match: [ROUTES.centro] },
  { label: 'Talleres', href: ROUTES.talleres, match: [ROUTES.talleres] },
  { label: 'Contacto', href: ROUTES.contacto, match: [ROUTES.contacto] },
];

export const INFANTIL_NAV = NAV[0].children!;
export const ADULTOS_NAV = NAV[1].children!;

/**
 * JSON-LD prudente de servicio: solo nombre, descripción y ámbito local.
 * Sin dirección, teléfonos, profesionales ni valoraciones.
 */
export function serviceSchema(name: string, description: string) {
  return {
    '@type': 'Service',
    name,
    description,
    serviceType: name,
    areaServed: { '@type': 'City', name: 'Burriana' },
    provider: { '@type': 'MedicalBusiness', name: SITE.name },
  };
}

/** Compara rutas ignorando base y barra final. */
export function isActive(currentPath: string, routes: string[]): boolean {
  const norm = (p: string) => p.replace(base, '').replace(/\/+$/, '') || '/';
  const current = norm(currentPath);
  return routes.some((r) => norm(r) === current);
}
