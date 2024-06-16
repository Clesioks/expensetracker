import { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import "../resources/transactions.css";
import AddEditTransaction from "../components/AddEditTransaction";
import Spinner from "../components/Spinner";
import axios from "axios";
import { Table, message } from "antd";
// import { format } from "date-fns";
// import ptBR from "date-fns/locale/pt-BR";
// import numeral from "numeral";
// import { br } from "numeral/locales/pt-br";
import moment from "moment";

const Home = () => {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("sheymoney-udemy-user"));
      setLoading(true);
      const response = await axios.get(
        "/api/transactions/get-all-transactions",
        { user: user._id }
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
  }, []);

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
    },
    {
      title: "Valor",
      dataIndex: "amount",
    },
    {
      title: "Categoria",
      dataIndex: "category",
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
        <div></div>

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
