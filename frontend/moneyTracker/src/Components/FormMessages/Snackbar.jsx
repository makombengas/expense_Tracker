import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import useMessage from "../../Hooks/useMessages";

//**************** */
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// ******************
export default function SimpleSnackbar() {
  const message = useMessage();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    message.setMessage(null);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}></Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Stack spacing={2} sx={{ width: "100%", backgroundColor: " #43aa8b" }}>
        <Snackbar
          open={!!message.message}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          {message.message?.type === "success" ? (
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{
                width: "100%",
                backgroundColor: " #278761",
              }}
            >
              {message.message?.description}
            </Alert>
          ) : (
            <Alert severity="error">{message.message?.description}</Alert>
          )}
        </Snackbar>
      </Stack>
    </div>
  );
}
