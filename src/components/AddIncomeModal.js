import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../contexts/BudgetsContext";
import { formatCurrency } from "../utils";

const AddIncomeModal = ({ show, handleClose }) => {
  const amountRef = useRef();
  const { addIncome, budgetTotal } = useBudgets();

  const handleSubmit = (e) => {
    e.preventDefault();
    addIncome(parseFloat(amountRef.current.value));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{budgetTotal > 0 ? "Edit Income" : "Add Income"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0.01}
              step={0.01}
              placeholder={formatCurrency(budgetTotal)}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add Income
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddIncomeModal;
