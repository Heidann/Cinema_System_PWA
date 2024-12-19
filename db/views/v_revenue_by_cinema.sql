
-- ---------------------------
-- DESC: Thống kê doanh thu theo từng rạp chiếu.
-- ---------------------------
CREATE OR REPLACE VIEW v_revenue_by_cinema AS
SELECT 
    c.id AS cinema_id,
    c.name AS cinema_name,
    SUM(t.price) AS ticket_revenue,
    SUM(CASE 
            WHEN oi.item_type = 'food_drink' THEN oi.price
            ELSE 0
        END) AS food_drink_revenue,
    SUM(t.price) + SUM(CASE 
                           WHEN oi.item_type = 'food_drink' THEN oi.price
                           ELSE 0
                       END) AS total_revenue
FROM cinemas c
JOIN rooms r ON c.id = r.cinema_id
JOIN schedules sch ON r.id = sch.room_id
JOIN tickets t ON sch.id = t.schedule_id
LEFT JOIN order_items oi ON t.id = oi.item_id AND oi.item_type = 'ticket'
WHERE c.is_deleted = 0
GROUP BY c.id, c.name;
