import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearLoginStatus } from "../slices/loginSlice";
function Header() {
  let { isSuccess } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(clearLoginStatus());
  };
  return (
    <div className="border-bottom">
      <Navbar
        className="bg-white navbar fixed-top border-bottom"
        bg=""
        expand="sm"
      >
        <Container>
          <Navbar.Brand className="blue-violet fw-bold fs-3">
            Mobile Ecommerce
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link text-dark" end>
                Home
              </NavLink>
              {isSuccess === false ? (
                <>
                  <NavLink to="/register" className="nav-link text-dark">
                    Register
                  </NavLink>
                  <NavLink to="/login" className="nav-link text-dark">
                    Login
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="nav-link text-dark"
                    onClick={logout}
                  >
                    Logout
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
export default Header;
