import { Form, message, Select } from "antd";
import Input from "antd/es/input/Input";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import logo from "./../resources/img/oficina.jpeg";

const { Option } = Select;

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
          <div>
            <img src={logo} width="560" height="300" alt="logo" />
          </div>
        </div>
        <div className="col-md-5 corBranca">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>CFICINA BALCZAREK / REGISTRO</h1>
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
            <Form.Item label="Admin" name="isAdmin">
              <Select placeholder="Usuário é Admin?">
                <Option value={true}>Admin</Option>
                <Option value={false}>Não Admin</Option>
              </Select>
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
