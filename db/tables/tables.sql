-- ---------------------------
-- 1. Bảng users (Người dùng)
-- ---------------------------
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE
);

-- ---------------------------
-- 2. Bảng cinemas (Rạp chiếu phim)
-- ---------------------------
CREATE TABLE cinemas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE
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
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (cinema_id) REFERENCES cinemas(id),
    UNIQUE (cinema_id, name)
);

-- ---------------------------
-- 4. Bảng seats (Ghế ngồi)
-- ---------------------------
CREATE TYPE seat_status AS ENUM ('available', 'booked', 'unavailable');

CREATE TABLE seats (
    id SERIAL PRIMARY KEY,
    room_id INT NOT NULL,
    seat_number VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    is_status seat_status NOT NULL DEFAULT 'available',
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    UNIQUE (room_id, seat_number)
);

-- ---------------------------
-- 5. Bảng movies (Phim)
-- ---------------------------
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INT NOT NULL,
    image_url TEXT,
    trailer_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE
);

-- ---------------------------
-- 8. Bảng orders (Đơn hàng)
-- ---------------------------
CREATE TYPE payment_method AS ENUM ('credit_card', 'cash', 'e_wallet');
CREATE TYPE order_status AS ENUM ('pending', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'success', 'failed');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    promotion_code VARCHAR(50),
    payment_method payment_method NOT NULL,
    status order_status NOT NULL,
    payment_status payment_status DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ---------------------------
-- 9. Bảng promotions (Khuyến mãi)
-- ---------------------------
CREATE TABLE promotions (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount DECIMAL(10, 2) NOT NULL,
    expiry_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- ---------------------------
-- 10. Bảng tickets (Vé xem phim)
-- ---------------------------
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    schedule_id INT NOT NULL,
    seat_id INT NOT NULL,
    cinema_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
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
CREATE TYPE item_type AS ENUM ('ticket', 'food_drink');

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    item_type item_type NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- ---------------------------
-- 13. Bảng employees (Nhân viên)
-- ---------------------------
CREATE TYPE employee_position AS ENUM ('manager', 'cashier', 'staff', 'cleaner', 'technician');

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(20),
    position employee_position NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    hire_date DATE NOT NULL,
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
    status VARCHAR(50) DEFAULT 'scheduled',
    notes TEXT,
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
    role VARCHAR(50) NOT NULL,
    last_login TIMESTAMP,
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
    bonus DECIMAL(10, 2) DEFAULT 0,
    deductions DECIMAL(10, 2) DEFAULT 0,
    total_salary DECIMAL(10, 2) GENERATED ALWAYS AS (base_salary + bonus - deductions) STORED,
    payment_status VARCHAR(50) DEFAULT 'unpaid',
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
