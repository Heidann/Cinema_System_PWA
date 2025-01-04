-- Danh sách người dùng (users) kèm số đơn hàng đã đặt 
CREATE VIEW user_order_summary AS
SELECT 
    users.id AS user_id,
    users.name AS user_name,
    users.email,
    COUNT(orders.id) AS total_orders,
    SUM(orders.total_price) AS total_spent
FROM 
    users
LEFT JOIN 
    orders ON users.id = orders.user_id
GROUP BY 
    users.id, users.name, users.email;


-- Danh sách lịch chiếu kèm thông tin rạp và phòng chiếu
CREATE VIEW schedule_detail AS
SELECT 
    schedules.id AS schedule_id,
    movies.title AS movie_title,
    cinemas.name AS cinema_name,
    rooms.name AS room_name,
    schedules.start_time,
    schedules.end_time,
    schedules.ticket_price
FROM 
    schedules
JOIN 
    movies ON schedules.movie_id = movies.id
JOIN 
    rooms ON schedules.room_id = rooms.id
JOIN 
    cinemas ON rooms.cinema_id = cinemas.id;
    
-- Danh sách vé đã bán kèm thông tin người dùng và lịch chiếu
CREATE VIEW ticket_sales AS
SELECT 
    tickets.id AS ticket_id,
    schedules.id AS schedule_id,
    users.id AS user_id,
    users.name AS user_name,
    schedules.start_time,
    schedules.end_time,
    tickets.price AS ticket_price
FROM 
    tickets
JOIN 
    schedules ON tickets.schedule_id = schedules.id
LEFT JOIN 
    orders ON tickets.id = orders.id
LEFT JOIN 
    users ON orders.user_id = users.id;

--  Tổng doanh thu theo rạp
CREATE VIEW cinema_revenue AS
SELECT 
    cinemas.id AS cinema_id,
    cinemas.name AS cinema_name,
    SUM(tickets.price) AS total_revenue
FROM 
    cinemas
JOIN 
    rooms ON cinemas.id = rooms.cinema_id
JOIN 
    schedules ON rooms.id = schedules.room_id
JOIN 
    tickets ON schedules.id = tickets.schedule_id
GROUP BY 
    cinemas.id, cinemas.name;

-- Doanh thu từng phim
CREATE VIEW movie_revenue AS
SELECT 
    movies.id AS movie_id,
    movies.title AS movie_title,
    SUM(tickets.price) AS total_revenue
FROM 
    movies
JOIN 
    schedules ON movies.id = schedules.movie_id
JOIN 
    tickets ON schedules.id = tickets.schedule_id
GROUP BY 
    movies.id, movies.title;

--  Danh sách khuyến mãi còn hiệu lực
CREATE VIEW active_promotions AS
SELECT 
    id AS promotion_id,
    code AS promotion_code,
    discount,
    expiry_date,
    is_active
FROM 
    promotions
WHERE 
    is_active = 1 AND expiry_date >= CURDATE();

-- Danh sách nhân viên kèm thông tin tài khoản 
CREATE VIEW employee_account_details AS
SELECT 
    employees.id AS employee_id,
    employees.name AS employee_name,
    employees.email,
    employees.position,
    employee_accounts.username,
    employee_accounts.role,
    employee_accounts.last_login
FROM 
    employees
LEFT JOIN 
    employee_accounts ON employees.id = employee_accounts.employee_id;

-- Bảng lương nhân viên (bao gồm tổng tiền lương đã thanh toán và chưa thanh toán)
CREATE VIEW employee_salary_summary AS
SELECT 
    employee_salaries.employee_id,
    employees.name AS employee_name,
    SUM(CASE WHEN payment_status = 'paid' THEN total_salary ELSE 0 END) AS total_paid,
    SUM(CASE WHEN payment_status = 'unpaid' THEN total_salary ELSE 0 END) AS total_unpaid
FROM 
    employee_salaries
JOIN 
    employees ON employee_salaries.employee_id = employees.id
GROUP BY 
    employee_salaries.employee_id, employees.name;

-- Chi tiết đơn hàng kèm loại mặt hàng
CREATE VIEW order_details AS
SELECT 
    orders.id AS order_id,
    users.name AS user_name,
    order_items.item_type,
    order_items.item_id,
    order_items.quantity,
    order_items.price,
    orders.total_price,
    orders.status AS order_status,
    orders.payment_status
FROM 
    orders
JOIN 
    order_items ON orders.id = order_items.order_id
JOIN 
    users ON orders.user_id = users.id;

-- Thống kê số lượng vé đã bán theo từng lịch chiếu
CREATE VIEW schedule_ticket_stats AS
SELECT 
    schedules.id AS schedule_id,
    movies.title AS movie_title,
    schedules.start_time,
    schedules.end_time,
    COUNT(tickets.id) AS tickets_sold,
    SUM(tickets.price) AS revenue
FROM 
    schedules
JOIN 
    movies ON schedules.movie_id = movies.id
LEFT JOIN 
    tickets ON schedules.id = tickets.schedule_id
GROUP BY 
    schedules.id, movies.title, schedules.start_time, schedules.end_time;

-- Thống kê ghế ngồi còn trống theo phòng chiếu
CREATE VIEW available_seats AS
SELECT 
    rooms.id AS room_id,
    rooms.name AS room_name,
    COUNT(seats.id) AS total_seats,
    COUNT(CASE WHEN seats.is_status = 'available' THEN 1 ELSE NULL END) AS available_seats
FROM 
    rooms
JOIN 
    seats ON rooms.id = seats.room_id
GROUP BY 
    rooms.id, rooms.name;

-- Thống kê số lượng đồ ăn, thức uống đã bán
CREATE VIEW food_drink_sales AS
SELECT 
    food_drinks.id AS food_drink_id,
    food_drinks.name AS food_drink_name,
    SUM(food_drink_orders.quantity) AS total_quantity_sold,
    SUM(food_drink_orders.price) AS total_revenue
FROM 
    food_drinks
JOIN 
    food_drink_orders ON food_drinks.id = food_drink_orders.food_drink_id
GROUP BY 
    food_drinks.id, food_drinks.name;
 
    
    
    
    
    
    
