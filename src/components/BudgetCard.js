import { Card, ProgressBar, Stack, Button } from "react-bootstrap";
import { formatCurrency } from "../utils";

// Returns the expected ratio - the number of elapsed days so far this month divided by the total number of days in the month
const getExpectedRatio = () => {
  const date = new Date(); // today's date
  const lastDateInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0); // gives the very last day of this month
  const lastDayOfTheMonth = lastDateInMonth.getDate(); // the last day of this month
  const elapsedDays = date.getDate(); // the number of days elapsed so far this month including today
  const expectedRatio = elapsedDays / lastDayOfTheMonth; // the ratio of elapsed days to days in the month

  return expectedRatio;
};

// Returns which variant of the progress bar to use
const getProgressBarVariant = (amount, maxAmount) => {
  const ratio = amount / maxAmount;
  const expectedRatio = getExpectedRatio();

  if (ratio < expectedRatio) return "primary";
  if (ratio < 1) return "warning";
  return "danger";
};

const BudgetCard = ({
  name,
  amount,
  maxAmount,
  grey,
  onAddExpenseClick,
  hideButtons,
  onViewExpensesClick
}) => {
  const classNames = [];

  if (+amount > +maxAmount) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (grey) {
    classNames.push("bg-light");
  }

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <p className="me-2">{name}</p>
          <p className="d-flex align-items-baseline">
            {formatCurrency(amount)}
            {maxAmount && (
              <span className="text-muted ms-1">
                {" / " + formatCurrency(maxAmount)}
              </span>
            )}
          </p>
        </Card.Title>
        {maxAmount && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, maxAmount)}
            min={0}
            max={maxAmount}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              Add Expenses
            </Button>
            <Button variant="outline-secondary" onClick={onViewExpensesClick}>View Expenses</Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;
