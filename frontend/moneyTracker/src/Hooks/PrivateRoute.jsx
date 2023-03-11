import { Outlet } from "react-router-dom";
import Loading from "../App/Loading";
import Login from "../Components/LoginAndRegister/Login";
import useUser from "./UseUser";

const PrivateRoute = () => {
  const user = useUser();
  console.log(user.isLoggedIn);
  return user.isLoggedIn ? <Outlet /> : <Loading />;
};

export default PrivateRoute;
