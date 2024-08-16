import { Text } from "react-native";
import ExpensesOutput from "../components/expensesOutput/expensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expense-context";

const AllExpense = () => {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
};

export default AllExpense;
