export type IntegrationStatus = "connected" | "configurable" | "soon";

export type Integration = {
  id: string;
  name: string;
  emoji: string;
  category: "ai" | "supplier" | "store" | "ads" | "social" | "comms" | "finance" | "design";
  status: IntegrationStatus;
  description: string;
  envVar?: string;
  signupUrl?: string;
  docsUrl?: string;
};

export const INTEGRATIONS: Integration[] = [
  {
    id: "claude",
    name: "Claude API",
    emoji: "🧠",
    category: "ai",
    status: "configurable",
    description: "Opus 4.7 + Haiku 4.5. Motor de TODOS los agentes.",
    envVar: "ANTHROPIC_API_KEY",
    signupUrl: "https://console.anthropic.com",
  },
  {
    id: "dropi",
    name: "Dropi",
    emoji: "📦",
    category: "supplier",
    status: "soon",
    description: "Catálogo de proveedores LATAM, tracking, logística.",
    signupUrl: "https://dropi.cl",
  },
  {
    id: "shopify",
    name: "Shopify",
    emoji: "🛍️",
    category: "store",
    status: "soon",
    description: "Tienda online. Admin API + Storefront API.",
    envVar: "SHOPIFY_ADMIN_TOKEN",
    signupUrl: "https://shopify.com",
  },
  {
    id: "meta-ad-library",
    name: "Meta Ad Library",
    emoji: "🔭",
    category: "ads",
    status: "configurable",
    description: "Búsqueda pública de anuncios activos. Sin API key (scraping).",
    docsUrl: "https://www.facebook.com/ads/library",
  },
  {
    id: "meta-ads",
    name: "Meta Ads (Marketing API)",
    emoji: "📘",
    category: "ads",
    status: "soon",
    description: "Crear/escalar campañas Facebook + Instagram vía API oficial.",
    envVar: "META_ACCESS_TOKEN",
    signupUrl: "https://business.facebook.com",
  },
  {
    id: "tiktok",
    name: "TikTok",
    emoji: "🎵",
    category: "social",
    status: "soon",
    description: "Scraping orgánico de videos virales por hashtag.",
  },
  {
    id: "tiktok-ads",
    name: "TikTok Ads (Business API)",
    emoji: "📲",
    category: "ads",
    status: "soon",
    description: "Crear/escalar campañas TikTok Ads vía Business API.",
    envVar: "TIKTOK_ACCESS_TOKEN",
    signupUrl: "https://ads.tiktok.com",
  },
  {
    id: "google-ads",
    name: "Google Ads",
    emoji: "🔎",
    category: "ads",
    status: "soon",
    description: "Search + Performance Max + YouTube Ads.",
    envVar: "GOOGLE_ADS_DEVELOPER_TOKEN",
    signupUrl: "https://ads.google.com",
  },
  {
    id: "instagram",
    name: "Instagram",
    emoji: "📸",
    category: "social",
    status: "soon",
    description: "Reels orgánicos vía Instagram Graph API.",
  },
  {
    id: "youtube",
    name: "YouTube Shorts",
    emoji: "▶️",
    category: "social",
    status: "soon",
    description: "Shorts orgánicos + YouTube Ads.",
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    emoji: "💚",
    category: "comms",
    status: "soon",
    description: "Mensajes a clientes y proveedores 24/7. Cloud API oficial.",
    envVar: "WHATSAPP_ACCESS_TOKEN",
    signupUrl: "https://business.whatsapp.com",
  },
  {
    id: "sii",
    name: "SII Chile",
    emoji: "🇨🇱",
    category: "finance",
    status: "soon",
    description: "Facturación electrónica vía Nubox/Defontana (proveedor certificado).",
    signupUrl: "https://www.sii.cl",
  },
  {
    id: "canva",
    name: "Canva",
    emoji: "🎨",
    category: "design",
    status: "soon",
    description: "Generación de imágenes y plantillas.",
    signupUrl: "https://canva.com",
  },
  {
    id: "gamma",
    name: "Gamma",
    emoji: "✨",
    category: "design",
    status: "soon",
    description: "Diseño de presentaciones y landings con AI.",
    signupUrl: "https://gamma.app",
  },
];

export const INTEGRATIONS_MAP = Object.fromEntries(
  INTEGRATIONS.map((i) => [i.id, i])
) as Record<string, Integration>;
