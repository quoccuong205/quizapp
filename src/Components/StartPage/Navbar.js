import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/action";
import { Button, Divider, Row } from "antd";

function Navbar() {
  const accessToken = useSelector(
    (state) => state.auth?.auth?.tokens?.access?.token
  );
  const user = useSelector((state) => state.auth?.auth?.user);
  const refreshToken = useSelector(
    (state) => state.auth?.auth?.tokens?.refresh?.token
  );
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout(refreshToken));
  };
  return (
    <div>
      <div>
        <nav className="header">
          <Row type="flex" style={{ margin: "20px" }}>
            {accessToken ? (
              <h1>
                Welcome <span> {user?.username} </span>
              </h1>
            ) : null}
            <Button
              style={{ marginLeft: "20px" }}
              size="medium"
              shape="round"
              type="primary"
              className="logout_btn"
              onClick={handleLogout}
            >
              Log out
            </Button>
          </Row>
        </nav>
      </div>
      <Divider />
    </div>
  );
}

export default Navbar;
