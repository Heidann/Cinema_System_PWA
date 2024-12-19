-- ---------------------------
-- 1. Bảng users (Người dùng)
-- ---------------------------
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Mã người dùng
    name VARCHAR(255) NOT NULL, -- Tên người dùng
    email VARCHAR(255) NOT NULL UNIQUE, -- Email đăng ký
    password VARCHAR(255) NOT NULL, -- Mật khẩu mã hóa
    phone_number VARCHAR(20), -- Số điện thoại
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) DEFAULT 0 -- Xóa mềm
);

-- ---------------------------
-- 2. Bảng cinemas (Rạp chiếu phim)
-- ---------------------------
CREATE TABLE cinemas (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Mã rạp chiếu phim
    name VARCHAR(255) NOT NULL, -- Tên rạp chiếu phim
    city VARCHAR(255) NOT NULL, -- Thành phố
    address VARCHAR(255) NOT NULL, -- Địa chỉ
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) DEFAULT 0 -- Xóa mềm
);

-- ---------------------------
-- 3. Bảng rooms (Phòng chiếu phim)
-- ---------------------------
CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Mã phòng chiếu
    cinema_id INT NOT NULL, -- Rạp chiếu thuộc về
    name VARCHAR(255) NOT NULL, -- Tên phòng chiếu
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) DEFAULT 0, -- Xóa mềm
    FOREIGN KEY (cinema_id) REFERENCES cinemas(id),
    UNIQUE (cinema_id, name) -- Ràng buộc tránh trùng lặp tên phòng trong cùng một rạp
);

-- ---------------------------
-- 4. Bảng seats (Ghế ngồi)
-- ---------------------------
CREATE TABLE seats (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Mã ghế
    room_id INT NOT NULL, -- Phòng chiếu
    seat_number VARCHAR(10) NOT NULL, -- Số hiệu ghế
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) DEFAULT 0, -- Xóa mềm
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    UNIQUE (room_id, seat_number) -- Ràng buộc tránh trùng lặp số ghế trong cùng một phòng
);
ALTER TABLE seats
ADD COLUMN is_status ENUM('available', 'unavailable') NOT NULL DEFAULT 'available'
AFTER is_deleted;

-- ---------------------------
-- 5. Bảng movies (Phim)
-- ---------------------------
CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Mã phim
    title VARCHAR(255) NOT NULL, -- Tên phim
    description TEXT, -- Mô tả phim
    duration INT NOT NULL, -- Thời lượng phim (phút)
    image_url TEXT, -- URL hình ảnh
    trailer_url TEXT, -- URL trailer
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) DEFAULT 0 -- Xóa mềm
);

-- ---------------------------
-- 6. Bảng schedules (Lịch chiếu phim)
-- ---------------------------
CREATE TABLE schedules (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Mã lịch chiếu
    movie_id INT NOT NULL, -- Mã phim
    room_id INT NOT NULL, -- Mã phòng chiếu
    start_time DATETIME NOT NULL, -- Thời gian bắt đầu chiếu
    end_time DATETIME NOT NULL, -- Thời gian kết thúc chiếu
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) DEFAULT 0, -- Xóa mềm
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    CONSTRAINT chk_schedule_time CHECK (start_time < end_time)
);

-- ---------------------------
-- 7. Bảng food_drinks (Đồ ăn, thức uống)
-- ---------------------------
CREATE TABLE food_drinks (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Mã đồ ăn, thức uống
    name VARCHAR(255) NOT NULL, -- Tên đồ ăn, thức uống
    price DECIMAL(10, 2) NOT NULL, -- Giá
    image_url TEXT, -- URL hình ảnh
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) DEFAULT 0 -- Xóa mềm
);

-- ---------------------------
-- 8. Bảng orders (Đơn hàng)
-- ---------------------------
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Mã đơn hàng
    user_id INT NOT NULL, -- Người đặt hàng
    total_price DECIMAL(10, 2) NOT NULL, -- Tổng tiền
    promotion_code VARCHAR(50), -- Mã khuyến mãi
    payment_method ENUM('credit_card', 'cash', 'e_wallet') NOT NULL, -- Phương thức thanh toán
    status ENUM('pending', 'completed', 'cancelled') NOT NULL, -- Trạng thái đơn hàng
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ---------------------------
-- 9. Bảng tickets (Vé xem phim)
-- ---------------------------
CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Mã vé
    schedule_id INT NOT NULL, -- Mã lịch chiếu
    seat_id INT NOT NULL, -- Ghế ngồi
    price DECIMAL(10, 2) NOT NULL, -- Giá vé
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (schedule_id) REFERENCES schedules(id),
    FOREIGN KEY (seat_id) REFERENCES seats(id),
    UNIQUE (schedule_id, seat_id) -- Ràng buộc để mỗi ghế chỉ được đặt một lần cho một lịch chiếu
);

-- ---------------------------
-- 10. Bảng food_drink_orders (Chi tiết đồ ăn, thức uống)
-- ---------------------------
CREATE TABLE food_drink_orders (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Mã chi tiết đồ ăn, thức uống
    food_drink_id INT NOT NULL, -- Mã đồ ăn, thức uống
    quantity INT NOT NULL CHECK (quantity > 0), -- Số lượng
    price DECIMAL(10, 2) NOT NULL, -- Tổng giá
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (food_drink_id) REFERENCES food_drinks(id)
);

-- ---------------------------
-- 11. Bảng order_items (Chi tiết đơn hàng)
-- ---------------------------
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Mã chi tiết đơn hàng
    order_id INT NOT NULL, -- Mã đơn hàng
    item_type ENUM('ticket', 'food_drink') NOT NULL, -- Loại sản phẩm: 'ticket' hoặc 'food_drink'
    item_id INT NOT NULL, -- ID liên kết đến bảng con (tickets hoặc food_drink_orders)
    quantity INT NOT NULL CHECK (quantity > 0), -- Số lượng
    price DECIMAL(10, 2) NOT NULL, -- Tổng giá
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- ---------------------------
-- Dữ liệu mẫu cho bảng users
-- ---------------------------
INSERT INTO users (name, email, password, phone_number) VALUES
('Alice', 'alice@example.com', 'hashed_password1', '0123456789'),
('Bob', 'bob@example.com', 'hashed_password2', '0987654321'),
('Charlie', 'charlie@example.com', 'hashed_password3', '0912345678');

-- ---------------------------
-- Dữ liệu mẫu cho bảng cinemas
-- ---------------------------
INSERT INTO cinemas (name, city, address) VALUES
('Galaxy Nguyễn Du', 'Hồ Chí Minh', '116 Nguyễn Du, Q.1'),
('Galaxy Kinh Dương Vương', 'Hồ Chí Minh', '718 Kinh Dương Vương, Q.6'),
('Galaxy Hà Nội', 'Hà Nội', '144 Nguyễn Văn Cừ, Long Biên');

-- ---------------------------
-- Dữ liệu mẫu cho bảng rooms
-- ---------------------------
INSERT INTO rooms (cinema_id, name) VALUES
(1, 'Phòng 1'), (1, 'Phòng 2'),
(2, 'Phòng 1'), (2, 'Phòng 2'),
(3, 'Phòng 1');

-- ---------------------------
-- Dữ liệu mẫu cho bảng seats
-- ---------------------------
INSERT INTO seats (room_id, seat_number) VALUES
(1, 'A1'), (1, 'A2'), (1, 'A3'),
(2, 'B1'), (2, 'B2'), (2, 'B3'),
(3, 'C1'), (3, 'C2');

-- ---------------------------
-- Dữ liệu mẫu cho bảng movies
-- ---------------------------
INSERT INTO movies (title, description, duration, image_url, trailer_url) VALUES
('Avengers: Endgame', 'Superheroes unite to fight Thanos.', 180, 'url_to_image1', 'url_to_trailer1'),
('Frozen II', 'Anna and Elsa go on a new adventure.', 120, 'url_to_image2', 'url_to_trailer2');

-- ---------------------------
-- Dữ liệu mẫu cho bảng schedules
-- ---------------------------
INSERT INTO schedules (movie_id, room_id, start_time, end_time) VALUES
(1, 1, '2024-12-21 18:00:00', '2024-12-21 21:00:00'),
(2, 2, '2024-12-21 14:00:00', '2024-12-21 16:00:00');

-- ---------------------------
-- Dữ liệu mẫu cho bảng food_drinks
-- ---------------------------
INSERT INTO food_drinks (name, price, image_url) VALUES
('Popcorn', 5.00, 'url_to_popcorn_image'),
('Soda', 2.50, 'url_to_soda_image'),
('Combo (Popcorn + Soda)', 7.00, 'url_to_combo_image');

-- ---------------------------
-- Dữ liệu mẫu cho bảng orders
-- ---------------------------
INSERT INTO orders (user_id, total_price, promotion_code, payment_method, status) VALUES
(1, 50.00, 'DISCOUNT10', 'credit_card', 'completed'),
(2, 35.00, NULL, 'cash', 'pending');

-- ---------------------------
-- Dữ liệu mẫu cho bảng tickets
-- ---------------------------
INSERT INTO tickets (schedule_id, seat_id, price) VALUES
(1, 1, 10.00), -- A1
(1, 2, 10.00), -- A2
(2, 4, 15.00); -- B1

-- ---------------------------
-- Dữ liệu mẫu cho bảng food_drink_orders
-- ---------------------------
INSERT INTO food_drink_orders (food_drink_id, quantity, price) VALUES
(1, 2, 10.00), -- 2 Popcorn
(2, 1, 2.50);  -- 1 Soda

-- ---------------------------
-- Dữ liệu mẫu cho bảng order_items
-- ---------------------------
INSERT INTO order_items (order_id, item_type, item_id, quantity, price) VALUES
(1, 'ticket', 1, 1, 10.00), -- 1 ticket
(1, 'ticket', 2, 1, 10.00), -- 1 ticket
(1, 'food_drink', 1, 2, 10.00); -- 2 Popcorn

