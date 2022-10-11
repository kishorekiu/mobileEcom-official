// import axios from "axios";
import { useState } from "react";
import { Form, Button, Row, Col, Nav } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { userRegistration } from "../Apis";
function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [err, setErr] = useState("");
  const navigate = useNavigate();
  const onFormSubmit = async (userObj) => {
    // const response = await axios
    //   .post("/user/register", userObj)
    //   .then((res) => res.data);
    const response = await userRegistration(userObj);
    if (response.message === "User Created") {
      navigate("/login");
    } else {
      setErr(response.message);
    }
  };
  return (
    <div className="">
      <Row className="mt-5">
        <Col className="col-xs-4 col-sm-6 col-md-6 col-lg-4 mx-auto p-3 rounded border">
          <h3 className="fs-3 text-dark text-center mb-3">Register</h3>
          <h4 className="text-success text-center mb-3">{err}</h4>
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                className="shadow-none"
                type="text"
                placeholder="Enter username"
                {...register("username", {
                  required: true,
                  minLength: 4,
                  maxLength: 20,
                })}
              />
              {errors.username?.type === "required" && (
                <p className="text-danger">please enter username</p>
              )}
              {errors.username?.type === "minLength" && (
                <p className="text-danger">enter atleast 4 characters</p>
              )}
              {errors.username?.type === "maxLength" && (
                <p className="text-danger">max length 20 characters</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className="shadow-none"
                type="email"
                placeholder="Enter email"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-danger">please enter email</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="shadow-none"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 4,
                  maxLength: 16,
                  pattern: /^[a-zA-Z0-9!@#$%^&*]{4,16}$/,
                })}
              />
              {errors.password?.type === "required" && (
                <p className="text-danger">please enter password</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-danger">enter atleast 4 characters</p>
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
                  variant="dark"
                  type="submit"
                  className="shadow-none dark-button"
                >
                  Register
                </Button>
              </Col>
              <Col>
                <Nav className="ms-auto">
                  <NavLink
                    to="/login"
                    className="nav-link text-dark mb-3 d-block text-right"
                  >
                    Already a user, Login
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
export default Register;
