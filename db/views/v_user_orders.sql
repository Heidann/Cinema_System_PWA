
-- ---------------------------
-- DESC: Danh sách đơn hàng của người dùng, bao gồm thông tin vé và đồ ăn/đồ uống.
-- ---------------------------
CREATE OR REPLACE VIEW v_user_orders AS
SELECT 
    o.id AS order_id,
    u.id AS user_id,
    u.name AS user_name,
    o.total_price,
    o.status,
    oi.item_type,
    oi.quantity,
    oi.price AS item_price
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON o.id = oi.order_id
WHERE o.status IN ('completed', 'pending') AND o.created_at >= NOW() - INTERVAL 30 DAY;
