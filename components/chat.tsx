"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AgentConfig } from "@/lib/agents/prompts";
import { ACTIVE_AGENTS } from "@/lib/agents/sections";

type Msg = { role: "user" | "assistant"; content: string };

export function Chat({ agent }: { agent: AgentConfig }) {
  const router = useRouter();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  async function send(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Msg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages([...newMessages, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`/api/agents/${agent.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: "Error" }));
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: `❌ ${err.error ?? `Error ${res.status}`}`,
          },
        ]);
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...newMessages, { role: "assistant", content: acc }]);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error de red";
      setMessages([
        ...newMessages,
        { role: "assistant", content: `❌ ${msg}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setMessages([]);
    setInput("");
  }

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <header className="border-b border-[var(--border)] bg-[var(--card)] px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/"
            className="text-[var(--muted)] hover:text-[var(--fg)] text-sm shrink-0"
          >
            ←
          </Link>
          <span className="text-2xl shrink-0">{agent.emoji}</span>
          <div className="min-w-0">
            <h1 className="font-semibold truncate">{agent.name}</h1>
            <p className="text-xs text-[var(--muted)] truncate hidden sm:block">
              {agent.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <select
            value={agent.id}
            onChange={(e) => router.push(`/agent/${e.target.value}`)}
            className="text-xs bg-[#1a1a1a] border border-[var(--border)] rounded-md px-2 py-1 hover:border-[var(--accent)] cursor-pointer max-w-[140px]"
            title="Cambiar de agente"
          >
            {ACTIVE_AGENTS.map((a) => (
              <option key={a.agentId} value={a.agentId}>
                {a.emoji} {a.name}
              </option>
            ))}
          </select>
          {messages.length > 0 && (
            <button
              onClick={reset}
              className="text-xs text-[var(--muted)] hover:text-[var(--fg)] border border-[var(--border)] px-3 py-1 rounded-md"
              title="Limpiar conversación"
            >
              Nueva
            </button>
          )}
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center text-[var(--muted)] mt-16">
              <p className="text-lg mb-2">{agent.emoji}</p>
              <p>Hablale al agente para arrancar.</p>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              }
            >
              <div
                className={
                  m.role === "user"
                    ? "max-w-[85%] bg-[var(--accent)] text-black px-4 py-3 rounded-2xl rounded-br-sm whitespace-pre-wrap"
                    : "max-w-[90%] bg-[var(--card)] border border-[var(--border)] px-4 py-3 rounded-2xl rounded-bl-sm prose-chat"
                }
              >
                {m.role === "user" ? (
                  m.content
                ) : m.content === "" && loading ? (
                  <span className="inline-flex gap-1">
                    <span className="w-2 h-2 bg-[var(--muted)] rounded-full animate-pulse" />
                    <span className="w-2 h-2 bg-[var(--muted)] rounded-full animate-pulse [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-[var(--muted)] rounded-full animate-pulse [animation-delay:0.4s]" />
                  </span>
                ) : (
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={send}
        className="border-t border-[var(--border)] bg-[var(--card)] px-4 py-4"
      >
        <div className="max-w-3xl mx-auto flex items-end gap-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(e as unknown as FormEvent);
              }
            }}
            placeholder={`Escribile a ${agent.name}…  (Enter para enviar, Shift+Enter salto)`}
            disabled={loading}
            rows={1}
            className="flex-1 bg-[#1a1a1a] border border-[var(--border)] rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-[var(--accent)] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black font-medium px-5 py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
