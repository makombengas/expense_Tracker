import * as React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ModalLogin from "../Components/LoginAndRegister/ModalLogin";

function CircularProgressWithLabel(props) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        color: "white",
      }}
    >
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function Loading() {
  const [progress, setProgress] = React.useState(10);
  const [stop, setStop] = React.useState(true);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 25
      );
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setStop(false);
    }, 2400);
  }, []);
  const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "1rem",
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    color: "black",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: "100vw",
    height: "100vh",
  };

  return (
    <>
      <div style={loadingStyle} className="loading">
        <h1 style={{ fontSize: "2rem", fontWeight: "bolder" }}>
          EXPENSE TRACKER
        </h1>
        <p style={{ fontSize: "1.4rem" }}>Take care of your money !</p>

        {/* <Stack direction="row" spacing={2}>
        <Avatar
          alt="Remy Sharp"
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
          sx={{ width: 56, height: 56 }}
        />
      </Stack> */}
        {stop ? (
          <CircularProgressWithLabel
            value={progress}
            className="loadingCircle"
          />
        ) : (
          <ModalLogin />
        )}
      </div>
    </>
  );
}
