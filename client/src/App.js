import Login from "./components/Login";
import MainPage from "./components/MainPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const user = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        {user && <Route path="/" element={<MainPage />} />}
        <Route path="/" exact element={<Navigate replace to="/login" />} />
        <Route
          path="/login"
          exact
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
