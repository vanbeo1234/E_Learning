import { Routes, Route } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";  // Đảm bảo đường dẫn chính xác
import SignupPage from "./features/auth/pages/SignupPage";  // Đảm bảo đường dẫn chính xác




/**
 * Cấu hình các route chính trong hệ thống cho đăng nhập và đăng ký
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Route đăng nhập */}
      <Route path="/login" element={<LoginPage />} />

      {/* Route đăng ký */}
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default AppRoutes;
