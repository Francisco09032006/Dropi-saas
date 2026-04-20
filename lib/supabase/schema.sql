-- Dropi SaaS schema (Supabase)
-- Ejecutar en SQL Editor de tu proyecto Supabase cuando quieras persistir conversaciones

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  agent_id text not null,
  title text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz default now()
);

create index if not exists idx_messages_conversation on messages(conversation_id);
create index if not exists idx_conversations_agent on conversations(agent_id);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  niche text,
  source text,
  source_url text,
  cost_usd numeric,
  price_suggested_usd numeric,
  validation_score int,
  validation_verdict text check (validation_verdict in ('approved', 'maybe', 'rejected')),
  notes text,
  created_at timestamptz default now()
);

create index if not exists idx_products_niche on products(niche);
create index if not exists idx_products_verdict on products(validation_verdict);
