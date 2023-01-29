import "./App.css";
import ExpenseApp from "./App/ExpenseApp";
import ModalRegister from "./Components/LoginAndRegister/ModalRegister";
import { Route, Routes } from "react-router-dom";
import ModalLogin from "./Components/LoginAndRegister/ModalLogin";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<ModalRegister />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<ModalLogin />} />
      </Routes>
      <Routes>
        <Route path="/welcome" element={<ExpenseApp />} />
      </Routes>
    </div>
  );
}

export default App;
