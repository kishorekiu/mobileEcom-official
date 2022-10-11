import { Form, Button, Row, Col, Nav } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../Apis";
import { useEffect } from "react";
function Login() {
  let { isSuccess, isErr, errMsg } = useSelector((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFormSubmit = (userObj) => {
    dispatch(userLogin(userObj));
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  });
  return (
    <div>
      <Row className="mt-5">
        <Col className="col-xs-4 col-sm-6 col-ms-6 col-lg-4 mx-auto p-4 rounded border">
          <h3 className="fs-3 text-center text-dark ">Login</h3>
          {isErr === true && (
            <h4 className="text-danger text-center mb-3">{errMsg}</h4>
          )}
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className="shadow-none"
                {...register("email", { required: true })}
                type="email"
                placeholder="Enter email"
              />
              {errors.email?.type === "required" && (
                <p className="text-danger">please enter email</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="shadow-none"
                {...register("password", {
                  required: true,
                  minLength: 4,
                  maxLength: 16,
                  pattern: /^[a-zA-Z0-9!@#$%^&*]{4,16}$/,
                })}
                type="password"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-danger">please enter password</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-danger">min length 4 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-danger">max length 16 characters</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-danger">
                  pattern allowed [a-zA-Z0-9!@#$%^&*]
                </p>
              )}
            </Form.Group>
            <Row>
              <Col>
                <Button
                  className="shadow-none dark-button"
                  variant="dark"
                  type="submit"
                >
                  Login
                </Button>
              </Col>
              <Col>
                <Nav className="ms-auto">
                  <NavLink
                    to="/register"
                    className="nav-link text-dark mb-3 d-block text-right"
                  >
                    new Here, Register
                  </NavLink>
                </Nav>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
export default Login;
