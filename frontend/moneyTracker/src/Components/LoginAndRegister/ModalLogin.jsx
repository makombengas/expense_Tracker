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
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85%",
    height: "85%",
    zIndex: 1,
    backgroundColor: "white",
  };
  return (
    <div style={divStyle}>
      <div className="modalContainer">
        <Modal.Dialog animate="true" style={modalStyle} className="modalStyle">
          <Modal.Header closeButton>
            <div className="modalHeader">
              <Modal.Title>
                EXPENSE TRACKER
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "darkGray",
                    paddingTop: "0.5rem",
                    paddingBottom: "2rem",
                    textAlign: "center",
                  }}
                >
                  Just keep your money save
                </p>
              </Modal.Title>
            </div>
          </Modal.Header>

          {/* Login components */}
          <Modal.Body className="modalRegister">
            <h2 style={{ paddingBottom: "5rem", fontSize: "2.2rem" }}>Login</h2>
            <div className="modalLogin">
              <p>Login and keep your money save!</p>
            </div>
            <div>
              <Login />
            </div>
          </Modal.Body>
          {/* Footer */}
          <div className="modalFooter">
            <Modal.Footer
              style={{
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>You don't have an account?</p>

              <div className="btnModal">
                <Button
                  style={{
                    backgroundColor: "black",
                    border: "none",
                    marginLeft: "2rem",
                  }}
                  onClick={clickModal}
                >
                  Register
                </Button>
              </div>
            </Modal.Footer>
          </div>
        </Modal.Dialog>
      </div>
    </div>
  );
}

export default ModalLogin;
