CREATE OR REPLACE FUNCTION generate_monthly_financial_report()
RETURNS TABLE (
    year_month TEXT,          -- YYYY-MM format
    total_sales NUMERIC,      -- Total sales amount for the month
    total_purchases NUMERIC,  -- Total purchases amount for the month
    profit NUMERIC            -- Profit = total_sales - total_purchases
) AS $$
BEGIN
    -- Ensure `monthly_item_cost` is up-to-date before generating the report
    INSERT INTO monthly_item_cost (item, cost, month, year)
    SELECT 
        i.name AS item,
        i.purchase_cost AS cost,
        EXTRACT(MONTH FROM CURRENT_DATE) AS month,
        EXTRACT(YEAR FROM CURRENT_DATE) AS year
    FROM inventory_items i
    WHERE NOT EXISTS (
        SELECT 1 
        FROM monthly_item_cost mic
        WHERE mic.item = i.name
          AND mic.month = EXTRACT(MONTH FROM CURRENT_DATE)
          AND mic.year = EXTRACT(YEAR FROM CURRENT_DATE)
    );

    -- Generate the financial report
    RETURN QUERY
    WITH monthly_range AS (
        -- Generate a series of months based on the minimum and maximum dates from both tables
        SELECT TO_CHAR(d, 'YYYY-MM') AS year_month
        FROM generate_series(
            (SELECT DATE_TRUNC('month', LEAST(MIN(sales.date), MIN(stock_purchases.date))) FROM sales, stock_purchases),
            (SELECT DATE_TRUNC('month', GREATEST(MAX(sales.date), MAX(stock_purchases.date))) FROM sales, stock_purchases),
            '1 month'::interval
        ) d
    ),
    -- Calculate total sales per month
    sales_by_month AS (
        SELECT 
            TO_CHAR(s.date, 'YYYY-MM') AS year_month,
            SUM(s.price) AS total_sales
        FROM sales s
        GROUP BY TO_CHAR(s.date, 'YYYY-MM')
    ),
    -- Calculate total purchases per month
    purchases_by_month AS (
        SELECT 
            TO_CHAR(sp.date, 'YYYY-MM') AS year_month,
            SUM(sp.price) AS total_purchases
        FROM stock_purchases sp
        GROUP BY TO_CHAR(sp.date, 'YYYY-MM')
    )
    -- Combine monthly sales and purchases
    SELECT
        mr.year_month,
        COALESCE(sbm.total_sales, 0) AS total_sales,
        COALESCE(pbm.total_purchases, 0) AS total_purchases,
        COALESCE(sbm.total_sales, 0) - COALESCE(pbm.total_purchases, 0) AS profit
    FROM 
        monthly_range mr
    LEFT JOIN sales_by_month sbm ON mr.year_month = sbm.year_month
    LEFT JOIN purchases_by_month pbm ON mr.year_month = pbm.year_month
    ORDER BY mr.year_month;
END;
$$ LANGUAGE plpgsql;
