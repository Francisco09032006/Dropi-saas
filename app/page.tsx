import Link from "next/link";
import { AGENT_LIST } from "@/lib/agents/prompts";

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🛒</span>
          <h1 className="text-3xl font-bold">Dropi SaaS</h1>
        </div>
        <p className="text-[var(--muted)] text-lg max-w-2xl">
          Torre de control multi-agente para operar dropshipping de nicho. 7 agentes
          especializados delegan investigación, validación, montaje de tienda y
          tráfico orgánico.
        </p>
        <p className="text-[var(--muted)] text-sm mt-3">
          Empezá por el <strong className="text-[var(--accent)]">Strategy Planner</strong>
          {" — "}te pregunta tu situación y arma el plan.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-5">Agentes disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AGENT_LIST.map((agent) => (
            <Link
              key={agent.id}
              href={`/agent/${agent.id}`}
              className="block p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] hover:bg-[#181818] transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{agent.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base mb-1">{agent.name}</h3>
                  <p className="text-sm text-[var(--muted)] leading-snug">
                    {agent.description}
                  </p>
                  <p className="text-xs text-[var(--muted)] mt-2 font-mono">
                    {agent.model}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-16 pt-6 border-t border-[var(--border)] text-sm text-[var(--muted)]">
        <p>
          Stack: Next.js 15 · Claude API (Opus 4.7 + Haiku 4.5) · Supabase ·
          Vercel
        </p>
        <p className="mt-1">
          ⚠️ Requiere <code className="bg-[#1f1f1f] px-1 rounded">ANTHROPIC_API_KEY</code>{" "}
          en variables de entorno.
        </p>
      </footer>
    </main>
  );
}
