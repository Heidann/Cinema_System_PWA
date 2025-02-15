import Movie from "./movie.model.js";
import Cinema from "./cinema.model.js";
import Room from "./room.model.js";
import Employee from "./employee.model.js";
import EmployeeAccount from "./employee_account.model.js";
import EmployeeSchedule from "./employee_schedule.model.js";
import EmployeeSalary from "./employee_salary.model.js";
import Seat from "./seat.model.js";
import Schedule from "./schedule.model.js";
import Customer from "./customer.model.js";
import Order from "./order.model.js";
import Ticket from "./ticket.model.js";
import FoodDrink from "./food_drink.model.js";
import FoodDrinkOrder from "./food_drink_order.model.js";
import OrderItem from "./order_item.model.js";
import sequelize from "../config/db.config.js";

// Define relationships

Cinema.hasMany(Room, { foreignKey: "cinema_id" });
Room.belongsTo(Cinema, { foreignKey: "cinema_id" });

Room.hasMany(Seat, { foreignKey: "room_id" });
Seat.belongsTo(Room, { foreignKey: "room_id" });

Movie.hasMany(Schedule, { foreignKey: "movie_id" });
Schedule.belongsTo(Movie, { foreignKey: "movie_id" });

Room.hasMany(Schedule, { foreignKey: "room_id" });
Schedule.belongsTo(Room, { foreignKey: "room_id" });

Customer.hasMany(Order, { foreignKey: "customer_id" });
Order.belongsTo(Customer, { foreignKey: "customer_id" });

Schedule.hasMany(Ticket, { foreignKey: "schedule_id" });
Ticket.belongsTo(Schedule, { foreignKey: "schedule_id" });

Seat.hasMany(Ticket, { foreignKey: "seat_id" });
Ticket.belongsTo(Seat, { foreignKey: "seat_id" });

FoodDrink.hasMany(FoodDrinkOrder, { foreignKey: "food_drink_id" });
FoodDrinkOrder.belongsTo(FoodDrink, { foreignKey: "food_drink_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Employee.hasMany(EmployeeSchedule, { foreignKey: "employee_id" });
EmployeeSchedule.belongsTo(Employee, { foreignKey: "employee_id" });

Employee.hasMany(EmployeeSalary, { foreignKey: "employee_id" });
EmployeeSalary.belongsTo(Employee, { foreignKey: "employee_id" });

Employee.hasOne(EmployeeAccount, { foreignKey: "employee_id" });
EmployeeAccount.belongsTo(Employee, { foreignKey: "employee_id" });

// Sync all models with the database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.error("Error creating database & tables:", error);
  });

export {
  Movie,
  Cinema,
  Room,
  Employee,
  EmployeeAccount,
  EmployeeSchedule,
  EmployeeSalary,
  Seat,
  Schedule,
  Customer,
  Order,
  Ticket,
  FoodDrink,
  FoodDrinkOrder,
  OrderItem,
};
