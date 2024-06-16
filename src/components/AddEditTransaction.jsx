import React, { useState } from "react";
import Modal from "antd/es/modal/Modal";
import Form from "antd/es/form/Form";
import Input from "antd/es/input/Input";
import { Select, message } from "antd";
import Spinner from "./Spinner";
import axios from "axios";

const { Option } = Select;

const AddEditTransaction = ({
  setShowAddEditTransactionModal,
  showAddEditTransactionModal,
  getTransactions,
}) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("sheymoney-udemy-user"));
      setLoading(true);
      await axios.post("/api/transactions/add-transaction", {
        ...values,
        userEmail: user.email,
        userName: user.name,
      });
      getTransactions();
      message.success("Transação adicionada com Sucesso!");
      setShowAddEditTransactionModal(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Erro no cadastro");
    }
  };

  return (
    <Modal
      title="Adicionar transação"
      open={showAddEditTransactionModal}
      onCancel={() => setShowAddEditTransactionModal(false)}
      footer={false}
    >
      {loading && <Spinner />}

      <br></br>
      <Form layout="vertical" className="transaction-form" onFinish={onFinish}>
        <Form.Item label="Valor:" name="amount">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Tipo" name="type">
          <Select placeholder="Selecione Renda ou Despesa">
            <Option value="income">Renda</Option>
            <Option value="expence">Despesas</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Categoria" name="category">
          <Select placeholder="Selecione uma categoria">
            <Option value="salary">Salário</Option>
            <Option value="freelance">Freelance</Option>
            <Option value="market">Mercado</Option>
            <Option value="entretainment">Entretenimento</Option>
            <Option value="education">Educação</Option>
            <Option value="medical">Médico</Option>
            <Option value="food">Comida</Option>
            <Option value="tax">Imposto</Option>
          </Select>
        </Form.Item>

        <Form.Item name="date" label="Selecione a data">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Referência:" name="reference">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Descrição:" name="description">
          <Input type="text" />
        </Form.Item>

        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            Salvar
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddEditTransaction;
