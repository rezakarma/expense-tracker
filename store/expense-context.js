import { createContext, useReducer } from "react";

// const DUMMY_EXPENSES = [
//   {
//     id: "e1",
//     description: "a pair of shoes",
//     amount: 59.99,
//     date: new Date("2023-01-02"),
//   },
//   {
//     id: "e2",
//     description: "a pair of banana",
//     amount: 34.99,
//     date: new Date("2023-05-08"),
//   },
//   {
//     id: "e3",
//     description: "a pair of trousers",
//     amount: 12.99,
//     date: new Date("2023-02-12"),
//   },
//   {
//     id: "e4",
//     description: "a book",
//     amount: 5.99,
//     date: new Date("2023-08-11"),
//   },
//   {
//     id: "e5",
//     description: "another book",
//     amount: 2.99,
//     date: new Date("2023-07-05"),
//   },
//   {
//     id: "e6",
//     description: "a pair of shoes",
//     amount: 59.99,
//     date: new Date("2023-01-02"),
//   },
//   {
//     id: "e7",
//     description: "a pair of banana",
//     amount: 34.99,
//     date: new Date("2023-05-08"),
//   },
//   {
//     id: "e8",
//     description: "a pair of trousers",
//     amount: 12.99,
//     date: new Date("2024-07-22"),
//   },
//   {
//     id: "e9",
//     description: "a book",
//     amount: 5.99,
//     date: new Date("2023-08-11"),
//   },
//   {
//     id: "e10",
//     description: "another book",
//     amount: 2.99,
//     date: new Date("2023-07-05"),
//   },
//   {
//     id: "e11",
//     description: "a pair of shoes",
//     amount: 59.99,
//     date: new Date("2023-01-02"),
//   },
//   {
//     id: "e12",
//     description: "a pair of banana",
//     amount: 34.99,
//     date: new Date("2023-05-08"),
//   },
//   {
//     id: "e13",
//     description: "a pair of trousers",
//     amount: 12.99,
//     date: new Date("2023-02-12"),
//   },
//   {
//     id: "e14",
//     description: "a book",
//     amount: 5.99,
//     date: new Date("2023-08-11"),
//   },
//   {
//     id: "e15",
//     description: "another book",
//     amount: 2.99,
//     date: new Date("2023-07-05"),
//   },
// ];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const uodatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[uodatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };

      const updatedExpenses = [...state];
      updatedExpenses[uodatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: "SET", payload: expenses });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  };

  const value = {
    expenses: state,
    addExpense,
    setExpenses,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
