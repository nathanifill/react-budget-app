import { Button, Container, Stack } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import AddIncomeModal from "./components/AddIncomeModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import BudgetCard from "./components/BudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import { useState } from "react";
import { useBudgets } from "./contexts/BudgetsContext";
import Footer from "./components/Footer";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const {
    budgets,
    getBudgetExpenses,
    budgetTotal,
    setBudgets,
    setExpenses,
  } = useBudgets();

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  const resetApp = () => {
    const startingBudgetState = [
      { id: "NEC", name: "Necessities", maxAmount: 0 },
      { id: "FFA", name: "Financial Freedom Amount", maxAmount: 0 },
      { id: "EDU", name: "Education", maxAmount: 0 },
      { id: "PLY", name: "Play", maxAmount: 0 },
      { id: "LTS", name: "Long Term Savings for Spending", maxAmount: 0 },
      { id: "GIV", name: "Give", maxAmount: 0 },
    ];

    setBudgets((prevBudgets) => {
      return startingBudgetState;
    });
    setExpenses(() => {
      return [];
    });
  };

  return (
    <>
      <Container className="my-5" fluid="md">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto fs-1">
            <a href="http://6jars.com/" target="_blank" rel="noreferrer">
              6 Jars
            </a>{" "}
            Budgeting App
          </h1>
          <Button
            variant={budgetTotal > 0 ? "outline-primary" : "primary"}
            onClick={() => {
              setShowAddIncomeModal(true);
            }}
          >
            {budgetTotal > 0 ? "Edit Income" : "Add Income"}
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min-content, 40rem))",
            gap: "1rem",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );

            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                maxAmount={budget.maxAmount}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() =>
                  setViewExpensesModalBudgetId(budget.id)
                }
              />
            );
          })}
          <TotalBudgetCard />
        </div>

        <Stack direction="horizontal" gap="2" className="my-4">
          {budgetTotal > 0 && (
            <Button
              className="ms-auto"
              variant="outline-danger"
              onClick={resetApp}
            >
              Reset App
            </Button>
          )}
        </Stack>
      </Container>
      <Footer />
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
      <AddIncomeModal
        show={showAddIncomeModal}
        handleClose={() => setShowAddIncomeModal(false)}
      />
    </>
  );
}

export default App;
