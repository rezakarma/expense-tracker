import axios from "axios";

const BACKEND_URL = "https://react-native-3185d-default-rtdb.firebaseio.com";

export const storeExpense = async (expenseData) => {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get(BACKEND_URL + "/expenses.json");
  const expenses = Object.entries(response.data).map(([id, expense]) => ({
    id,
    amount: expense.amount,
    date: new Date(expense.date),
    description: expense.description,
  }));
  return expenses;
};

export const updateExpense = async (id, expenseData) => {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
};

export const deleteExpense = async (id) => {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
};
