import { Form, message } from "antd";
import Input from "antd/es/input/Input";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import { useState } from "react";
import Spinner from "../components/Spinner";

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

  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-4">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>SHEY-MONEY / LOGIN</h1>
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
        <div className="col-md-5">
          <div className="lottie">
            <lottie-player
              src="https://lottie.host/3f329623-6abb-449a-9eea-d2b8e52c705e/egrH1C1ykW.json"
              background="transparent"
              speed="1"
              loop
              autoplay
              direction="1"
              mode="normal"
            ></lottie-player>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
