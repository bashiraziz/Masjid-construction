CREATE TABLE IF NOT EXISTS donations (
  id SERIAL PRIMARY KEY,
  donor_name VARCHAR(255) NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  donation_date DATE NOT NULL,
  project_id INTEGER
);

-- Seed data (adjust project_id to match your existing projects in lib/data.ts)
INSERT INTO donations (donor_name, amount, donation_date, project_id) VALUES
('Anonymous', 50.00, '2025-07-04', 1),
('Fatima H.', 200.00, '2025-07-03', 2),
('Yusuf A.', 100.00, '2025-07-03', 1),
('Anonymous', 1000.00, '2025-07-02', 2),
('The Khan Family', 500.00, '2025-07-01', 2),
('Anonymous', 20.00, '2025-06-30', 1)
ON CONFLICT (id) DO NOTHING; -- Prevents re-inserting if script is run multiple times
