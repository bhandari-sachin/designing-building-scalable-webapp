# Benchmarking Indexing
## Starting schema

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0
);

INSERT INTO products (name, stock_quantity)
SELECT
  'Product ' || n AS name,
  (FLOOR(RANDOM() * 1000) + 1)::INTEGER AS stock_quantity
FROM generate_series(1, 1000000) AS s(n);
```

## Query performance

### Select a product based on the name

```sql
SELECT * FROM products WHERE name = 'Product 42';
```

Average execution duration over 5 queries: 26.567 ms


### Selecting products based on low stock quantity

```sql
SELECT * FROM products WHERE stock_quantity < 5;
```

Average execution duration over 5 queries: 25.085 ms



## Added indexes

```sql
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_stock_quantity ON products(stock_quantity);
```

Results after adding the indexes:

### Select a product based on the name

```sql
SELECT * FROM products WHERE name = 'Product 42';
```

Average execution duration over 5 queries: 0.063 ms


### Selecting products based on low stock quantity

```sql
SELECT * FROM products WHERE stock_quantity < 5;
```

Average execution duration over 5 queries: 3.274 ms
