import type { AgentId } from "./prompts";

export type AgentStatus = "active" | "soon";

export type AgentCard = {
  id: string;
  name: string;
  description: string;
  emoji: string;
  status: AgentStatus;
  agentId?: AgentId;
  integrations?: string[];
};

export type Section = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  agents: AgentCard[];
};

export const SECTIONS: Section[] = [
  {
    id: "control",
    name: "Torre de Control",
    emoji: "🎛️",
    description: "Tu agente maestro: te diagnostica, arma estrategia y te dice a qué agente pasar.",
    agents: [
      {
        id: "strategy-planner",
        name: "Strategy Planner",
        description: "Empezá acá. Te pregunta tu situación y arma el plan completo.",
        emoji: "🎛️",
        status: "active",
        agentId: "strategy-planner",
        integrations: ["claude"],
      },
    ],
  },
  {
    id: "research",
    name: "Investigación de Producto",
    emoji: "🎯",
    description: "Encontrar el producto winner antes de invertir un peso.",
    agents: [
      {
        id: "product-hunter",
        name: "Product Hunter",
        description: "Busca winners en Dropi, TikTok y Meta Ad Library.",
        emoji: "🎯",
        status: "active",
        agentId: "product-hunter",
        integrations: ["claude", "dropi", "tiktok", "meta-ad-library"],
      },
      {
        id: "winner-validator",
        name: "Winner Validator",
        description: "Valida 1 producto contra los 5 efectos wow + proveedor + tracción.",
        emoji: "✅",
        status: "active",
        agentId: "winner-validator",
        integrations: ["claude"],
      },
      {
        id: "competitor-scout",
        name: "Competitor Scout",
        description: "Detecta anuncios corriendo +15 días = rentables.",
        emoji: "🔍",
        status: "active",
        agentId: "competitor-scout",
        integrations: ["claude", "meta-ad-library"],
      },
      {
        id: "supplier-verifier",
        name: "Supplier Verifier",
        description: "Verifica confiabilidad y certificación de proveedores Dropi.",
        emoji: "🛡️",
        status: "soon",
        integrations: ["claude", "dropi"],
      },
    ],
  },
  {
    id: "offer",
    name: "Construcción de Oferta",
    emoji: "🎁",
    description: "Hacé que la gente piense 'soy idiota si no compro esto ya'.",
    agents: [
      {
        id: "offer-builder",
        name: "Offer Builder",
        description: "Ecuación de valor + bonos + garantía agresiva + escasez.",
        emoji: "🎁",
        status: "active",
        agentId: "offer-builder",
        integrations: ["claude"],
      },
      {
        id: "pricing-engine",
        name: "Pricing Engine",
        description: "Costeo: producto + despacho + ads + margen objetivo.",
        emoji: "💵",
        status: "soon",
        integrations: ["claude", "dropi"],
      },
    ],
  },
  {
    id: "store",
    name: "Tienda Shopify",
    emoji: "🏪",
    description: "Tienda de nicho: marca, copys, políticas, integración Drop+Fire.",
    agents: [
      {
        id: "store-builder",
        name: "Store Builder",
        description: "Diseña la tienda nicho: estructura, políticas Chile, product pages.",
        emoji: "🏪",
        status: "active",
        agentId: "store-builder",
        integrations: ["claude", "shopify"],
      },
      {
        id: "brand-designer",
        name: "Brand Designer",
        description: "Logo brief + paleta + tipografía (output a Canva/Gamma).",
        emoji: "🎨",
        status: "soon",
        integrations: ["claude", "canva", "gamma"],
      },
      {
        id: "drop-fire-sync",
        name: "Drop+Fire Sync",
        description: "Importa productos de Dropi a Shopify automáticamente.",
        emoji: "🔥",
        status: "soon",
        integrations: ["dropi", "shopify"],
      },
    ],
  },
  {
    id: "creatives",
    name: "Creativos & Contenido",
    emoji: "🎬",
    description: "Hooks, scripts, videos scrapeados sin marca de agua.",
    agents: [
      {
        id: "hook-writer",
        name: "Hook Writer",
        description: "10 hooks + video completo (hook→pico→autoridad→cuerpo→CTA).",
        emoji: "🎤",
        status: "active",
        agentId: "hook-writer",
        integrations: ["claude"],
      },
      {
        id: "video-scraper",
        name: "Video Scraper",
        description: "Plan para descargar videos TikTok del producto sin marca de agua.",
        emoji: "🎬",
        status: "active",
        agentId: "video-scraper",
        integrations: ["claude", "tiktok"],
      },
      {
        id: "creative-director",
        name: "Creative Director",
        description: "Briefs visuales para imágenes/thumbnails.",
        emoji: "🖼️",
        status: "soon",
        integrations: ["claude", "canva"],
      },
    ],
  },
  {
    id: "organic",
    name: "Tráfico Orgánico",
    emoji: "📈",
    description: "TikTok + IG Reels + YouTube Shorts. Tu fase 1 (sin capital de ads).",
    agents: [
      {
        id: "organic-planner",
        name: "Organic Planner",
        description: "Calendario 14 días, 3 videos/día por cuenta. Multi-cuenta.",
        emoji: "📈",
        status: "active",
        agentId: "organic-planner",
        integrations: ["claude", "tiktok", "instagram", "youtube"],
      },
    ],
  },
  {
    id: "ads",
    name: "Tráfico Pagado",
    emoji: "📢",
    description: "Meta + TikTok + Google + YouTube. Fase 2: cuando tengas capital.",
    agents: [
      {
        id: "meta-ads",
        name: "Meta Ads Manager",
        description: "Crea, monitorea y reporta campañas Meta vía API oficial.",
        emoji: "📘",
        status: "soon",
        integrations: ["claude", "meta-ads"],
      },
      {
        id: "tiktok-ads",
        name: "TikTok Ads Manager",
        description: "Campañas TikTok Ads vía Business API.",
        emoji: "🎵",
        status: "soon",
        integrations: ["claude", "tiktok-ads"],
      },
      {
        id: "google-ads",
        name: "Google Ads Manager",
        description: "Search + Performance Max + YouTube Ads.",
        emoji: "🔎",
        status: "soon",
        integrations: ["claude", "google-ads"],
      },
      {
        id: "ads-scaler",
        name: "Ads Auto-Scaler",
        description: "Decide cuándo escalar (+20% budget) o pausar (CPA +30%).",
        emoji: "🚀",
        status: "soon",
        integrations: ["claude", "meta-ads", "tiktok-ads", "google-ads"],
      },
    ],
  },
  {
    id: "logistics",
    name: "Logística & Postventa",
    emoji: "📦",
    description: "Confirmación, novedades, garantías, torre de control Dropi.",
    agents: [
      {
        id: "order-confirmer",
        name: "Order Confirmer",
        description: "Llama/escribe a clientes para confirmar pedido (vía WhatsApp).",
        emoji: "📞",
        status: "soon",
        integrations: ["dropi", "whatsapp"],
      },
      {
        id: "novedades-resolver",
        name: "Novedades Resolver",
        description: "Detecta y resuelve incidencias de despacho automáticamente.",
        emoji: "⚠️",
        status: "soon",
        integrations: ["dropi", "whatsapp"],
      },
      {
        id: "warranty-agent",
        name: "Warranty Agent",
        description: "Gestiona garantías y devoluciones según ley consumidor Chile.",
        emoji: "🛟",
        status: "soon",
        integrations: ["claude", "dropi", "whatsapp"],
      },
      {
        id: "logistics-tower",
        name: "Logistics Tower",
        description: "Dashboard único: pedidos en ruta, demoras, KPIs por proveedor.",
        emoji: "🗼",
        status: "soon",
        integrations: ["dropi"],
      },
    ],
  },
  {
    id: "comms",
    name: "Cliente & Proveedor",
    emoji: "💬",
    description: "WhatsApp 24/7 a clientes y negociación con proveedores.",
    agents: [
      {
        id: "whatsapp-customer",
        name: "WhatsApp Cliente",
        description: "Responde clientes 24/7. Si no puede, te escala a vos.",
        emoji: "💚",
        status: "soon",
        integrations: ["claude", "whatsapp"],
      },
      {
        id: "supplier-negotiator",
        name: "Supplier Negotiator",
        description: "Negocia exclusividad y mejor precio al subir volumen.",
        emoji: "🤝",
        status: "soon",
        integrations: ["claude", "dropi", "whatsapp"],
      },
    ],
  },
  {
    id: "finance",
    name: "Contabilidad & SII",
    emoji: "💰",
    description: "Snowball reinvest, cierre mes, facturas SII Chile.",
    agents: [
      {
        id: "bookkeeper",
        name: "Bookkeeper",
        description: "Lleva libro diario auto. Conecta a tus ventas Shopify + Dropi.",
        emoji: "📒",
        status: "soon",
        integrations: ["claude", "shopify", "dropi"],
      },
      {
        id: "snowball",
        name: "Snowball Reinvestor",
        description: "Calcula cuánto reinvertir en ads/stock para maximizar bola de nieve.",
        emoji: "❄️",
        status: "soon",
        integrations: ["claude"],
      },
      {
        id: "sii-agent",
        name: "SII Chile Agent",
        description: "Prepara facturas, IVA mensual, declaración renta. Conecta a Nubox/Defontana.",
        emoji: "🇨🇱",
        status: "soon",
        integrations: ["claude", "sii"],
      },
      {
        id: "month-closer",
        name: "Month Closer",
        description: "Cierra el mes: P&L, proyección próximo mes, reporte ejecutivo.",
        emoji: "📊",
        status: "soon",
        integrations: ["claude", "shopify", "dropi"],
      },
    ],
  },
];

export const ALL_CARDS = SECTIONS.flatMap((s) => s.agents);
export const ACTIVE_AGENTS = ALL_CARDS.filter((a) => a.status === "active");
export const SOON_AGENTS = ALL_CARDS.filter((a) => a.status === "soon");
