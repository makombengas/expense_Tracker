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
import useUser from "../../Hooks/UseUser";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { register, errors, status, isLoggedIn } = useUser();
  const [userData, setUserData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //bubmit change event

  async function handleSubmit(e) {
    console.log("nice");
    e.preventDefault();
    const success = await register(
      userData.name,
      userData.email,
      userData.password
    );
    if (success) {
      setIsSuccess(true);
      navigate("/login");
    }
    if (!success) setError(true);
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
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            flexWrap: "wrap",
          }}
        >
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-name"
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <AccountCircle />
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <AlternateEmailIcon />
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={userData.password}
              autoComplete="on"
              onChange={handleChange}
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
              label="Password"
            />
          </FormControl>
        </div>
        <div className="modalBtn">
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              border: "none",
              padding: "0.5rem 2rem ",
              borderRadius: "0.2rem",
            }}
          >
            register
          </button>
        </div>
      </form>
    </Box>
  );
}
