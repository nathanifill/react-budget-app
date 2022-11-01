import {
  UNCATEGORISED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

const UncategorisedBudgetCard = (props) => {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORISED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );

  if (amount === 0) return null; // don't show card if there are no uncategorised amounts

  return (
    <BudgetCard
      name="Uncategorised"
      amount={amount}
      {...props}
      grey
    ></BudgetCard>
  );
};

export default UncategorisedBudgetCard;
