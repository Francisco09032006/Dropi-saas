import { notFound } from "next/navigation";
import { AGENTS, AGENT_LIST, type AgentId } from "@/lib/agents/prompts";
import { Chat } from "@/components/chat";

export function generateStaticParams() {
  return AGENT_LIST.map((a) => ({ agentId: a.id }));
}

export default async function AgentPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;
  const agent = AGENTS[agentId as AgentId];
  if (!agent) notFound();
  return <Chat agent={agent} />;
}
