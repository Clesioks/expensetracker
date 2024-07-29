import React from "react";
import "../resources/analatics.css";
import { Progress } from "antd";

const Analictys = ({ transactions }) => {
  const totalTransactions = transactions.length;

  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "entrada"
  );
  const totalExpenceTransactions = transactions.filter(
    (transaction) => transaction.type === "saida"
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
    .filter((transaction) => transaction.type === "entrada")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenceTurnover = transactions
    .filter((transaction) => transaction.type === "saida")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercentage =
    (totalIncomeTurnover / totalTurnover) * 100;

  const totalExpenceTurnoverPercentage =
    (totalExpenceTurnover / totalTurnover) * 100;

  const categories = ["Beto", "Fagner", "Rafael", "Tiago", "Loja"];

  const formaPg = ["Dinheiro", "Pix", "Cartão", "Ficha", "Empenho"];

  const pecasServico = ["Peças", "Serviço", "Serviço e Peça"];

  return (
    <>
      <div className="analytics">
        <hr />
        <div className="row">
          <div className="col-md-6">
            <div className="category-analysis"></div>
            <h4>Formas de pagamento</h4>
            {formaPg.map((formapagamento, index) => {
              const amount = transactions
                .filter(
                  (t) =>
                    t.type === "entrada" && t.formapagamento === formapagamento
                )
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className="category-card" key={index}>
                    <h5>{formapagamento}</h5>
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
            <h4>Valor total de pagamento</h4>
            {formaPg.map((formapagamento, index) => {
              const amount = transactions
                .filter(
                  (t) =>
                    t.type === "entrada" && t.formapagamento === formapagamento
                )
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className="category-card-2" key={index}>
                    <h5>
                      {formapagamento} - R${amount}
                    </h5>
                  </div>
                )
              );
            })}
          </div>
          <div className="col-md-6">
            <div className="category-analysis"></div>
            <h4>Total por mecânico em %</h4>
            {categories.map((mecanico, index) => {
              const amount = transactions
                .filter((t) => t.type === "entrada" && t.mecanico === mecanico)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className="category-card" key={index}>
                    <h5>{mecanico}</h5>
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
            <h4>Valor total por mêcanico em reais</h4>
            {categories.map((mecanico, index) => {
              const amount = transactions
                .filter((t) => t.type === "entrada" && t.mecanico === mecanico)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className="category-card-2" key={index}>
                    <h5>
                      {mecanico} - R${amount}
                    </h5>
                  </div>
                )
              );
            })}
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mt-3">
            <div className="transactions-count">
              <h4>Total de Ordem de Serviços: {totalTransactions}</h4>
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

          <div className="col-md-6">
            <div className="category-analysis"></div>
            <h4>Peças e Serviços</h4>
            {pecasServico.map((servpecas, index) => {
              const amount = transactions
                .filter(
                  (t) => t.type === "entrada" && t.servpecas === servpecas
                )
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className="category-card" key={index}>
                    <h5>{servpecas}</h5>
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

          <div className="col-md-4 mt-3">
            <div className="transactions-count">
              <h4>Total em R$: {totalTurnover}</h4>
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
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
};

export default Analictys;
