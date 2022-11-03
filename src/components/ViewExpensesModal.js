import { Modal, Button, Stack } from "react-bootstrap";
import {
  useBudgets,
} from "../contexts/BudgetsContext";
import { formatCurrency } from "../utils";

const ViewExpensesModal = ({ budgetId, handleClose }) => {
  const { getBudgetExpenses, deleteExpense, budgets } = useBudgets();
  const expenses = getBudgetExpenses(budgetId);
  const budget = budgets.find((budget) => budget.id === budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>{budget?.name}</div>
            {/* Only gets budget name if it is defined */}
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
          {expenses.length === 0 && "There are no expenses remaining."}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpensesModal;
