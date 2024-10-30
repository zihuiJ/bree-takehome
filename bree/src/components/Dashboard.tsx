import React, { useState } from 'react';
import styled from 'styled-components';
import CashAdvanceModal from './CashAdvanceModal';
import TransactionList from './TransactionList';

const DashboardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  width: 80%;
  max-width: 1200px;
`;

const LeftPane = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Balance = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const Dashboard: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <DashboardWrapper>
      <LeftPane>
        <h1>Cash Advance Dashboard</h1>
        <Balance>Available Balance: $350</Balance>
        <ButtonGroup>
          <Button onClick={() => setModalOpen(true)}>Request Cash Advance</Button>
        </ButtonGroup>
        <TransactionList />
      </LeftPane>
      <div>{/* Placeholder for other components */}</div>

      <CashAdvanceModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </DashboardWrapper>
  );
};

export default Dashboard;
