# Dropi SaaS — Multi-Agent Dropshipping Platform

SaaS multi-agente para operación de dropshipping. 7 agentes especializados que delegan investigación de productos winner, montaje de tienda Shopify, scraping de videos TikTok, análisis de competencia en Meta Ad Library, y planificación de tráfico orgánico.

**Stack:** Next.js 15 · TypeScript · Tailwind v4 · Claude API (Opus 4.7 + Haiku 4.5) · Supabase · Vercel

## Agentes

| Agente | Función | Modelo |
|---|---|---|
| `strategy-planner` | Maestro: te pregunta recursos, arma plan, delega | Opus 4.7 |
| `product-hunter` | Busca winners en Dropi, TikTok, Meta Ad Library | Opus 4.7 |
| `winner-validator` | Valida producto: 5 efectos wow, proveedor, Ad Library | Opus 4.7 |
| `competitor-scout` | Detecta anuncios >15 días corriendo (green flag) | Opus 4.7 |
| `video-scraper` | Genera plan de scraping de videos TikTok sin marca de agua | Haiku 4.5 |
| `store-builder` | Diseña tienda Shopify nicho: políticas, copys, estructura | Opus 4.7 |
| `organic-planner` | Calendario contenido TikTok/IG/Shorts | Haiku 4.5 |

## Setup local

```bash
npm install
cp .env.example .env.local
# Editar .env.local con tus keys
npm run dev
```

## Deploy a Vercel desde GitHub

1. Crear repo en GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/dropi-saas.git
   git push -u origin main
   ```

2. En [vercel.com](https://vercel.com) → **Add New Project** → importar el repo.

3. **Environment Variables** — agregar:
   - `ANTHROPIC_API_KEY` (de https://console.anthropic.com)
   - `NEXT_PUBLIC_SUPABASE_URL` (opcional Fase 1)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (opcional Fase 1)
   - `SUPABASE_SERVICE_ROLE_KEY` (opcional Fase 1)

4. **Deploy** — Vercel detecta Next.js automáticamente.

> **Mínimo viable:** solo necesitas `ANTHROPIC_API_KEY` para usar los agentes. Supabase es para persistir conversaciones (Fase 2).

## Schema Supabase (opcional)

Cuando quieras persistir conversaciones, ejecutar `lib/supabase/schema.sql` en el SQL editor de tu proyecto Supabase.
