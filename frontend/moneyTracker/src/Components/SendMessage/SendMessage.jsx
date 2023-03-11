import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import OutlinedInput from "@mui/material/OutlinedInput";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const messageURI = import.meta.env.VITE_MESSAGE_URL;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  height: "85%",
  bgcolor: "background.paper",

  boxShadow: 24,
  pt: 15,
  pb: 15,
  pl: 5,
  pr: 5,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  margin: "0",
};

export default function SendMessage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [messageData, setMessageData] = useState({
    mail: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const { mail, type, text, value } = e.target;
    setMessageData((prev) => {
      return {
        ...prev,
        [mail]: value,
      };
    });
    if (!messageData) {
      setError("Invalid message");
    } else {
      setError("");
    }
  };

  const messageSend = async (e) => {
    setMessageData(true);

    const response = await axios
      .post(messageURI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageData }),
      })
      .then(async (res) => {
        const resData = await res;
        console.log("fetch data", resData.data);

        if (resData.data === 200) {
          alert("message sent successfully");
          navigate("/welcome");
        } else if (resData.data === 500) {
          alert("message failed");
        }
      })
      .then(() => {
        messageData;
      });
  };

  return (
    <div>
      <MailOutlineIcon
        sx={{ cursor: "pointer", fontSize: "2.5rem" }}
        onClick={handleOpen}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Kontaktformular
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Kontaktformular verwenden.
          </Typography>
          <form style={{ display: "flex", flexDirection: "column" }}>
            <FormControl sx={{ mt: 4, width: "30ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-name"
                label="Name"
                type="name"
                name="name"
                value={messageData.type}
                onChange={(e) => handleChange(e)}
                endAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <p className="error">{error && error}</p>
            <FormControl sx={{ mt: 4, width: "30ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                label="Email"
                type="email"
                name="email"
                value={messageData.text}
                onChange={(e) => handleChange(e)}
                endAdornment={
                  <InputAdornment position="start">
                    <AlternateEmailIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl>
              <TextField
                sx={{ mt: 4, width: "30ch" }}
                id="standard-multiline-static"
                label="You message text please "
                type="message"
                multiline
                rows={6}
                defaultValue={messageData.mail}
                onChange={(e) => handleChange(e)}
                variant="standard"
              />
            </FormControl>
            <Stack
              spacing={5}
              sx={{
                padding: 2,
              }}
            ></Stack>
            <Button
              sx={{
                backgroundColor: "#43AA8B",
                color: "black",
                fontWeight: "bolder",
                height: "3rem",
              }}
              onClick={(e) => messageSend(e)}
            >
              NACHRICHT SENDEN
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
