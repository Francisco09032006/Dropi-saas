import Link from "next/link";
import { INTEGRATIONS, type Integration } from "@/lib/integrations";

const CATEGORY_LABELS: Record<Integration["category"], string> = {
  ai: "🧠 Inteligencia Artificial",
  supplier: "📦 Proveedores & Catálogo",
  store: "🛍️ Tienda Online",
  ads: "📢 Publicidad Pagada",
  social: "📱 Redes Sociales (Orgánico)",
  comms: "💬 Comunicación",
  finance: "💰 Finanzas & Impuestos",
  design: "🎨 Diseño",
};

const STATUS_BADGE: Record<Integration["status"], { label: string; color: string }> = {
  configurable: {
    label: "CONFIGURABLE AHORA",
    color: "bg-[var(--accent)]/20 text-[var(--accent)] border-[var(--accent)]/40",
  },
  connected: {
    label: "CONECTADO",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/40",
  },
  soon: {
    label: "PRÓXIMAMENTE",
    color: "bg-[#2a2a2a] text-[var(--muted)] border-[var(--border)]",
  },
};

export default function IntegrationsPage() {
  const byCategory = INTEGRATIONS.reduce(
    (acc, i) => {
      (acc[i.category] = acc[i.category] || []).push(i);
      return acc;
    },
    {} as Record<Integration["category"], Integration[]>
  );

  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 max-w-5xl mx-auto">
      <header className="mb-10">
        <Link
          href="/"
          className="text-sm text-[var(--muted)] hover:text-[var(--fg)]"
        >
          ← Volver al dashboard
        </Link>
        <h1 className="text-3xl font-bold mt-3">Integraciones</h1>
        <p className="text-[var(--muted)] mt-2 max-w-2xl">
          Apps externas que el SaaS conecta. Cada agente declara qué necesita;
          algunas ya funcionan (Claude API), otras están en roadmap (Fase 2).
        </p>
      </header>

      <section className="mb-8 p-4 rounded-xl border border-[var(--accent)]/30 bg-[#0d2018]/50">
        <h2 className="font-semibold mb-2">📋 Cómo configurar una integración</h2>
        <ol className="text-sm text-[var(--muted)] space-y-1 list-decimal pl-5">
          <li>Creá cuenta en el servicio (link de signup en cada card).</li>
          <li>Generá API key / access token desde su panel.</li>
          <li>
            En Vercel → tu proyecto → Settings → Environment Variables, agregá la
            variable que indica la card.
          </li>
          <li>Redeploy (Deployments → ⋯ → Redeploy).</li>
        </ol>
      </section>

      {(Object.keys(CATEGORY_LABELS) as Integration["category"][]).map(
        (cat) => {
          const items = byCategory[cat];
          if (!items?.length) return null;
          return (
            <section key={cat} className="mb-10">
              <h2 className="text-lg font-semibold mb-3 pb-2 border-b border-[var(--border)]">
                {CATEGORY_LABELS[cat]}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {items.map((i) => {
                  const badge = STATUS_BADGE[i.status];
                  return (
                    <div
                      key={i.id}
                      className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]"
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-3xl shrink-0">{i.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold">{i.name}</h3>
                            <span
                              className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border ${badge.color}`}
                            >
                              {badge.label}
                            </span>
                          </div>
                          <p className="text-sm text-[var(--muted)] leading-snug">
                            {i.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3 text-xs">
                        {i.envVar && (
                          <code className="bg-[#1a1a1a] border border-[var(--border)] px-2 py-1 rounded font-mono">
                            {i.envVar}
                          </code>
                        )}
                        {i.signupUrl && (
                          <a
                            href={i.signupUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent)] hover:underline"
                          >
                            Crear cuenta ↗
                          </a>
                        )}
                        {i.docsUrl && (
                          <a
                            href={i.docsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent)] hover:underline"
                          >
                            Docs ↗
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        }
      )}
    </main>
  );
}
