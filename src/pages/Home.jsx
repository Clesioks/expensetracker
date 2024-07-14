import { useEffect, useRef, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import "../resources/transactions.css";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import AddEditTransaction from "../components/AddEditTransaction";
import Spinner from "../components/Spinner";
import axios from "axios";
import { DatePicker, Select, Table, message } from "antd";
import moment from "moment";
import Analictys from "../components/Analictys";
import { useReactToPrint } from "react-to-print";
const { RangePicker } = DatePicker;

const Home = () => {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("Todos");
  const [selectedRange, setSelectedRange] = useState([]);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [selectedItemFromPrint, setSelectedItemFromPrint] = useState([]);
  const [viewType, setViewType] = useState("table");
  const printRef = useRef();

  moment.locale("pt-br");

  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("sheymoney-udemy-user"));
      setLoading(true);
      const response = await axios.post(
        "/api/transactions/get-all-transactions",
        {
          user: user._id,
          frequency,
          ...(frequency === "custom" && { selectedRange }),
          type,
        }
      );
      setTransactionsData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Alguma coisa deu errado");
    }
  };

  const deleteTransaction = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/transactions/delete-transaction", {
        transactionId: record._id,
      });
      message.success("Transação deletada com sucesso");
      getTransactions();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Alguma coisa deu errado");
    }
  };

  const buscaOneId = async (record) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/transactions/get-all-print-id", {
        transactionId: record._id,
        amount: record.amount,
        reference: record.reference,
        OSid: record.OSid,
        date: record.date,
      });
      setSelectedItemFromPrint(response.data);
      message.success("Order aberta com sucesso");
      getTransactions();
      setLoading(false);
      console.log(selectedItemFromPrint);
    } catch (error) {
      setLoading(false);
      message.error("Alguma coisa deu errado");
    }
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle:
      "@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 80px !important; } }",
    documentTitle: "Ordem de Serviço",
  });

  useEffect(() => {
    getTransactions();
  }, [frequency, selectedRange, type, selectedItemFromPrint]);

  const columns = [
    {
      title: "Data",
      dataIndex: "date",
      render: (record) => (
        <span>{moment(record).utc().format("DD-MM-YYYY")}</span>
      ),
    },
    {
      title: "OS",
      dataIndex: "OSid",
    },
    {
      title: "Cliente",
      dataIndex: "cliente",
    },
    {
      title: "Nome",
      dataIndex: "nomeCliente",
    },
    {
      title: "Telefone",
      dataIndex: "telefone",
    },
    {
      title: "Valor de peças",
      dataIndex: "valorPecas",
    },
    {
      title: "Valor da mão de obra",
      dataIndex: "valorDaObra",
    },
    {
      title: "Valor",
      dataIndex: "amount",
    },
    {
      title: "Mecânico",
      dataIndex: "mecanico",
    },
    {
      title: "Tipo",
      dataIndex: "type",
    },
    {
      title: "Ações",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div>
            <EditOutlined
              onClick={() => {
                setSelectedItemForEdit(record);
                setShowAddEditTransactionModal(true);
              }}
            />
            <DeleteOutlined
              className="mx-3"
              onClick={() => deleteTransaction(record)}
            />
            <FolderOpenOutlined
              onClick={() => {
                buscaOneId(record);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <DefaultLayout>
        {loading && <Spinner />}
        <div className="filter d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <div className="d-flex flex-column">
              <h6>Selecione o Período</h6>
              <Select
                value={frequency}
                onChange={(value) => setFrequency(value)}
              >
                <Select.Option value="7">Últimos 7 dias</Select.Option>
                <Select.Option value="30">Últimos 30 dias</Select.Option>
                <Select.Option value="365">Último Ano</Select.Option>
                <Select.Option value="custom">Escolha o período</Select.Option>
              </Select>
            </div>
            {/* **************************** */}
            <div className="d-flex flex-column mx-5">
              <h6>Selecione o tipo</h6>
              <Select value={type} onChange={(value) => setType(value)}>
                <Select.Option value="Todos">Todos</Select.Option>
                <Select.Option value="income">Entrada</Select.Option>
                <Select.Option value="expence">Saída</Select.Option>
              </Select>

              {frequency === "custom" && (
                <div className="mt-2">
                  <RangePicker
                    value={selectedRange}
                    onChange={(values) => setSelectedRange(values)}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="d-flex">
            <div>
              <div className="view-switch mx-5">
                <UnorderedListOutlined
                  className={` mx-3 ${
                    viewType === "table" ? "active-icon" : "inactive-icon"
                  }`}
                  onClick={() => setViewType("table")}
                  size={30}
                />
                <AreaChartOutlined
                  className={`${
                    viewType === "analytics" ? "active-icon" : "inactive-icon"
                  }`}
                  onClick={() => setViewType("analytics")}
                  size={30}
                />
              </div>
            </div>
            <div className="mx-2 my-2">Ordem de Serviço:</div>
            <button
              className="primary"
              onClick={() => setShowAddEditTransactionModal(true)}
            >
              Adicionar
            </button>
          </div>
        </div>

        <div className="table-analitics">
          {viewType === "table" ? (
            <div className="table">
              <Table
                columns={columns}
                dataSource={transactionsData}
                rowKey={() => Math.random()}
              />
            </div>
          ) : (
            <Analictys transactions={transactionsData} />
          )}
        </div>

        <div ref={printRef} className="PrintSection">
          <h2 className="text-center">Oficina Baclzarek</h2>
          <h4>Ordem de serviço: {selectedItemFromPrint.OSid}</h4>
          <div>
            Data:{" "}
            {moment(selectedItemFromPrint.date).utc().format("DD-MM-YYYY")}
          </div>
          <div>Cliente: {selectedItemFromPrint.cliente}</div>
          <div>Nome: {selectedItemFromPrint.nomeCliente}</div>
          <div>Telefone: {selectedItemFromPrint.telefone}</div>
          <div>Carro/Placa: {selectedItemFromPrint.carroPlaca}</div>
          <div>
            Descrição das peças: {selectedItemFromPrint.descriptionPecas}
          </div>
          <div>Custo do serviço: R${selectedItemFromPrint.amount}</div>

          <br></br>
          {selectedItemFromPrint.reference}
        </div>
        <div className="mt-5">
          <button onClick={handlePrint}>Imprimir</button>
        </div>

        {showAddEditTransactionModal && (
          <AddEditTransaction
            showAddEditTransactionModal={showAddEditTransactionModal}
            setShowAddEditTransactionModal={setShowAddEditTransactionModal}
            selectedItemForEdit={selectedItemForEdit}
            getTransactions={getTransactions}
            setSelectedItemForEdit={setSelectedItemForEdit}
          />
        )}

        <br></br>
        <hr />
      </DefaultLayout>
    </>
  );
};

export default Home;
