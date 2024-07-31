import logo from "./../resources/img/oficina.jpeg";
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
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

dayjs().format();

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
      title: "Nome",
      dataIndex: "nomeCliente",
    },
    {
      title: "Telefone",
      dataIndex: "telefone",
    },
    {
      title: "Peças",
      dataIndex: "valorPecas",
    },
    {
      title: "Mão de obra",
      dataIndex: "valorDaObra",
    },
    // {
    //   title: "Total",
    //   dataIndex: "amount",
    //   render: (text, record) =>
    //     parseInt(record.valorPecas) + parseInt(record.valorDaObra),
    // },
    {
      title: "Total",
      dataIndex: "amount",
    },
    {
      title: "Mecânico",
      dataIndex: "mecanico",
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
                <Select.Option value="entrada">Entrada</Select.Option>
                <Select.Option value="saida">Saída</Select.Option>
              </Select>

              {frequency === "custom" && (
                <div className="mt-2">
                  <RangePicker
                    format={"DD-MM-YYYY"}
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
        {/* ################################################################################################################### */}
        <div ref={printRef} className="PrintSection">
          {/* <div className="marcador align-items-center">
            <img src={logo} width="140" height="75" alt="logo" />
          </div> */}
          <h3 className="text-center">Auto Peças Baclzarek </h3>
          <h6 className="text-center">
            Rua Cândido Godói, 620 - Centro - Dom Feliciano/RS - Tel:
            51-99619-9747
          </h6>
          <br></br>
          <br></br>

          <div className="d-flex justify-content-between">
            <h5>Ordem de serviço: {selectedItemFromPrint.OSid} </h5>

            <h5>
              <div>Mecânico: {selectedItemFromPrint.mecanico}</div>
            </h5>

            <h5>
              {" "}
              Data:{" "}
              {moment(selectedItemFromPrint.date).utc().format("DD-MM-YYYY")}
            </h5>
          </div>
          <br></br>
          <div>Nome: {selectedItemFromPrint.nomeCliente}</div>
          <div>Telefone: {selectedItemFromPrint.telefone}</div>
          <div>Carro/Placa: {selectedItemFromPrint.carroPlaca}</div>
          <hr />
          <div>Serviço e/ou Peças: {selectedItemFromPrint.servpecas}</div>
          <div>
            Descrição das peças: {selectedItemFromPrint.descriptionPecas}
          </div>
          <div className="negrito">
            Valor das peças: R${selectedItemFromPrint.valorPecas}
          </div>
          <hr />

          <div>
            Descrição da mão de obra: {selectedItemFromPrint.descriptionMaoObra}
          </div>
          <div className="negrito">
            Valor da mão de obra: R${selectedItemFromPrint.valorDaObra}
          </div>
          <hr />
          <div>
            <div className="negrito">
              Valor total: R${selectedItemFromPrint.amount}
            </div>
          </div>
          <br></br>
          <div>Forma de pagamento: {selectedItemFromPrint.formapagamento}</div>

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
