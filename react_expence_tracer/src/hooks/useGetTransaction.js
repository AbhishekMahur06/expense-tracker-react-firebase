import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotal, setTransactionTotal] = useState({
    balance: 0.0,
    income: 0.0,
    expense: 0.0,
  });

  const transactionCollectionRef = collection(db, "transactions");
  const { userId } = useGetUserInfo();

  const getTransactions = async () => {
    let unsubscribe;

    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userId", "==", userId),
        orderBy("createdAt")
      );

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });

          if (data.transactionType === "expense") {
            totalExpenses += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }
        });

        setTransactions(docs);

        let balance = totalIncome - totalExpenses;
        setTransactionTotal({
          balance,
          expense: totalExpenses,
          income: totalIncome,
        });
      });
    } catch (error) {
      console.log(error);
    }
    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, transactionTotal };
};
