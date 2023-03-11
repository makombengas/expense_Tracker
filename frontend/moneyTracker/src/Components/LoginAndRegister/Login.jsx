import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import useUser from "../.././Hooks/UseUser";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const user = useUser();
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(true);
  const [isFetching, setIsFetching] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (user.user && !user.loading) {
      navigate("/");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setUserData((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setIsFetching(true);
    const success = await user.login(userData.email, userData.password);
    if (success) {
      setIsSuccess(true);
      navigate("/welcome");
    }
    if (success === 401 || success === 400) {
      setError(true);
      setIsFetching(false);
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <div
          sx={{
            display: "flex 1",
            justifyContent: "center",
            alignItem: "center",
            flexWrap: "wrap",
          }}
        >
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              label="Email"
              type="email"
              name="email"
              value={userData.email}
              onChange={(e) => handleChange(e)}
              endAdornment={
                <InputAdornment position="end">
                  <AlternateEmailIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              label="password"
              name="password"
              autoComplete="on"
              value={userData.password}
              onChange={(e) => handleChange(e)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div>
            {error && <p>{error.message}</p>}
            {isSuccess && <p>{isSuccess.statusLogin}</p>}
          </div>
        </div>
        <div className="modalBtn">
          <button
            style={{
              backgroundColor: "#43AA8B",
              border: "none",
              padding: "0.5rem 2rem ",
              color: "white",
              borderRadius: "0.2rem",
            }}
          >
            Login
          </button>
        </div>
      </form>
      <div></div>
    </Box>
  );
}
