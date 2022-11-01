import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = React.createContext();

export const UNCATEGORISED_BUDGET_ID = "Uncategorised";

export const useBudgets = () => {
  return useContext(BudgetsContext);
};

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };

  const addExpense = ({ budgetId, amount, description }) => {
    // Sets expenses with an id, budgetId, amount and description
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), budgetId, amount, description }];
    });
  };

  const addBudget = ({ name, maxAmount }) => {
    // Sets budgets with an id, name and amount
    setBudgets((prevBudgets) => {
      // Check to see if a budget with this name already exists and return if so
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }

      return [...prevBudgets, { id: uuidV4(), name, maxAmount }];
    });
  };

  const deleteBudget = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense; // if the expense doesn't belong to this budget, ignore it
        return { ...expense, budgetId: UNCATEGORISED_BUDGET_ID };
      });
    });
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
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
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
