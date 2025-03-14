import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { LoginPage } from "./Pages/Login/LoginPage";
import { EntitiesPage } from "./Pages/Entities/EntitiesPage";

import Header from "./Components/Header";
import { NotFoundPage } from "./Components/NotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/entities" element={<EntitiesPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
