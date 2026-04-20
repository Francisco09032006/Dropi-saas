import Link from "next/link";
import { SECTIONS, ACTIVE_AGENTS, SOON_AGENTS } from "@/lib/agents/sections";
import { INTEGRATIONS, INTEGRATIONS_MAP } from "@/lib/integrations";

const FLOW_STEPS = [
  { n: 1, title: "Diagnóstico", agent: "strategy-planner", emoji: "🎛️" },
  { n: 2, title: "Buscar producto", agent: "product-hunter", emoji: "🎯" },
  { n: 3, title: "Validar el winner", agent: "winner-validator", emoji: "✅" },
  { n: 4, title: "Espiar competencia", agent: "competitor-scout", emoji: "🔍" },
  { n: 5, title: "Armar oferta", agent: "offer-builder", emoji: "🎁" },
  { n: 6, title: "Montar tienda", agent: "store-builder", emoji: "🏪" },
  { n: 7, title: "Crear hooks", agent: "hook-writer", emoji: "🎤" },
  { n: 8, title: "Bajar videos", agent: "video-scraper", emoji: "🎬" },
  { n: 9, title: "Calendario orgánico", agent: "organic-planner", emoji: "📈" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 max-w-7xl mx-auto">
      {/* HERO */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">🛒</span>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">Dropi SaaS</h1>
            <p className="text-xs text-[var(--muted)] font-mono">
              v0.2 · {ACTIVE_AGENTS.length} agentes activos · {SOON_AGENTS.length} en roadmap
            </p>
          </div>
        </div>
        <p className="text-[var(--muted)] text-base sm:text-lg max-w-3xl mt-3">
          Torre de control multi-agente para operar dropshipping de nicho end-to-end.
          De buscar el producto winner hasta cerrar el mes con SII.
        </p>
      </header>

      {/* QUICK START FLOW */}
      <section className="mb-12 p-5 rounded-2xl border border-[var(--accent)]/30 bg-gradient-to-br from-[#0d2018] to-[#0a0a0a]">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🚀</span>
          <h2 className="text-lg font-semibold">Empezá acá — flujo de 9 pasos</h2>
        </div>
        <p className="text-sm text-[var(--muted)] mb-4">
          Seguí los agentes en orden. Cada uno entrega lo que el siguiente necesita.
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
          {FLOW_STEPS.map((s) => (
            <Link
              key={s.n}
              href={`/agent/${s.agent}`}
              className="snap-start shrink-0 w-36 p-3 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-colors"
            >
              <div className="flex items-center gap-1 text-xs text-[var(--muted)] mb-1">
                <span className="font-mono">{String(s.n).padStart(2, "0")}</span>
                <span>·</span>
                <span>{s.emoji}</span>
              </div>
              <p className="text-sm font-medium leading-tight">{s.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTIONS */}
      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-xl font-semibold">Mapa completo del dropshipping</h2>
          <Link
            href="/integrations"
            className="text-sm text-[var(--accent)] hover:underline"
          >
            Ver integraciones →
          </Link>
        </div>

        <div className="space-y-8">
          {SECTIONS.map((section) => (
            <div key={section.id}>
              <div className="flex items-baseline gap-2 mb-3 pb-2 border-b border-[var(--border)]">
                <span className="text-xl">{section.emoji}</span>
                <h3 className="text-lg font-semibold">{section.name}</h3>
                <span className="text-xs text-[var(--muted)] ml-2">
                  {section.description}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {section.agents.map((agent) => {
                  const isActive = agent.status === "active";
                  const Tag = isActive ? Link : "div";
                  const props = isActive
                    ? { href: `/agent/${agent.agentId!}` }
                    : {};
                  return (
                    <Tag
                      key={agent.id}
                      {...(props as any)}
                      className={
                        "block p-4 rounded-xl border transition-all " +
                        (isActive
                          ? "border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] hover:bg-[#181818] cursor-pointer"
                          : "border-[var(--border)] bg-[#0f0f0f] opacity-70 cursor-not-allowed")
                      }
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0">{agent.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm">{agent.name}</h4>
                            {isActive ? (
                              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[var(--accent)]/20 text-[var(--accent)]">
                                Activo
                              </span>
                            ) : (
                              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#2a2a2a] text-[var(--muted)]">
                                Próximamente
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[var(--muted)] leading-snug">
                            {agent.description}
                          </p>
                          {agent.integrations && agent.integrations.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {agent.integrations.map((iid) => {
                                const i = INTEGRATIONS_MAP[iid];
                                if (!i) return null;
                                return (
                                  <span
                                    key={iid}
                                    title={i.name}
                                    className="text-[10px] px-1.5 py-0.5 rounded bg-[#1a1a1a] border border-[var(--border)] text-[var(--muted)]"
                                  >
                                    {i.emoji} {i.name}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </Tag>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTEGRATIONS QUICK VIEW */}
      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-xl font-semibold">Apps que se enlazan</h2>
          <Link
            href="/integrations"
            className="text-sm text-[var(--accent)] hover:underline"
          >
            Detalle completo →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {INTEGRATIONS.map((i) => {
            const dotColor =
              i.status === "configurable"
                ? "bg-[var(--accent)]"
                : i.status === "connected"
                  ? "bg-blue-500"
                  : "bg-[#444]";
            return (
              <div
                key={i.id}
                className="p-3 rounded-lg border border-[var(--border)] bg-[var(--card)]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{i.emoji}</span>
                  <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                  <span className="text-sm font-medium truncate">{i.name}</span>
                </div>
                <p className="text-[11px] text-[var(--muted)] leading-tight">
                  {i.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-6 border-t border-[var(--border)] text-sm text-[var(--muted)] space-y-1">
        <p>
          Stack: Next.js 16 · Claude API (Opus 4.7 + Haiku 4.5) · Supabase · Vercel
        </p>
        <p>
          ⚠️ Requiere{" "}
          <code className="bg-[#1f1f1f] px-1 rounded">ANTHROPIC_API_KEY</code> en
          Vercel → Settings → Environment Variables.
        </p>
      </footer>
    </main>
  );
}
