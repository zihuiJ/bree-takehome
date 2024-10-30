import React, { useState } from "react";
import styled from "styled-components";

const transactions = [
  { id: 1, date: "2024-10-28", amount: -120, status: "Completed" }, // Now negative
  { id: 2, date: "2024-10-27", amount: 240, status: "Pending" },
  { id: 3, date: "2024-10-26", amount: -150, status: "Completed" }, // Now negative
  { id: 4, date: "2024-10-25", amount: 450, status: "Completed" },
  { id: 5, date: "2024-10-24", amount: -300, status: "Pending" }, // Now negative
];

const ListWrapper = styled.div`
  margin-top: 16px;
  height: 310px; /* Fixed height for 5 transactions (each 60px + spacing) */
  display: flex;
  flex-direction: column;
  gap: 8px; /* Spacing between items */
`;

const ListItem = styled.div<{ hasTransaction: boolean }>`
  position: relative; /* Make this the anchor for absolute positioning */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 50px;
  background-color: ${(props) =>
    props.hasTransaction ? "#f9f9f9" : "transparent"};
  border-radius: 5px;
  cursor: ${(props) => (props.hasTransaction ? "pointer" : "default")};

  &:hover {
    background-color: ${(props) =>
      props.hasTransaction ? "#e0e0e0" : "transparent"};
  }
`;


const ListItemColumn = styled.span`
  flex: 1; /* Ensure equal space distribution */
  text-align: center; /* Center text horizontally */
  display: flex;
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  margin: 0;
`;

const FilterButton = styled.button<{ selected: boolean }>`
  padding: 10px 16px;
  background: ${(props) =>
    props.selected
      ? "#f4f4f6"
      : "transparent"}; /* Grey background when selected */
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) =>
    props.selected ? "#3b82f6" : "#7d7d7d"}; /* Primary color when selected */
  border-radius: 14px; /* Add rounded corners for the button background */
  transition: background 0.3s, color 0.3s, font-weight 0.3s;

  &:hover {
    background: #e0e0e0; /* Grey background on hover */
    color: #3b82f6;
  }
`;

const StatusTag = styled.span<{ status: string }>`
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.9rem;
  color: ${(props) =>
    props.status === "Completed"
      ? "#1D4ED8"
      : "#90420b"}; /* Blue or brown text */
  background-color: ${(props) =>
    props.status === "Completed"
      ? "#eff6ff" /* Light blue with transparency */
      : "#fefce7"}; /* Light yellow with transparency */
  text-align: center;
  min-width: 80px;
  display: inline-block;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
`;

const HoverDetails = styled.div`
  position: fixed; /* Ensure it follows the cursor */
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  z-index: 10;
  font-size: 0.85rem;
  color: #333;
  white-space: nowrap; /* Prevent text wrapping */
  pointer-events: none; /* Prevent interference with mouse events */
`;



const TransactionList: React.FC = () => {
    const [filter, setFilter] = useState("All");
    const [hoveredTransaction, setHoveredTransaction] = useState<number | null>(
      null
    ); // Track the hovered transaction ID
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 }); // Track the mouse position
  
    const handleMouseMove = (e: React.MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY }); // Update cursor position
    };
  
    const filteredTransactions = transactions.filter(
      (t) => filter === "All" || t.status === filter
    );
  
    // Ensure exactly 5 slots are rendered
    const transactionSlots: ((typeof transactions)[0] | null)[] = [
      ...filteredTransactions,
    ];
  
    while (transactionSlots.length < 5) {
      transactionSlots.push(null); // Add empty slots
    }
  
    return (
      <ListWrapper>
        <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
          <FilterButton
            onClick={() => setFilter("All")}
            selected={filter === "All"}
          >
            All
          </FilterButton>
          <FilterButton
            onClick={() => setFilter("Pending")}
            selected={filter === "Pending"}
          >
            Pending
          </FilterButton>
          <FilterButton
            onClick={() => setFilter("Completed")}
            selected={filter === "Completed"}
          >
            Completed
          </FilterButton>
        </div>
  
        {transactionSlots.map((transaction, index) => (
          <ListItem
            key={index}
            hasTransaction={!!transaction}
            onMouseEnter={() => transaction && setHoveredTransaction(transaction.id)}
            onMouseLeave={() => setHoveredTransaction(null)}
            onMouseMove={handleMouseMove} // Track mouse movements
          >
            {transaction ? (
              <>
                <ListItemColumn>{transaction.date}</ListItemColumn>
                <ListItemColumn>
                  {transaction.amount < 0
                    ? `-$${Math.abs(transaction.amount)}`
                    : `$${transaction.amount}`}
                </ListItemColumn>
                <ListItemColumn>
                  <StatusTag status={transaction.status}>
                    {transaction.status}
                  </StatusTag>
                </ListItemColumn>
  
                {/* Render additional details if this transaction is hovered */}
                {hoveredTransaction === transaction.id && (
                  <HoverDetails style={{ top: cursorPos.y, left: cursorPos.x }}>
                    <p>ID: {transaction.id}</p>
                    <p>Repayment Date: {transaction.date}</p>
                  </HoverDetails>
                )}
              </>
            ) : (
              <span style={{ opacity: 0 }}>Empty</span>
            )}
          </ListItem>
        ))}
      </ListWrapper>
    );
  };
  

export default TransactionList;
