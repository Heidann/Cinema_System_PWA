-- ---------------------------
-- 1. Bảng users (Người dùng)
-- ---------------------------
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) DEFAULT 0
);

-- ---------------------------
-- 2. Bảng cinemas (Rạp chiếu phim)
-- ---------------------------
CREATE TABLE cinemas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) DEFAULT 0
);

-- ---------------------------
-- 3. Bảng rooms (Phòng chiếu phim)
-- ---------------------------
CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cinema_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) DEFAULT 0,
    FOREIGN KEY (cinema_id) REFERENCES cinemas(id),
    UNIQUE (cinema_id, name)
);
ALTER TABLE rooms
ADD COLUMN capacity INT NOT NULL CHECK (capacity > 0);

-- ---------------------------
-- 4. Bảng seats (Ghế ngồi)
-- ---------------------------
CREATE TABLE seats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL,
    seat_number VARCHAR(10) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) DEFAULT 0,
    is_status ENUM('available', "booked",'unavailable') NOT NULL DEFAULT 'available',
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    UNIQUE (room_id, seat_number)
);

-- ---------------------------
-- 5. Bảng movies (Phim)
-- ---------------------------
CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INT NOT NULL,
    image_url TEXT,
    trailer_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) DEFAULT 0
);

-- ---------------------------
-- 6. Bảng schedules (Lịch chiếu phim)
-- ---------------------------
CREATE TABLE schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    room_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    ticket_price DECIMAL(10, 2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) DEFAULT 0,
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    CONSTRAINT chk_schedule_time CHECK (start_time < end_time)
);

-- ---------------------------
-- 7. Bảng food_drinks (Đồ ăn, thức uống)
-- ---------------------------
	CREATE TABLE food_drinks (
		id INT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		price DECIMAL(10, 2) NOT NULL,
		image_url TEXT,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		is_deleted TINYINT(1) DEFAULT 0
	);

-- ---------------------------
-- 8. Bảng orders (Đơn hàng)
-- ---------------------------
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    promotion_code VARCHAR(50),
    payment_method ENUM('credit_card', 'cash', 'e_wallet') NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
ALTER TABLE orders
ADD COLUMN payment_status ENUM('pending', 'success', 'failed') DEFAULT 'pending';

-- ---------------------------
-- 9. Bảng promotions (Khuyến mãi)
-- ---------------------------
CREATE TABLE promotions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount DECIMAL(10, 2) NOT NULL,
    expiry_date DATE NOT NULL,
    is_active TINYINT(1) DEFAULT 1
);


-- ---------------------------
-- 10. Bảng tickets (Vé xem phim)
-- ---------------------------

CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    schedule_id INT NOT NULL,
    seat_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (schedule_id) REFERENCES schedules(id),
    FOREIGN KEY (seat_id) REFERENCES seats(id),
    UNIQUE (schedule_id, seat_id)
);
ALTER TABLE tickets
ADD COLUMN cinema_id INT NOT NULL ;

-- ---------------------------
-- 11. Bảng food_drink_orders (Chi tiết đồ ăn, thức uống)
-- ---------------------------
CREATE TABLE food_drink_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    food_drink_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10, 2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (food_drink_id) REFERENCES food_drinks(id)
);

-- ---------------------------
-- 12. Bảng order_items (Chi tiết đơn hàng)
-- ---------------------------
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    item_type ENUM('ticket', 'food_drink') NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10, 2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- ---------------------------
-- 13. Bảng employees (Nhân viên)
-- ---------------------------
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(20),
    position ENUM('manager', 'cashier', 'staff', 'cleaner', 'technician') NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    hire_date DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) DEFAULT 0
);

-- ---------------------------
-- 14. Bảng employee_schedules (Lịch làm việc nhân viên)
-- ---------------------------
CREATE TABLE employee_schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    work_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status ENUM('scheduled', 'completed', 'missed') DEFAULT 'scheduled',
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
ALTER TABLE employee_schedules
ADD COLUMN notes TEXT;


-- ---------------------------
-- 15. Bảng employee_accounts (Tài khoản nhân viên)
-- ---------------------------
CREATE TABLE employee_accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'staff') NOT NULL,
    last_login DATETIME,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

-- ---------------------------
-- 16. Bảng employee_salaries (Bảng lương nhân viên)
-- ---------------------------
CREATE TABLE employee_salaries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    month YEAR(4) NOT NULL,
    base_salary DECIMAL(10, 2) NOT NULL,
    bonus DECIMAL(10, 2) DEFAULT 0,
    deductions DECIMAL(10, 2) DEFAULT 0,
    total_salary DECIMAL(10, 2) AS (base_salary + bonus - deductions) STORED,
    payment_status ENUM('unpaid', 'paid') DEFAULT 'unpaid',	
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

-- ---------------------------
-- Trigger tự động xóa dữ liệu đã được đánh dấu is_deleted sau một thời gian nhất định. 
-- ---------------------------
CREATE EVENT delete_old_records
ON SCHEDULE EVERY 7 DAY
DO
    DELETE FROM users WHERE is_deleted = 1 AND updated_at < NOW() - INTERVAL 30 DAY;


-- Dữ liệu mẫu cho bảng users
INSERT INTO users (name, email, password, phone_number) VALUES
('Nguyen Van A', 'vana@example.com', 'hashed_password', '0987654321'),
('Tran Thi B', 'thib@example.com', 'hashed_password', '0976543210'),
('Le Hoang C', 'hoangc@example.com', 'hashed_password', '0965432109');

-- Dữ liệu mẫu cho bảng cinemas
INSERT INTO cinemas (name, city, address) VALUES
('Galaxy Cinema', 'Hanoi', '123 Nguyen Trai'),
('CGV Cinemas', 'HCMC', '456 Le Duan'),
('Lotte Cinema', 'Danang', '789 Tran Phu');

-- Dữ liệu mẫu cho bảng rooms
INSERT INTO rooms (cinema_id, name, capacity) VALUES
(1, 'Room 1', 100),
(1, 'Room 2', 120),
(2, 'Room A', 80),
(2, 'Room B', 90),
(3, 'Room X', 150);

-- Dữ liệu mẫu cho bảng seats
INSERT INTO seats (room_id, seat_number) VALUES
(1, 'A1'), (1, 'A2'), (1, 'B1'),
(2, 'A1'), (2, 'A2'), (2, 'B1'),
(3, 'A1'), (3, 'A2'), (3, 'B1');

-- Dữ liệu mẫu cho bảng movies
INSERT INTO movies (title, description, duration, image_url, trailer_url) VALUES
('Avengers: Endgame', 'Superheroes save the universe.', 180, 'image_url_1', 'trailer_url_1'),
('Parasite', 'A poor family infiltrates a wealthy household.', 132, 'image_url_2', 'trailer_url_2'),
('Inception', 'A mind-bending thriller.', 148, 'image_url_3', 'trailer_url_3');

-- Dữ liệu mẫu cho bảng schedules
INSERT INTO schedules (movie_id, room_id, start_time, end_time, ticket_price) VALUES
(1, 1, '2024-01-01 10:00:00', '2024-01-01 13:00:00', 100000),
(2, 2, '2024-01-01 14:00:00', '2024-01-01 16:12:00', 120000),
(3, 3, '2024-01-02 17:00:00', '2024-01-02 19:28:00', 150000);

-- Dữ liệu mẫu cho bảng food_drinks
INSERT INTO food_drinks (name, price, image_url) VALUES
('Popcorn', 50000, 'popcorn_image'),
('Coke', 30000, 'coke_image'),
('Hotdog', 45000, 'hotdog_image');

-- Dữ liệu mẫu cho bảng orders
INSERT INTO orders (user_id, total_price, promotion_code, payment_method, status) VALUES
(1, 200000, NULL, 'credit_card', 'completed'),
(2, 150000, 'PROMO2024', 'cash', 'pending'),
(3, 100000, NULL, 'e_wallet', 'cancelled');

-- Dữ liệu mẫu cho bảng promotions
INSERT INTO promotions (code, discount, expiry_date) VALUES
('PROMO2024', 20000, '2024-12-31'),
('NEWYEAR2024', 30000, '2024-01-01');

-- Dữ liệu mẫu cho bảng tickets
INSERT INTO tickets (schedule_id, seat_id, price) VALUES
(1, 1, 100000),
(2, 2, 120000),
(3, 3, 150000);

-- Dữ liệu mẫu cho bảng food_drink_orders
INSERT INTO food_drink_orders (food_drink_id, quantity, price) VALUES
(1, 2, 100000),
(2, 1, 30000),
(3, 1, 45000);

-- Dữ liệu mẫu cho bảng order_items
INSERT INTO order_items (order_id, item_type, item_id, quantity, price) VALUES
(1, 'ticket', 1, 1, 100000),
(1, 'food_drink', 2, 2, 60000),
(2, 'ticket', 2, 1, 120000);

-- Dữ liệu mẫu cho bảng employees
INSERT INTO employees (name, email, phone_number, position, salary, hire_date) VALUES
('Nguyen Van D', 'vand@example.com', '0987651234', 'manager', 20000000, '2023-01-01'),
('Tran Thi E', 'thie@example.com', '0976545678', 'cashier', 12000000, '2023-02-01'),
('Le Hoang F', 'hoangf@example.com', '0965436789', 'staff', 8000000, '2023-03-01');

-- Dữ liệu mẫu cho bảng employee_schedules
INSERT INTO employee_schedules (employee_id, work_date, start_time, end_time, status) VALUES
(1, '2024-01-01', '08:00:00', '16:00:00', 'scheduled'),
(2, '2024-01-01', '14:00:00', '22:00:00', 'scheduled'),
(3, '2024-01-02', '10:00:00', '18:00:00', 'scheduled');

-- Dữ liệu mẫu cho bảng employee_accounts
INSERT INTO employee_accounts (employee_id, username, password, role, last_login) VALUES
(1, 'manager1', 'hashed_password', 'admin', '2023-12-29 10:00:00'),
(2, 'cashier1', 'hashed_password', 'manager', NULL),
(3, 'staff1', 'hashed_password', 'staff', NULL);

-- Dữ liệu mẫu cho bảng employee_salaries
INSERT INTO employee_salaries (employee_id, month, base_salary, bonus, deductions) VALUES
(1, '2024', 20000000, 500000, 200000),
(2, '2024', 12000000, 300000, 100000),
(3, '2024', 8000000, 200000, 50000);



