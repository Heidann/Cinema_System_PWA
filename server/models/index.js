import Movie from "./movie.model.js";
import Cinema from "./cinema.model.js";
import Room from "./room.model.js";
import Employee from "./employee.model.js";
import EmployeeAccount from "./employee_account.model.js";
import EmployeeSchedule from "./employee_schedule.model.js";
import EmployeeSalary from "./employee_salary.model.js";
import Seat from "./seat.model.js";
import Schedule from "./schedule.model.js";
import User from "./user.model.js";
import Order from "./order.model.js";
import Ticket from "./ticket.model.js";
import FoodDrink from "./food_drink.model.js";
import FoodDrinkOrder from "./food_drink_order.model.js";
import OrderItem from "./order_item.model.js";

// Define relationships

// Associations
Cinema.hasMany(Room, { foreignKey: "cinemaId" });
Room.belongsTo(Cinema, { foreignKey: "cinemaId" });

Room.hasMany(Seat, { foreignKey: "roomId" });
Seat.belongsTo(Room, { foreignKey: "roomId" });

Movie.hasMany(Schedule, { foreignKey: "movieId" });
Schedule.belongsTo(Movie, { foreignKey: "movieId" });

Room.hasMany(Schedule, { foreignKey: "roomId" });
Schedule.belongsTo(Room, { foreignKey: "roomId" });

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Schedule.hasMany(Ticket, { foreignKey: "scheduleId" });
Ticket.belongsTo(Schedule, { foreignKey: "scheduleId" });

Seat.hasMany(Ticket, { foreignKey: "seatId" });
Ticket.belongsTo(Seat, { foreignKey: "seatId" });

FoodDrink.hasMany(FoodDrinkOrder, { foreignKey: "foodDrinkId" });
FoodDrinkOrder.belongsTo(FoodDrink, { foreignKey: "foodDrinkId" });

Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Employee.hasMany(EmployeeSchedule, { foreignKey: "employeeId" });
EmployeeSchedule.belongsTo(Employee, { foreignKey: "employeeId" });

Employee.hasMany(EmployeeSalary, { foreignKey: "employeeId" });
EmployeeSalary.belongsTo(Employee, { foreignKey: "employeeId" });

Employee.hasOne(EmployeeAccount, { foreignKey: "employeeId" });
EmployeeAccount.belongsTo(Employee, { foreignKey: "employeeId" });

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
  User,
  Order,
  Ticket,
  FoodDrink,
  FoodDrinkOrder,
  OrderItem,
};
