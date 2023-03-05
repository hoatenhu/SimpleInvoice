import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CreateInvoiceScreen from '../App/Container/CreateInvoiceScreen';

describe('Create Invoice Screen', () => {
  test('submitting a valid form creates an invoice', async () => {
    const mockCreateInvoice = jest.fn();
    const {getByPlaceholderText, getByTestId, getByText} = render(
      <CreateInvoiceScreen createInvoice={mockCreateInvoice} />,
    );

    const referenceInput = getByPlaceholderText('Reference');
    const dateInput = getByPlaceholderText('Date');
    const descriptionInput = getByPlaceholderText('Description');
    const amountInput = getByPlaceholderText('Amount');
    const submitButton = getByTestId('submit-button');

    fireEvent.changeText(referenceInput, 'INV-001');
    fireEvent.changeText(dateInput, '2022-03-01');
    fireEvent.changeText(descriptionInput, 'Consultancy services');
    fireEvent.changeText(amountInput, '1000');
    fireEvent.press(submitButton);

    expect(mockCreateInvoice).toHaveBeenCalledWith({
      reference: 'INV-001',
      date: '2022-03-01',
      description: 'Consultancy services',
      amount: '1000',
    });
    expect(referenceInput).toHaveText('');
    expect(dateInput).toHaveText('');
    expect(descriptionInput).toHaveText('');
    expect(amountInput).toHaveText('');
  });

  test('submitting an invalid form shows an error message', async () => {
    const mockCreateInvoice = jest.fn();
    const {getByPlaceholderText, getByTestId, getByText} = render(
      <CreateInvoiceScreen createInvoice={mockCreateInvoice} />,
    );

    const submitButton = getByTestId('submit-button');
    fireEvent.press(submitButton);

    const errorMessage = getByText('Please fill in all fields');
    expect(errorMessage).toBeTruthy();
  });
});
