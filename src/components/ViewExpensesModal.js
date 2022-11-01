import { Modal, Button, Stack } from "react-bootstrap";
import {
  UNCATEGORISED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import { formatCurrency } from "../utils";

const ViewExpensesModal = ({ budgetId, handleClose }) => {
  const { getBudgetExpenses, deleteBudget, deleteExpense, budgets } =
    useBudgets();

  const expenses = getBudgetExpenses(budgetId);

  const uncategorisedBudgetSelected = UNCATEGORISED_BUDGET_ID === budgetId;

  const budget = uncategorisedBudgetSelected
    ? { name: "Uncategorised", id: UNCATEGORISED_BUDGET_ID }
    : budgets.find((budget) => budget.id === budgetId);
  // if budget is uncategorised budget, create a new budget to be able to use this modal, otherwise, give actual budget

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>{budget?.name}</div>
            {/* Only gets budget name if it id defined */}
            {!uncategorisedBudgetSelected && (
              <Button
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map((expense) => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">{formatCurrency(expense.amount)}</div>
              <Button
                onClick={() => deleteExpense(expense)}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpensesModal;
