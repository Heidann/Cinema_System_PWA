
-- ---------------------------
-- DESC: Lịch chiếu phim chi tiết
-- ---------------------------
CREATE OR REPLACE VIEW v_detailed_schedule AS
SELECT 
    sch.id AS schedule_id,
    m.title AS movie_title,
    c.name AS cinema_name,
    r.name AS room_name,
    sch.start_time,
    sch.end_time
FROM schedules sch
JOIN movies m ON sch.movie_id = m.id
JOIN rooms r ON sch.room_id = r.id
JOIN cinemas c ON r.cinema_id = c.id
WHERE sch.is_deleted = 0 AND m.is_deleted = 0 AND c.is_deleted = 0 AND r.is_deleted = 0;
