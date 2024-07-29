import React, { useState } from "react";
import Modal from "antd/es/modal/Modal";
import Form from "antd/es/form/Form";
import Input from "antd/es/input/Input";
import { Select, message } from "antd";
import Spinner from "./Spinner";
import axios from "axios";
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
        <h3 className="align-items-center mb-3">Auto Elétrica Balczarek</h3>

        <Form.Item label="Tipo:" name="type">
          <Select placeholder="Selecione Entrada ou Saída">
            <Option value="entrada">Entrada</Option>
            <Option value="saida">Saída</Option>
          </Select>
        </Form.Item>

        <Form.Item name="date" label="Selecione a data">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Serviço e/ou Peça:" name="servpecas">
          <Select placeholder="Selecione serviço ou peças">
            <Option value="Peças">Peça</Option>
            <Option value="Serviço">Serviço</Option>
            <Option value="Serviço e Peça">Serviço e peça</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Cliente:" name="cliente">
          <Select placeholder="Selecione o cliente">
            <Option value="Particular">Particular</Option>
            <Option value="Prefeitura">Prefeitura</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Nome:" name="nomeCliente">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Telefone:" name="telefone">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Carro/Placa:" name="carroPlaca">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Mecânico / Loja" name="mecanico">
          <Select placeholder="Selecione um mecânico">
            <Option value="Loja">Loja</Option>
            <Option value="Beto">Beto</Option>
            <Option value="Fagner">Fagner</Option>
            <Option value="Rafael">Rafael</Option>
            <Option value="Tiago">Tiago</Option>
          </Select>
        </Form.Item>

        <div className="borda">
          <Form.Item label="Descrição das peças:" name="descriptionPecas">
            <TextArea type="text" />
          </Form.Item>

          <Form.Item label="Valor das peças:" name="valorPecas">
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
        </div>

        <div className="borda">
          <Form.Item
            label="Observação e/ou descrição da mão de obra:"
            name="descriptionMaoObra"
          >
            <TextArea type="text" />
          </Form.Item>

          <Form.Item label="Valor da mão de obra:" name="valorDaObra">
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
        </div>

        <Form.Item label="Forma de pagamento" name="formapagamento">
          <Select placeholder="Selecione a forma de pagamento">
            <Option value="Dinheiro">Dinheiro</Option>
            <Option value="Pix">Pix</Option>
            <Option value="Cartão">Cartão</Option>
            <Option value="Ficha">Ficha</Option>
            <Option value="Empenho">Empenho</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Valor final:" name="amount">
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
  );
};

export default AddEditTransaction;
