
-- ---------------------------
-- DESC: Tổng hợp đơn hàng
-- ---------------------------
CREATE OR REPLACE VIEW v_order_summary AS
SELECT 
    o.id AS order_id,
    u.name AS user_name,
    o.total_price,
    o.status,
    oi.item_type,
    oi.quantity,
    oi.price AS item_price
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON o.id = oi.order_id
WHERE o.status = 'completed';
