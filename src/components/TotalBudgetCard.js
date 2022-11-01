import {
  useBudgets,
} from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

const TotalBudgetCard = (props) => {
  const { expenses, budgets } = useBudgets();
  const amount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const maxAmount = budgets.reduce(
    (total, budget) => total + budget.maxAmount,
    0
  );

  if (maxAmount === 0) return null; // don't show card if there is no max amount

  return (
    <BudgetCard
      name="Total"
      amount={amount}
      grey
      maxAmount={maxAmount}
      hideButtons
    ></BudgetCard>
  );
};

export default TotalBudgetCard;
