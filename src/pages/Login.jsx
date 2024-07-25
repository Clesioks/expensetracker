import { Form, message } from "antd";
import Input from "antd/es/input/Input";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import logo from "./../resources/img/oficina.jpeg";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);
      localStorage.setItem(
        "sheymoney-udemy-user",
        JSON.stringify({ ...response.data, password: "" })
      );
      setLoading(false);
      message.success("Login efetuado!");
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Erro no login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("sheymoney-udemy-user")) {
      navigate("/");
    }
  });

  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-4">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>OFICINA BALCZAREK / LOGIN</h1>
            <hr />
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/register">
                Ainda não registrado? Clique para se registrar
              </Link>
              <button className="primary" type="submit">
                LOGIN
              </button>
            </div>
          </Form>
        </div>
        <div className="col-md-5 mx-4">
          <div>
            <img src={logo} width="560" height="300" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
