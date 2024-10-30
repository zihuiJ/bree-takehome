import React from 'react';
import Dashboard from './components/Dashboard';
import GlobalStyle from './styles/GlobalStyles';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Dashboard />
    </>
  );
};

export default App;

