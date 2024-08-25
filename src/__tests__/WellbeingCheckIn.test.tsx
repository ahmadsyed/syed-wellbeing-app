// src/__tests__/WellbeingCheckIn.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WellbeingCheckIn from '../widgets/WellbeingCheckIn';

describe('WellbeingCheckIn Component', () => {
  test('renders title', () => {
    render(<WellbeingCheckIn />);
    const titleElement = screen.getByText(/Wellbeing Check-in/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders emoji cards', () => {
    render(<WellbeingCheckIn />);
    const emojiCards = screen.getAllByRole('button', { name: /Terrible|Bad|Alright|Pretty Good|Fantastic/i });
    expect(emojiCards).toHaveLength(5);
  });

  test('allows selecting an emoji card', () => {
    render(<WellbeingCheckIn />);
    const emojiCard = screen.getByRole('button', { name: /Terrible/i });
    fireEvent.click(emojiCard);
    expect(emojiCard).toHaveClass('border-danger'); // Adjust this based on your actual implementation
  });

  test('displays toast message when Continue is clicked after selecting an emoji', () => {
    render(<WellbeingCheckIn />);
    const emojiCard = screen.getByRole('button', { name: /Terrible/i });
    fireEvent.click(emojiCard);
    const continueButton = screen.getByRole('button', { name: /Continue/i });
    fireEvent.click(continueButton);
    const toast = screen.getByText(/You selected: Terrible/i);
    expect(toast).toBeInTheDocument();
  });

  test('Continue button is disabled when no emoji is selected', () => {
    render(<WellbeingCheckIn />);
    const continueButton = screen.getByRole('button', { name: /Continue/i });
    expect(continueButton).toBeDisabled();
  });

  test('Back button and Close button are rendered', () => {
    render(<WellbeingCheckIn />);
    const backButton = screen.getByLabelText(/Back button/i);
    const closeButton = screen.getByLabelText(/Close button/i);
    expect(backButton).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });
});