// DESC: Tạo mã nhân viên từ thông tin của nhân viên
// Để mã code dễ nhận biết và quản lý, ta có thể điều chỉnh cấu trúc mã code như sau:
// 2 ký tự đầu: Mã tỉnh lấy từ địa chỉ rạp chiếu phim (viết tắt tên tỉnh).
// 3 ký tự tiếp theo: ID của rạp chiếu phim (cinema_id) với padding (ví dụ, 001, 025).
// 1 ký tự tiếp theo: Giới tính (M cho nam, F cho nữ).
// 4 số cuối: ID tự tăng của nhân viên, theo rạp chiếu phim.
import { v4 as uuidv4 } from "uuid";

/**
 * Generate province code from city name
 * @param {string} city_cinema - The name of the city or province
 * @returns {Promise<string>} - The generated province code
 */
const getProvinceCode = async (city_cinema) => {
  if (!city_cinema) {
    throw new Error("City name is required");
  }

  try {
    const response = await fetch("https://provinces.open-api.vn/api/");
    const data = await response.json();
    const province = data.find(
      (province) => province.name.toLowerCase() === city_cinema.toLowerCase()
    );
    if (!province) {
      throw new Error("City not found");
    }
    return province.code;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch province code");
  }
};

/**
 * Generate employee code
 * @param {string} city_cinema - The name of the city
 * @param {number} cinema_id - The ID of the cinema
 * @param {string} sex - The gender of the employee ("Male" or "Female")
 * @returns {Promise<string>} - The generated employee code
 */
const generateEmployeeCode = async (city_cinema, cinema_id, sex) => {
  if (!city_cinema || !cinema_id || !sex) {
    throw new Error("All fields are required");
  }

  // Step 1: Get province code
  let provinceCode = await getProvinceCode(city_cinema);
  provinceCode = provinceCode.toString().padStart(2, "0");

  // Step 2: Generate the 3-digit cinema ID (padded with 0s)
  const cinemaCode = cinema_id.toString().padStart(3, "0");

  // Step 3: Generate the gender code
  const genderCode = sex.toUpperCase() === "MALE" ? "M" : "F";

  // Step 4: Generate the last 4 digits (random)
  const randomCode = uuidv4().substring(0, 4);

  // Combine all parts to create the employee code
  const employeeCode = `${provinceCode}${cinemaCode}${genderCode}${randomCode}`;

  return employeeCode;
};

export default generateEmployeeCode;
