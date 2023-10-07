import "./style.css";
import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransaction } from "../../hooks/useGetTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotal } = useGetTransaction();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();
  const { balance, income, expense } = transactionTotal;

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("expense");

  const onsubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription("");
    setTransactionAmount("");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* div-1 */}
      <div className="expense-tracker">
        <div className="container">
          <h1> {name}'s Expense Tracker</h1>

          <div className="balance">
            <h3>Your Balance</h3>
            {balance > 0 ? <h2>${balance}</h2> : <h2>-${balance * -1}</h2>}
          </div>

          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>${income}</p>
            </div>

            <div className="expnenses">
              <h4>Expenses</h4>
              <p>${expense}</p>
            </div>

            <form className="add-transaction" onSubmit={onsubmit}>
              <input
                type="text"
                placeholder="Description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                placeholder="Amount"
                value={transactionAmount}
                required
                onChange={(e) => setTransactionAmount(e.target.value)}
              />

              <input
                type="radio"
                id="expense"
                value="expense"
                checked={transactionType === "expense"}
                onClick={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="expense">Expense</label>

              <input
                type="radio"
                id="income"
                value="income"
                checked={transactionType === "income"}
                onClick={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="income">Income</label>

              <button type="submit">Add Transaction</button>
            </form>
          </div>
        </div>
        {profilePhoto && (
          <div className="profile">
            <img className="profile-photo" src={profilePhoto} />
            <button className="sign-out-button" onClick={signUserOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* div-2 */}

      <div className="transaction">
        <h3>Transaction</h3>
        <ul>
          {transactions.map((transation) => {
            const { description, transactionAmount, transactionType } =
              transation;
            return (
              <li key={transation.id}>
                <h4>{description}</h4>
                <p>
                  ${transactionAmount} ---
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {transactionType}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
