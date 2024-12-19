
-- ---------------------------
-- DESC: Liệt kê tất cả ghế ngồi trong từng phòng và rạp
-- ---------------------------
CREATE OR REPLACE VIEW v_cinema_room_seats AS
SELECT 
    c.id AS cinema_id,
    c.name AS cinema_name,
    r.id AS room_id,
    r.name AS room_name,
    s.id AS seat_id,
    s.seat_number
FROM cinemas c
JOIN rooms r ON c.id = r.cinema_id
JOIN seats s ON r.id = s.room_id
WHERE c.is_deleted = 0 AND r.is_deleted = 0 AND s.is_deleted = 0;
