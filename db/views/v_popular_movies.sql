
-- ---------------------------
-- DESC: Thống kê số lượng vé bán ra cho từng phim trong khoảng thời gian 30 ngày gần nhất.
-- ---------------------------
CREATE OR REPLACE VIEW v_popular_movies AS
SELECT 
    m.id AS movie_id,
    m.title AS movie_title,
    COUNT(t.id) AS tickets_sold,
    SUM(t.price) AS total_revenue
FROM movies m
JOIN schedules sch ON m.id = sch.movie_id
JOIN tickets t ON sch.id = t.schedule_id
WHERE m.is_deleted = 0 AND sch.is_deleted = 0 AND t.created_at >= NOW() - INTERVAL 30 DAY
GROUP BY m.id, m.title
ORDER BY tickets_sold DESC, total_revenue DESC;
