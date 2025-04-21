import React, { useState } from 'react';
import AuthPage from './features/auth/AuthPage'; // Import trang đăng nhập


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      <AuthPage setIsAuthenticated={setIsAuthenticated} />
    </div>
  );
};

export default App;
