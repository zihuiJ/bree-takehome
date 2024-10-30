import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CashAdvanceModal from '../CashAdvanceModal';

describe('CashAdvanceModal', () => {
  const mockOnClose = jest.fn();

  it('should display an error message if the amount exceeds 350', () => {
    render(<CashAdvanceModal isOpen={true} onClose={mockOnClose} />);

    const input = screen.getByPlaceholderText('Enter amount');
    const submitButton = screen.getByText('Request');

    fireEvent.change(input, { target: { value: '400' } });
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('Please input an amount below $350');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should not show an error if the amount is valid', () => {
    render(<CashAdvanceModal isOpen={true} onClose={mockOnClose} />);

    const input = screen.getByPlaceholderText('Enter amount');
    const submitButton = screen.getByText('Request');

    fireEvent.change(input, { target: { value: '300' } });
    fireEvent.click(submitButton);

    expect(screen.queryByText('Please input an amount below $350')).not.toBeInTheDocument();
  });
});
