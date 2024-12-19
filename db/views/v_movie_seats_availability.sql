
-- ---------------------------
-- DESC: Hiển thị số ghế còn trống và đã đặt theo lịch chiếu.
-- ---------------------------
CREATE OR REPLACE VIEW v_movie_seats_availability AS
SELECT 
    sch.id AS schedule_id,
    m.title AS movie_title,
    r.name AS room_name,
    COUNT(s.id) AS total_seats,
    COUNT(t.id) AS booked_seats,
    COUNT(s.id) - COUNT(t.id) AS available_seats
FROM schedules sch
JOIN rooms r ON sch.room_id = r.id
JOIN cinemas c ON r.cinema_id = c.id
JOIN movies m ON sch.movie_id = m.id
JOIN seats s ON r.id = s.room_id
LEFT JOIN tickets t ON s.id = t.seat_id AND t.schedule_id = sch.id
WHERE sch.is_deleted = 0 AND m.is_deleted = 0 AND c.is_deleted = 0 AND r.is_deleted = 0
GROUP BY sch.id, m.title, r.name;
