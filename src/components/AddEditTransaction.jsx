import React, { useState, useRef } from "react";
import Modal from "antd/es/modal/Modal";
import Form from "antd/es/form/Form";
import Input from "antd/es/input/Input";
import { Select, message } from "antd";
import Spinner from "./Spinner";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import TextArea from "antd/es/input/TextArea";
import "../resources/addEditTRansaction.css";

const { Option } = Select;

const AddEditTransaction = ({
  setShowAddEditTransactionModal,
  showAddEditTransactionModal,
  selectedItemForEdit,
  setSelectedItemForEdit,
  getTransactions,
}) => {
  const printRef = useRef();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("sheymoney-udemy-user"));
      setLoading(true);
      if (selectedItemForEdit) {
        await axios.post("/api/transactions/edit-transaction", {
          payload: {
            ...values,
            userEmail: user.email,
            userName: user.name,
            userId: user._id,
          },
          transactionId: selectedItemForEdit._id,
        });
        getTransactions();
        message.success("Ordem de serviço atualizada com Sucesso!");
      } else {
        await axios.post("/api/transactions/add-transaction", {
          ...values,
          userId: user._id,
          userEmail: user.email,
          userName: user.name,
        });
        getTransactions();
        message.success("Ordem de serviço adicionada com Sucesso!");
      }
      setShowAddEditTransactionModal(false);
      setSelectedItemForEdit(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Erro no cadastro");
    }
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle:
      "@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 80px !important; } }",
    documentTitle: "Ordem de Serviço",
  });

  return (
    <Modal
      title={
        selectedItemForEdit
          ? "Editar Ordem de Serviço"
          : "Adicionar Ordem de Serviço"
      }
      open={showAddEditTransactionModal}
      onCancel={() => setShowAddEditTransactionModal(false)}
      footer={false}
    >
      {loading && <Spinner />}

      <br></br>
      <Form
        layout="vertical"
        className="transaction-form"
        onFinish={onFinish}
        initialValues={selectedItemForEdit}
      >
        <div ref={printRef} className="PrintSection">
          <h3 className="align-items-center mb-3">Oficina Balczarek</h3>
          <Form.Item label="Valor:" name="amount">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Ordem de Serviço:" name="id">
            <Input type="number" />
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
              <Option value="Viagem">Viagem</Option>
              <Option value="food">Comida</Option>
              <Option value="tax">Imposto</Option>
            </Select>
          </Form.Item>

          <Form.Item name="date" label="Selecione a data">
            <Input type="date" />
          </Form.Item>

          <Form.Item label="Referência:" name="reference">
            <TextArea type="text" />
          </Form.Item>

          <Form.Item label="Descrição:" name="description">
            <Input type="text" />
          </Form.Item>

          <div>
            <button onClick={handlePrint} className="primary">
              Print
            </button>
          </div>
          <div className="d-flex justify-content-end">
            <button className="primary" type="submit">
              Salvar
            </button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default AddEditTransaction;
