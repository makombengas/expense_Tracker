import "./App.css";
import ExpenseApp from "./App/ExpenseApp";
import ModalRegister from "./Components/LoginAndRegister/ModalRegister";
import { Route, Routes } from "react-router-dom";
import ModalLogin from "./Components/LoginAndRegister/ModalLogin";
import Loading from "./App/Loading";
import PrivateRoute from "./Hooks/PrivateRoute";
import Snackbar from "./Components/FormMessages/Snackbar";
import SocialMedia from "./Components/SocialMedia/SocialMedia";
import SendMessage from "./Components/SendMessage/SendMessage";

function App() {
  return (
    <div>
      <div>
        <Snackbar />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/register" element={<ModalRegister />} />
          <Route path="/login" element={<ModalLogin />} />
          <Route element={<PrivateRoute />}>
            <Route path="/welcome" element={<ExpenseApp />} />
          </Route>
        </Routes>
      </div>
      <SocialMedia />
    </div>
  );
}

export default App;
