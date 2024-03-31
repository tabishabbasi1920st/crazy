import { useState } from "react";
import {
  MainContainer,
  Dialog,
  ConfirmationContainer,
} from "./StyledComponents";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setOpenDialog(false);
    Cookies.remove("chatToken");
    navigate("/login");
  };

  const renderConfirmationDialog = () => {
    return (
      <Dialog>
        <ConfirmationContainer>
          <p>Are you sure ?</p>
          <div className="btn-container">
            <button
              onClick={handleLogout}
              className="btn"
              type="button"
              style={{ backgroundColor: "#e11d48" }}
            >
              Confirm
            </button>
            <button
              className="btn"
              type="button"
              style={{ backgroundColor: "#203047" }}
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </button>
          </div>
        </ConfirmationContainer>
      </Dialog>
    );
  };

  console.log(openDialog);

  return (
    <MainContainer>
      <button
        type="button"
        className="logout-btn"
        title="Press to Logout"
        onClick={() => setOpenDialog(true)}
      >
        <RiLogoutBoxRLine />
      </button>
      {openDialog && renderConfirmationDialog()}
    </MainContainer>
  );
};

export default Logout;
