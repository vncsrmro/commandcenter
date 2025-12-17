-- =========================================================
-- MIGRATION SCRIPT - Execute este arquivo para criar as tabelas faltantes
-- =========================================================

-- 1. Tabela Cofre de Senhas (vault_credentials)
CREATE TABLE IF NOT EXISTS vault_credentials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password_encrypted TEXT NOT NULL,
  url VARCHAR(500),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vault_credentials_client ON vault_credentials(client_id);

-- 2. Tabela Transações (transactions)
CREATE TABLE IF NOT EXISTS transactions (
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

CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_client ON transactions(client_id);

-- 3. Habilitar RLS
ALTER TABLE vault_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- 4. Criar Políticas (Policies)
-- Removemos políticas antigas se existirem para evitar conflito
DROP POLICY IF EXISTS "Allow all for authenticated users" ON vault_credentials;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON transactions;

CREATE POLICY "Allow all for authenticated users" ON vault_credentials FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON transactions FOR ALL USING (true);

-- 5. Triggers para updated_at
-- Função já deve existir se a tabela clients existe, mas garantimos:
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS vault_credentials_updated_at ON vault_credentials;
CREATE TRIGGER vault_credentials_updated_at
  BEFORE UPDATE ON vault_credentials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS transactions_updated_at ON transactions;
CREATE TRIGGER transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
