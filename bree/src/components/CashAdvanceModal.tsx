import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
`;

const ModalOverlay = styled.div<{ isClosing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${({ isClosing }) => (isClosing ? fadeOut : fadeIn)} 0.3s
    ease-in-out;
  transition: opacity 0.3s;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 24px;
  border-radius: 12px;
  width: 400px;
  position: relative;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #7d7d7d;

  &:hover {
    color: #3b82f6;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 8px;
  font-size: 0.9rem;
`;

const StyledNumberInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 16px 0;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 1rem;
  appearance: textfield;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
`;

const SubmitButton = styled.button`
  flex: 2;
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 12px 0;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    background-color: #2563eb;
  }
`;

const CancelButton = styled.button`
  flex: 1;
  background-color: transparent;
  color: #3b82f6;
  border: 1px solid #3b82f6;
  padding: 12px 0;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    background-color: rgba(59, 130, 246, 0.1);
  }
`;

const CashAdvanceModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [amount, setAmount] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);

  const handleAmountChange = (value: string) => {
    const numericValue = value === "" ? 0 : Number(value);
    setAmount(numericValue);
    if (numericValue > 350) {
      setError("Please input an amount below $350");
    } else {
      setError(null);
    }
  };

  const handleSubmit = () => {
    if (amount === "" || amount === 0 || amount > 350) {
      setError("Please input an amount below $350");
      return;
    }
    setError(null);
    alert(`You have requested $${amount}`);
    handleClose();
  };

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setError(null); // Reset error on modal open
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Close after animation
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay isClosing={isClosing}>
      <ModalContent>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <StyledNumberInput
          type="number"
          value={amount === "" ? "" : amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          min="0"
          max="350"
          step="10"
          placeholder="Enter amount"
        />
        {error && <ErrorText>{error}</ErrorText>}
        <ButtonGroup>
          <CancelButton onClick={handleClose}>Cancel</CancelButton>
          <SubmitButton onClick={handleSubmit}>Request</SubmitButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CashAdvanceModal;
