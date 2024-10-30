import React, { useState } from "react";
import styled from "styled-components";
import {
  AiOutlineDashboard,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineCreditCard,
} from "react-icons/ai";
import CashAdvanceModal from "./CashAdvanceModal";
import TransactionList from "./TransactionList";

// Theme colors
const primaryColor = "#3b82f6";
const backgroundColor = "#f9f9f9";
const whiteColor = "#ffffff";

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100vh; /* Ensure the layout takes full height */
  background-color: ${backgroundColor};
`;

const Sidebar = styled.nav`
  width: 250px;
  background-color: ${whiteColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Push the Logout button to the bottom */
  align-items: center;
  padding: 24px 0;
  gap: 8px;
  border-right: 1px solid #e0e0e0;
  height: 100vh; /* Full height sidebar */
  position: sticky; /* Make it stick on scroll */
  top: 0; /* Ensure it sticks to the top */
  z-index: 1; /* Keep it above other content */

  @media (max-width: 768px) {
    display: none; /* Hide the sidebar on mobile */
  }
`;

const SidebarOption = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px; /* Reduce gap between icon and text */
  padding: 10px 16px; /* Tighter padding inside each option */
  width: calc(100% - 12px); /* Adjust width to fit smaller margin */
  margin: 4px 6px; /* Less margin between options */
  cursor: pointer;
  color: ${(props) => (props.active ? primaryColor : "#7d7d7d")};
  background-color: ${(props) => (props.active ? "#f4f4f6" : "transparent")};
  font-weight: 500;
  border-radius: 8px; /* Subtle rounded corners */
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: #e0f2fe;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1); /* Softer shadow */
    transform: scale(1.01); /* Slight zoom-in effect */
  }
`;

const LogoutButton = styled.button`
  margin-top: auto;
  padding: 12px 24px;
  background-color: ${primaryColor};
  color: ${whiteColor};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #2563eb;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
`;

const Pane = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background-color: ${whiteColor};
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 600px;

  @media (min-width: 768px) {
    max-width: 80%;
  }

  @media (min-width: 1024px) {
    max-width: 50%;
  }
`;

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${whiteColor};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 0;
  border-top: 1px solid #e0e0e0;

  @media (min-width: 768px) {
    display: none; /* Hide the bottom nav on larger screens */
  }
`;

const NavItem = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 20%; /* Make it fully rounded */
  background-color: ${(props) => (props.active ? "#f4f4f6" : "transparent")};
  color: ${(props) => (props.active ? primaryColor : "#7d7d7d")};
  transition: background-color 0.3s, color 0.3s;

  & svg {
    font-size: 1.8rem;
  }

  &:hover {
    background-color: #e0e0e0; /* Grey background on hover */
    color: ${primaryColor};
  }
`;

const WelcomeHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const Greeting = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
`;

const Subtext = styled.p`
  font-size: 1rem;
  color: #7d7d7d;
  margin: 0;
`;

const Balance = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const RequestButton = styled.button`
  background-color: ${primaryColor};
  color: ${whiteColor};
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2563eb;
  }
`;

const Dashboard: React.FC = () => {
  const [activeOption, setActiveOption] = useState("Dashboard");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleNavigation = (option: string) => {
    setActiveOption(option);
  };

  return (
    <Layout>
      <Sidebar>
        <SidebarOption
          active={activeOption === "Dashboard"}
          onClick={() => handleNavigation("Dashboard")}
        >
          <AiOutlineDashboard size={24} />
          <span>Dashboard</span>
        </SidebarOption>
        <SidebarOption
          active={activeOption === "Insights"}
          onClick={() => handleNavigation("Insights")}
        >
          <AiOutlineBarChart size={24} />
          <span>Insights</span>
        </SidebarOption>
        <SidebarOption
          active={activeOption === "Settings"}
          onClick={() => handleNavigation("Settings")}
        >
          <AiOutlineSetting size={24} />
          <span>Settings</span>
        </SidebarOption>
        <SidebarOption
          active={activeOption === "Profile"}
          onClick={() => handleNavigation("Profile")}
        >
          <AiOutlineUser size={24} />
          <span>Profile</span>
        </SidebarOption>

        <LogoutButton>Log Out</LogoutButton>
      </Sidebar>

      <ContentArea>
        <Pane>
          <WelcomeHeader>
            <Greeting>Hi, Jess</Greeting>
            <Subtext>Welcome Back!</Subtext>
          </WelcomeHeader>

          <Balance>Available Balance: $350</Balance>

          <ButtonGroup>
            <RequestButton onClick={() => setModalOpen(true)}>
              Request Cash Advance
            </RequestButton>
          </ButtonGroup>

          <TransactionList />

          <CashAdvanceModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
          />
        </Pane>
      </ContentArea>

      <BottomNav>
        <NavItem
          active={activeOption === "Insights"}
          onClick={() => handleNavigation("Insights")}
        >
          <AiOutlineBarChart />
        </NavItem>
        <NavItem
          active={activeOption === "Dashboard"}
          onClick={() => handleNavigation("Dashboard")}
        >
          <AiOutlineDashboard />
        </NavItem>
        <NavItem
          active={activeOption === "Transactions"}
          onClick={() => handleNavigation("Transactions")}
        >
          <AiOutlineCreditCard />
        </NavItem>
      </BottomNav>
    </Layout>
  );
};

export default Dashboard;
