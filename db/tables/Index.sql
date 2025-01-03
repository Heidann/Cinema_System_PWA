-- ---------------------------
-- Lập chỉ mục Index
-- ---------------------------
-- users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone_number);

-- cinemas 
CREATE INDEX idx_cinemas_city ON cinemas(city);

-- rooms 
CREATE INDEX idx_rooms_cinema_id ON rooms(cinema_id);

-- seats 
CREATE INDEX idx_seats_room_id ON seats(room_id);

-- movies 
CREATE INDEX idx_movies_title ON movies(title);

-- schedules 
CREATE INDEX idx_schedules_room_time ON schedules(room_id, start_time);

-- orders 
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

-- tickets 
CREATE INDEX idx_tickets_schedule_id ON tickets(schedule_id);

-- food_drink_orders 
CREATE INDEX idx_food_drink_orders_fd_id ON food_drink_orders(food_drink_id);

-- order_items 
CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- employees 
CREATE INDEX idx_employees_position ON employees(position);

-- employee_schedules 
CREATE INDEX idx_emp_schedules_emp_id ON employee_schedules(employee_id);

-- employee_accounts 
CREATE INDEX idx_emp_accounts_emp_id ON employee_accounts(employee_id);

-- employee_salaries 
CREATE INDEX idx_emp_salaries_emp_id ON employee_salaries(employee_id);