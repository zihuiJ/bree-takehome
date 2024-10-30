import React, { useState } from "react";
import styled from "styled-components";
import {
  AiOutlineDashboard,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineCreditCard,
  AiOutlineBell,
} from "react-icons/ai";
import CashAdvanceModal from "./CashAdvanceModal";
import TransactionList from "./TransactionList";

// Theme colors
const primaryColor = "#3b82f6";
const backgroundColor = "#f9f9f9";
const whiteColor = "#ffffff";
const secondaryBackgroundColor = "#f4f4f6"
const subtextColor = "#7d7d7d"

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
  color: ${(props) => (props.active ? primaryColor : subtextColor)};
  background-color: ${(props) => (props.active ? secondaryBackgroundColor : "transparent")};
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
    background-color: ${primaryColor};
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

  /* Add minimum constraints to avoid squishing */
  min-width: 350px;
  min-height: 500px;

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
  width: 60px; /* Adjust width for icon and text */
  height: 70px; /* Adjust height to fit icon and text */
  cursor: pointer;
  border-radius: 12px; /* Rounded corners */
  background-color: ${(props) => (props.active ? secondaryBackgroundColor : "transparent")};
  color: ${(props) => (props.active ? primaryColor : subtextColor)};
  transition: background-color 0.3s, color 0.3s;

  & svg {
    font-size: 1.8rem;
    margin-bottom: 4px; /* Space between icon and text */
  }

  span {
    font-size: 0.9rem; /* Smaller text size */
    font-weight: 500; /* Medium weight for text */
  }

  &:hover {
    background-color: #e0e0e0; /* Grey background on hover */
    color: ${primaryColor};
  }
`;

const HeaderIcons = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 16px;
  align-items: center;
`;

const NotificationIconWrapper = styled.div`
  position: relative;
  cursor: pointer;
  color: ${subtextColor};
  font-size: 2rem;
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  background-color: red;
  color: white;
  font-size: 0.6rem;
  padding: 2px 4px;
  border-radius: 50%;
`;

const WelcomeHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const Greeting = styled.h1`
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0;
`;

const Subtext = styled.p`
  font-size: 1rem;
  color: ${subtextColor};
  margin: 0;
`;

const BalanceContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Align balance left and button right */
  align-items: center;
  width: 100%; /* Make it take full width */
  margin-bottom: 16px; /* Space below the container */
`;

const BalanceText = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
`;

const RequestButton = styled.button`
  background-color: ${primaryColor};
  color: ${whiteColor};
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2563eb;
  }
`;

// const Balance = styled.h2`
//   font-size: 2.5rem;
//   font-weight: bold;
//   text-align: left;
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 12px;
//   justify-content: center;
// `;

// const RequestButton = styled.button`
//   background-color: ${primaryColor};
//   color: ${whiteColor};
//   border: none;
//   padding: 12px 24px;
//   border-radius: 8px;
//   cursor: pointer;
//   font-size: 1rem;
//   font-weight: bold;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #2563eb;
//   }
// `;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
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
          <HeaderIcons>
            <NotificationIconWrapper>
              <AiOutlineBell />
              <NotificationBadge>8</NotificationBadge>
            </NotificationIconWrapper>
          </HeaderIcons>

          <WelcomeHeader>
            <Greeting>Hi, Jess</Greeting>
            <Subtext>Welcome Back!</Subtext>
          </WelcomeHeader>
          <Divider />
          <Subtext>My balance</Subtext>
          <BalanceContainer>
            <BalanceText>$350.00</BalanceText>
            <RequestButton onClick={() => setModalOpen(true)}>
              Request money
            </RequestButton>
          </BalanceContainer>
          <Divider />

          {/* <Balance>$350.00</Balance>

          <ButtonGroup>
            <RequestButton onClick={() => setModalOpen(true)}>
              Request Cash Advance
            </RequestButton>
          </ButtonGroup> */}

          <TransactionList />

          <CashAdvanceModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
          />
        </Pane>
      </ContentArea>

      <BottomNav>
        <NavItem
          active={activeOption === "Transactions"}
          onClick={() => handleNavigation("Transactions")}
        >
          <AiOutlineCreditCard />
          <span>Cards</span>
        </NavItem>
        <NavItem
          active={activeOption === "Dashboard"}
          onClick={() => handleNavigation("Dashboard")}
        >
          <AiOutlineDashboard />
          <span>Home</span>
        </NavItem>
        <NavItem
          active={activeOption === "Insights"}
          onClick={() => handleNavigation("Insights")}
        >
          <AiOutlineBarChart />
          <span>Stat</span>
        </NavItem>
      </BottomNav>
    </Layout>
  );
};

export default Dashboard;
