
CREATE TABLE MonthlyReports (
    id SERIAL PRIMARY KEY,
    user_id TEXT,
    month TEXT,
    total_spent DECIMAL,
    top_category TEXT,
    overbudget_categories TEXT
);
