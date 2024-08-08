import { Form, Input, message, Select } from "antd";
import Modal from "antd/es/modal/Modal";
import React, { useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";
const { Option } = Select;

const SaidaCaixa = ({ showValorSaida, setShowValorSaida, getTransactions }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("sheymoney-udemy-user"));
      setLoading(true);
      await axios.post("/api/transactions/add-transaction", {
        ...values,
        userId: user._id,
        userEmail: user.email,
        userName: user.name,
        servpecas: "-",
        cliente: "-",
        nomeCliente: "Saída do Caixa",
        carroPlaca: "-",
        telefone: "-",
        mecanico: "-",
        descriptionPecas: "-",
        valorPecas: 0,
        descriptionMaoObra: "-",
        valorDaObra: 0,
        formapagamento: "-",
        type: "saida",
      });
      getTransactions();
      message.success("Registro de saída adicionado com sucesso!");

      setShowValorSaida(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Erro no cadastro");
    }
  };

  return (
    <>
      <Modal
        title="Registrar saída do caixa"
        open={showValorSaida}
        footer={false}
        onCancel={() => setShowValorSaida(false)}
      >
        {loading && <Spinner />}

        <Form
          layout="vertical"
          className="transaction-form"
          onFinish={onFinish}
        >
          {/* <Form.Item label="Tipo:" name="type">
            <Select placeholder="Selecione Entrada ou Saída">
              <Option value="entrada">Entrada</Option>
              <Option value="saida">Saída</Option>
            </Select>
          </Form.Item> */}

          <Form.Item name="date" label="Selecione a data">
            <Input type="date" />
          </Form.Item>

          <Form.Item label="Motivo da saída do caixa:" name="obsSaida">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Valor:" name="amount">
            <Input
              type="number"
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
            />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button className="primary" type="submit">
              Salvar
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default SaidaCaixa;
