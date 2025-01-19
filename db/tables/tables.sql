-- ---------------------------
-- 1. Bảng customers (Người dùng)
-- ---------------------------
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) NOT NULL, -- UNIQUE
    name VARCHAR(255) NOT NULL, -- UNIQUE
    email VARCHAR(255) NOT NULL, -- UNIQUE
    password TEXT NOT NULL,
    phone_number VARCHAR(13) NOT NULL, -- UNIQUE
    sex VARCHAR(5) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------
-- 2. Bảng cinemas (Rạp chiếu phim)
-- ---------------------------
ALTER SEQUENCE auto_max_999
START WITH 1
INCREMENT BY 1
MAXVALUE 999;

CREATE TABLE cinemas (
    id INT NOT NULL DEFAULT nextval('auto_max_999'),
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
	PRIMARY KEY (id)
);

-- ---------------------------
-- 3. Bảng rooms (Phòng chiếu phim)
-- ---------------------------
CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    cinema_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    capacity INT NOT NULL CHECK (capacity > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_status VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (cinema_id) REFERENCES cinemas(id),
    UNIQUE (cinema_id, name)
);

-- ---------------------------
-- 4. Bảng seats (Ghế ngồi)
-- ---------------------------
-- CREATE TYPE seat_status AS ENUM ('available', 'booked', 'unavailable');

CREATE TABLE seats (
    id SERIAL PRIMARY KEY,
    room_id INT NOT NULL,
    seat_number VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    is_status VARCHAR(255) NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    UNIQUE (room_id, seat_number)
);

-- ---------------------------
-- 5. Bảng movies (Phim)
-- ---------------------------
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    duration INT NOT NULL,
    image_url TEXT,
    trailer_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_status VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE
);

-- ---------------------------
-- 6. Bảng schedules (Lịch chiếu phim)
-- ---------------------------
CREATE TABLE schedules (
    id SERIAL PRIMARY KEY,
    movie_id INT NOT NULL,
    room_id INT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    ticket_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_status VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    CHECK (start_time < end_time)
);

-- ---------------------------
-- 7. Bảng food_drinks (Đồ ăn, thức uống)
-- ---------------------------
CREATE TABLE food_drinks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_status VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE
);

-- ---------------------------
-- 8. Bảng orders (Đơn hàng)
-- ---------------------------
-- CREATE TYPE payment_method AS ENUM ('credit_card', 'cash', 'e_wallet');
-- CREATE TYPE order_status AS ENUM ('pending', 'completed', 'cancelled');
-- CREATE TYPE payment_status AS ENUM ('pending', 'success', 'failed');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) NOT NULL,
    customer_id INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    promotion_code VARCHAR(50),
    actual_price DECIMAL(10, 2) NOT NULL, --  số tiền thực tế
    payment_method VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    payment_status VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- ---------------------------
-- 9. Bảng promotions (Khuyến mãi)
-- ---------------------------
CREATE TABLE promotions (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount DECIMAL(10, 2) NOT NULL,
    promotion_type VARCHAR(255) NOT NULL, --  loại giảm giá: ticket or food_drink
    start_date TIMESTAMP NOT NULL,
    expiry_date TIMESTAMP NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE
);

-- ---------------------------
-- 10. Bảng tickets (Vé xem phim)
-- ---------------------------

-- CREATE TYPE ticket_status AS ENUM ('pending', 'success', 'failed');

CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    schedule_id INT NOT NULL,
    seat_id INT NOT NULL,
    cinema_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    is_status VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (schedule_id) REFERENCES schedules(id),
    FOREIGN KEY (seat_id) REFERENCES seats(id),
    UNIQUE (schedule_id, seat_id)
);

-- ---------------------------
-- 11. Bảng food_drink_orders (Chi tiết đồ ăn, thức uống)
-- ---------------------------
CREATE TABLE food_drink_orders (
    id SERIAL PRIMARY KEY,
    food_drink_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (food_drink_id) REFERENCES food_drinks(id)
);

-- ---------------------------
-- 12. Bảng order_items (Chi tiết đơn hàng)
-- ---------------------------
-- CREATE TYPE item_type AS ENUM ('ticket', 'food_drink');

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    item_type VARCHAR(255) NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0), --  quantity =  1 nếu là ticket
    price DECIMAL(10, 2) NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- ---------------------------
-- 13. Bảng employees (Nhân viên)
-- ---------------------------
-- CREATE TYPE employee_position AS ENUM ('manager', 'cashier', 'staff', 'cleaner', 'technician');

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) NOT NULL, -- UNIQUE
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL, -- UNIQUE
    address TEXT NOT NULL,
    phone_number VARCHAR(13), -- UNIQUE
    sex VARCHAR(5) NOT NULL,
    cccd VARCHAR(15)NOT NULL, -- UNIQUE
    position VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE
);

-- ---------------------------
-- 14. Bảng employee_schedules (Lịch làm việc nhân viên)
-- ---------------------------
CREATE TABLE employee_schedules (
    id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    work_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    notes TEXT,
    is_status VARCHAR(255),
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

-- ---------------------------
-- 15. Bảng employee_accounts (Tài khoản nhân viên)
-- ---------------------------
CREATE TABLE employee_accounts (
    id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    last_login TIMESTAMP,
	is_status VARCHAR(255) NOT NULL,
	is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

-- ---------------------------
-- 16. Bảng employee_salaries (Bảng lương nhân viên)
-- ---------------------------
CREATE TABLE employee_salaries (
    id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    month VARCHAR(7) NOT NULL,
    base_salary DECIMAL(10, 2) NOT NULL,
    salary_coefficient  DECIMAL(5, 2) NOT NULL,
    bonus DECIMAL(10, 2) DEFAULT 0,
    deductions DECIMAL(10, 2) DEFAULT 0,
    total_salary DECIMAL(10, 2) NOT NULL,
    actual_salary DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(255),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
