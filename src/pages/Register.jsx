import { Form, message } from "antd";
import Input from "antd/es/input/Input";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const Register = () => {
  const navigate = useNavigate(true);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/users/register", values);
      message.success("Registrado com Sucesso!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Erro no cadastro");
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
        <div className="col-md-5">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>SHEY-MONEY / REGISTRO</h1>
            <hr />
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Já registrado? Clique para login</Link>
              <button className="primary" type="submit">
                REGISTER
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
