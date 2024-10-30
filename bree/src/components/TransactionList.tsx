import React, { useState } from 'react';
import styled from 'styled-components';

const transactions = [
  { id: 1, date: '2024-10-28', amount: 120, status: 'Completed' },
  { id: 2, date: '2024-10-27', amount: 240, status: 'Pending' },
  { id: 3, date: '2024-10-26', amount: 150, status: 'Completed' },
  { id: 4, date: '2024-10-25', amount: 450, status: 'Completed' },
  { id: 5, date: '2024-10-24', amount: 300, status: 'Pending' },
];

const ListWrapper = styled.div`
  margin-top: 16px;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f9f9f9;
  margin-bottom: 8px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const TransactionList: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const filteredTransactions = transactions.filter(
    (t) => filter === 'All' || t.status === filter
  );

  return (
    <ListWrapper>
      <div>
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Pending')}>Pending</button>
        <button onClick={() => setFilter('Completed')}>Completed</button>
      </div>
      {filteredTransactions.map((transaction) => (
        <ListItem key={transaction.id}>
          <span>{transaction.date}</span>
          <span>${transaction.amount}</span>
          <span>{transaction.status}</span>
        </ListItem>
      ))}
    </ListWrapper>
  );
};

export default TransactionList;
