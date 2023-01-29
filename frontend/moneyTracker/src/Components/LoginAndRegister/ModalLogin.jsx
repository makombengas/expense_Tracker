import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./Register";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

function ModalLogin() {
  const navigate = useNavigate();
  const clickModal = () => {
    navigate("/register", { replace: true });
  };

  const divStyle = {
    display: "block",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100vw",
    height: "100vh",
    zIndex: 1,
    backgroundColor: "#43aa8b1a",
  };
  const modalStyle = {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    flexDirections: "column",
    gap: "2rem",
    padding: "2rem",
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "85%",
    zIndex: 1,
    backgroundColor: "white",
  };
  return (
    <div style={divStyle}>
      <Modal.Dialog animate="true" style={modalStyle} className="modalStyle">
        <Modal.Header closeButton>
          <Modal.Title>
            EXPENSE TRACKER
            <p style={{ fontSize: "0.9rem", color: "darkGray" }}>
              Just keep your money save !
            </p>
          </Modal.Title>
        </Modal.Header>

        {/* Login components */}
        <Modal.Body className="modalRegister">
          <h2 style={{ paddingBottom: "5rem", fontSize: "2.2rem" }}>Login</h2>
          <p style={{ paddingBottom: "2rem", fontSize: "1.2rem" }}>
            Login and keep your money save!
          </p>
          <div>
            <Login />
          </div>
          <Button
            style={{
              backgroundColor: "#43AA8B",
              border: "none",
              marginTop: "5rem",
              padding: "0.5rem 2rem ",
            }}
          >
            Login
          </Button>
        </Modal.Body>
        {/* Footer */}
        <Modal.Footer style={{ gap: "1rem", paddingRight: "4rem" }}>
          <p>You don't have an account?</p>

          <Button
            style={{ backgroundColor: "black", border: "none" }}
            onClick={clickModal}
          >
            Register
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ModalLogin;
