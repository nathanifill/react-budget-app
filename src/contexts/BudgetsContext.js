import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = React.createContext();

export const useBudgets = () => {
  return useContext(BudgetsContext);
};

const startingBudgetState = [
  { id: "NEC", name: "Necessities", maxAmount: 0 },
  { id: "FFA", name: "Financial Freedom Amount", maxAmount: 0 },
  { id: "EDU", name: "Education", maxAmount: 0 },
  { id: "PLY", name: "Play", maxAmount: 0 },
  { id: "LTS", name: "Long Term Savings for Spending", maxAmount: 0 },
  { id: "GIV", name: "Give", maxAmount: 0 },
];

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", startingBudgetState);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  const budgetTotal = budgets.reduce(
    (total, budget) => total + budget.maxAmount,
    0
  );
  // gets total income/max budget across all jars (budgets)

  const addIncome = (amount) => {
    setBudgets((prevBudgets) => {
      return prevBudgets.map((budget) => {
        if (budget.id === "NEC") {
          budget.maxAmount = amount * 0.55;
        } else if (budget.id === "GIV") {
          budget.maxAmount = amount * 0.05;
        } else {
          budget.maxAmount = amount * 0.1;
        }
        return budget;
      });
    });
  };

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };

  const addExpense = ({ budgetId, amount, description }) => {
    // Sets expenses with an id, budgetId, amount and description
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), budgetId, amount, description }];
    });
  };

  const deleteExpense = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  };

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        deleteExpense,
        addIncome,
        budgetTotal,
        startingBudgetState,
        setBudgets,
        setExpenses,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
