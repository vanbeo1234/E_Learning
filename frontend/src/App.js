import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes"; // Kiểm tra lại đường dẫn này

function App() {
  return (
    <Router>
      <AppRoutes /> {/* Cấu hình các route ở đây */}
    </Router>
  );
}

export default App;
