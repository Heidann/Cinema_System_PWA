
-- ---------------------------
-- DESC: Xem lịch sử đặt vé và mua đồ ăn/đồ uống của từng người dùng.
-- ---------------------------
CREATE OR REPLACE VIEW v_order_history AS
SELECT 
    o.id AS order_id,
    u.id AS user_id,
    u.name AS user_name,
    o.total_price,
    oi.item_type,
    CASE 
        WHEN oi.item_type = 'ticket' THEN (
            SELECT CONCAT('Seat: ', s.seat_number, ', Schedule ID: ', t.schedule_id)
            FROM tickets t
            JOIN seats s ON t.seat_id = s.id
            WHERE t.id = oi.item_id
        )
        WHEN oi.item_type = 'food_drink' THEN (
            SELECT fd.name
            FROM food_drink_orders fdo
            JOIN food_drinks fd ON fdo.food_drink_id = fd.id
            WHERE fdo.id = oi.item_id
        )
        ELSE NULL
    END AS item_details,
    oi.quantity,
    oi.price
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON o.id = oi.order_id;
