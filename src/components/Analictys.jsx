import React from "react";
import "../resources/analatics.css";
import { Progress } from "antd";

const Analictys = ({ transactions }) => {
  const totalTransactions = transactions.length;

  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenceTransactions = transactions.filter(
    (transaction) => transaction.type === "expence"
  );

  const totalIncomeTransactionsPercentage =
    (totalIncomeTransactions.length / totalTransactions) * 100;

  const totalExpenceTransactionsPercentage =
    (totalExpenceTransactions.length / totalTransactions) * 100;

  const totalTurnover = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenceTurnover = transactions
    .filter((transaction) => transaction.type === "expence")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercentage =
    (totalIncomeTurnover / totalTurnover) * 100;

  const totalExpenceTurnoverPercentage =
    (totalExpenceTurnover / totalTurnover) * 100;

  const categories = [
    "salary",
    "freelance",
    "market",
    "entretainment",
    "education",
    "Viagem",
    "food",
    "Tax",
  ];

  return (
    <>
      <div className="analytics">
        <div className="row">
          <div className="col-md-4 mt-3">
            <div className="transactions-count">
              <h4>Total de transações: {totalTransactions}</h4>
              <hr />
              <h5>Entrada: {totalIncomeTransactions.length}</h5>
              <h5>Saída: {totalExpenceTransactions.length}</h5>

              <div className="progress-bars">
                <Progress
                  className="mx-5"
                  type="circle"
                  strokeColor="green"
                  percent={totalIncomeTransactionsPercentage.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor="red"
                  percent={totalExpenceTransactionsPercentage.toFixed(0)}
                />
              </div>
            </div>
          </div>

          <div className="col-md-4 mt-3">
            <div className="transactions-count">
              <h4>Total de negócios: {totalTurnover}</h4>
              <hr />
              <h5>Entrada: {totalIncomeTurnover}</h5>
              <h5>Saída: {totalExpenceTurnover}</h5>

              <div className="progress-bars">
                <Progress
                  className="mx-5"
                  type="circle"
                  strokeColor="green"
                  percent={totalIncomeTurnoverPercentage.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor="red"
                  percent={totalExpenceTurnoverPercentage.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <div className="category-analysis"></div>
            <h4>Entrada - Categoria</h4>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type === "income" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className="category-card">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                )
              );
            })}
          </div>

          <div className="col-md-6">
            <div className="category-analysis"></div>
            <h4>Saída - Categoria</h4>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type === "expence" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className="category-card">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalExpenceTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Analictys;
