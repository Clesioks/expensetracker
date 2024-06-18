import { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import "../resources/transactions.css";
import AddEditTransaction from "../components/AddEditTransaction";
import Spinner from "../components/Spinner";
import axios from "axios";
import { DatePicker, Select, Table, message } from "antd";
// import { format } from "date-fns";
// import ptBR from "date-fns/locale/pt-BR";
// import numeral from "numeral";
// import { br } from "numeral/locales/pt-br";
import moment from "moment";
const { RangePicker } = DatePicker;

const Home = () => {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("Todos");
  const [selectedRange, setSelectedRange] = useState([]);
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

  // const formatDate = (date) => {
  //   return format(date, "dd/MM/yyyy", {
  //     locale: ptBR,
  //   });
  // };

  // numeral.locale("pt-br");

  useEffect(() => {
    getTransactions();
  }, [frequency, selectedRange, type]);

  const columns = [
    // {
    //   title: "Data",
    //   dataIndex: "date",
    //   render: (date) => {
    //     return formatDate(date);
    //   },
    // },
    {
      title: "Data",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Valor",
      dataIndex: "amount",
    },
    {
      title: "Ordem de Serviço",
      dataIndex: "id",
    },
    {
      title: "Categoria",
      dataIndex: "category",
    },
    {
      title: "Tipo",
      dataIndex: "type",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="filter d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h6>Selecione o Período</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
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

        <div>
          <button
            className="primary"
            onClick={() => setShowAddEditTransactionModal(true)}
          >
            Adicionar
          </button>
        </div>
      </div>

      <div className="table-analitics">
        <div className="table">
          <Table
            columns={columns}
            dataSource={transactionsData}
            rowKey={() => Math.random()}
          />
        </div>
      </div>

      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          getTransactions={getTransactions}
        />
      )}
    </DefaultLayout>
  );
};

export default Home;
