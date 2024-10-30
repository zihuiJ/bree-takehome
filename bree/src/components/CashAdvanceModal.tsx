import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  width: 400px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CashAdvanceModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = () => {
    alert(`You have requested $${amount}`);
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Request Cash Advance</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount"
          max={350}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CashAdvanceModal;
