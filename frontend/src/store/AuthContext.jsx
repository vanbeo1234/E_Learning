import { createContext, useContext, useState } from "react";

// Context để lưu trữ thông tin người dùng và vai trò (role) trong toàn hệ thống React
const AuthContext = createContext();

/**
 * Chuyển đổi vai trò từ tiếng Việt sang mã định danh nội bộ (viết hoa) để dễ phân quyền
 * @param {string} roleText Vai trò dưới dạng tiếng Việt từ backend trả về
 * @returns {string} Vai trò đã chuẩn hóa: ADMIN, INSTRUCTOR, STUDENT
 */
const normalizeRole = (roleText) => {
  switch (roleText) {
    case "Admin":
      return "ADMIN";
    case "Giảng viên":
      return "INSTRUCTOR";
    case "Học viên":
      return "STUDENT";
    default:
      return "UNKNOWN"; // Trường hợp mặc định nếu không nhận diện được vai trò
  }
};

/**
 * Provider bao toàn bộ ứng dụng để cung cấp thông tin người dùng cho các component con
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null; // Kiểm tra và trả về dữ liệu người dùng đã lưu trữ nếu có
  });

  /**
   * Lưu thông tin người dùng và token sau khi đăng nhập thành công
   * @param {Object} userData - Dữ liệu người dùng trả về từ backend
   * @param {string} token - JWT token xác thực
   */
  const login = (userData, token) => {
    const normalized = {
      ...userData,
      role: normalizeRole(userData.role), // Chuyển đổi vai trò người dùng thành dạng chuẩn hóa
    };
    localStorage.setItem("user", JSON.stringify(normalized)); // Lưu người dùng đã chuẩn hóa vào localStorage
    localStorage.setItem("token", token); // Lưu token vào localStorage
    setUser(normalized); // Cập nhật trạng thái người dùng trong ứng dụng
  };

  /**
   * Xóa thông tin người dùng và token khỏi localStorage khi đăng xuất
   */
  const logout = () => {
    localStorage.removeItem("user"); // Xóa dữ liệu người dùng khỏi localStorage
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
    setUser(null); // Cập nhật trạng thái người dùng trong ứng dụng
  };

  return (
    <AuthContext.Provider value={{ user, role: user?.role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook để truy cập vào thông tin xác thực và tiện ích phân quyền
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  return {
    ...context,
    isAdmin: context?.role === "ADMIN", // Kiểm tra xem người dùng có phải là ADMIN không
    isInstructor: context?.role === "INSTRUCTOR", // Kiểm tra xem người dùng có phải là INSTRUCTOR không
    isStudent: context?.role === "STUDENT", // Kiểm tra xem người dùng có phải là STUDENT không
  };
};
