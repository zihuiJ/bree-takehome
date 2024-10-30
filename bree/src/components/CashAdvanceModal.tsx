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

const StyledNumberInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 16px 0;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 1rem;
  appearance: textfield; /* Remove default spinner */

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
  width: 100%;
  background-color: #3b82f6; /* Primary blue color */
  color: white;
  border: none;
  padding: 12px 0;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    background-color: #2563eb; /* Darker blue on hover */
  }
`;

const CancelButton = styled.button`
  flex: 1;
  width: 100%;
  background-color: transparent; /* Transparent background */
  color: #3b82f6; /* Blue text color */
  border: 1px solid #3b82f6; /* Blue border */
  padding: 12px 0;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    background-color: rgba(
      59,
      130,
      246,
      0.1
    ); /* Light blue background on hover */
  }
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: 600; /* Medium bold like the example */
  color: #333; /* Dark grey for the heading */
  margin-bottom: 4px; /* Space between heading and subheading */
`;

const SubTitle = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: #7d7d7d; /* Lighter grey for subheading */
  margin-top: 0; /* Remove extra margin at the top */
  margin-bottom: 16px; /* Spacing below the subheading */
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CashAdvanceModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [amount, setAmount] = useState<number | "">("");
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission

  const handleAmountChange = (value: string) => {
    const numericValue =
      value === "" ? "" : Math.max(0, Math.min(350, Number(value)));
    setAmount(numericValue);
  };

  const handleIncrement = (step: number) => {
    setAmount((prevAmount) => Math.min(350, (prevAmount || 0) + step));
  };

  const handleDecrement = (step: number) => {
    setAmount((prevAmount) => Math.max(0, (prevAmount || 0) - step));
  };

  const handleSubmit = () => {
    if (amount === "" || amount === 0) return;
    setIsSubmitted(true); // Set submission state to true
    setTimeout(() => handleClose(), 2000); // Automatically close after showing success message
  };

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false); // Reset animation state
      setIsSubmitted(false); // Reset submission state when reopened
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

        {/* Conditionally render success message or input form */}
        {isSubmitted ? (
          <>
            <Title>Success!</Title>
            <SubTitle>
              You have requested ${amount}. It will be processed shortly.
            </SubTitle>
          </>
        ) : (
          <>
            <Title>Request Cash Advance</Title>
            <SubTitle>No additional fees required.</SubTitle>

            <StyledNumberInput
              type="number"
              value={amount === "" ? "" : amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              min="0"
              max="350"
              step="10"
              placeholder="Enter amount"
            />

            <ButtonGroup>
              <CancelButton onClick={handleClose}>Cancel</CancelButton>
              <SubmitButton onClick={handleSubmit}>Request</SubmitButton>
            </ButtonGroup>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default CashAdvanceModal;
