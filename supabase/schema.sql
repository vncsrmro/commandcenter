-- ============================================
-- PaperX Command Center - Supabase SQL Setup
-- Execute este código no SQL Editor do Supabase
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. TABELA DE CLIENTES
-- ============================================
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'blocked', 'cancelled')),
  plan VARCHAR(20) NOT NULL DEFAULT 'essential' CHECK (plan IN ('essential', 'professional', 'enterprise')),
  due_date DATE,
  monthly_value DECIMAL(10, 2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index para buscas
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_clients_slug ON clients(slug);

-- ============================================
-- 2. TABELA DE CREDENCIAIS (Cofre de Senhas)
-- ============================================
CREATE TABLE vault_credentials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL, -- Opcional, pode ser 'global'
  title VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password_encrypted TEXT NOT NULL, -- Correspondendo ao frontend
  url VARCHAR(500),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_vault_credentials_client ON vault_credentials(client_id);

-- ============================================
-- 3. TABELA DE TRANSAÇÕES FINANCEIRAS
-- ============================================
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('paid', 'pending', 'overdue')),
  amount DECIMAL(10, 2) NOT NULL,
  description VARCHAR(500) NOT NULL,
  due_date DATE NOT NULL,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_client ON transactions(client_id);

-- ============================================
-- 4. TRIGGER PARA UPDATED_AT
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger em todas as tabelas
CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER vault_credentials_updated_at
  BEFORE UPDATE ON vault_credentials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ...

CREATE POLICY "Allow all for authenticated users" ON vault_credentials
  FOR ALL USING (true);

-- ...

-- Credenciais (exemplo)
INSERT INTO vault_credentials (client_id, title, username, password_encrypted, url, notes)
SELECT id, 'Painel Admin', 'admin@' || slug || '.com', 'S3cur3P@ss!', 'https://' || slug || '.com/admin', 'Acesso principal'
FROM clients WHERE slug = 'tech-solutions';

INSERT INTO vault_credentials (client_id, title, username, password_encrypted, url, notes)
SELECT id, 'Banco de Dados', 'db_admin', 'Db@dmin2024!', 'mysql://db.' || slug || '.com:3306', NULL
FROM clients WHERE slug = 'tech-solutions';

INSERT INTO vault_credentials (client_id, title, username, password_encrypted, url, notes)
SELECT id, 'Hostinger SSH', 'u123456789', 'H0st!ng3r2024', 'ssh://premium123.hostinger.com', 'Porta 22'
FROM clients WHERE slug = 'digital-agency';

INSERT INTO vault_credentials (client_id, title, username, password_encrypted, url, notes)
SELECT id, 'AWS Console', 'startupx-admin', 'Aws@StartupX!', 'https://console.aws.amazon.com', 'Região us-east-1'
FROM clients WHERE slug = 'startupx';

-- Transações
INSERT INTO transactions (client_id, type, status, amount, description, due_date, paid_at)
SELECT id, 'income', 'paid', 599.00, 'Mensalidade Janeiro', '2024-01-20', NOW()
FROM clients WHERE slug = 'tech-solutions';

INSERT INTO transactions (client_id, type, status, amount, description, due_date)
SELECT id, 'income', 'pending', 899.00, 'Mensalidade Janeiro', '2024-01-22'
FROM clients WHERE slug = 'digital-agency';

INSERT INTO transactions (client_id, type, status, amount, description, due_date)
SELECT id, 'income', 'pending', 349.00, 'Mensalidade Janeiro', '2024-01-25'
FROM clients WHERE slug = 'startupx';

INSERT INTO transactions (client_id, type, status, amount, description, due_date)
SELECT id, 'income', 'overdue', 599.00, 'Mensalidade Janeiro', '2024-01-10'
FROM clients WHERE slug = 'old-corp';

-- Despesas
INSERT INTO transactions (type, status, amount, description, due_date, paid_at) VALUES
  ('expense', 'paid', 150.00, 'Servidor Cloud - DigitalOcean', '2024-01-15', NOW()),
  ('expense', 'paid', 49.00, 'Domínios - Cloudflare', '2024-01-10', NOW());

-- ============================================
-- FIM DO SCRIPT
-- ============================================
