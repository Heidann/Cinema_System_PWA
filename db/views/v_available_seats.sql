
-- ---------------------------
-- DESC: Danh sách ghế ngồi khả dụng theo lịch chiếu
-- ---------------------------
CREATE OR REPLACE VIEW v_available_seats AS
SELECT 
    s.id AS seat_id,
    s.room_id,
    sch.id AS schedule_id,
    s.seat_number
FROM seats s
JOIN schedules sch ON s.room_id = sch.room_id
LEFT JOIN tickets t ON t.seat_id = s.id AND t.schedule_id = sch.id
WHERE t.id IS NULL 
  AND s.is_deleted = 0 
  AND sch.is_deleted = 0
  AND s.is_status = 'available'; -- Thêm kiểm tra trạng thái ghế
