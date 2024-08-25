import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppointmentScheduler from '../widgets/AppointmentScheduler';

// Mock the JSON data module
jest.mock('../DATA/data', () => {
  const mockData = [
    { displayDate: '2024-08-26', displayTime: '09:00 AM', displayTimeEnd: '10:00 AM', startTimeUtc: 1693040400000, endTimeUtc: 1693044000000 },
    { displayDate: '2024-08-26', displayTime: '10:00 AM', displayTimeEnd: '11:00 AM', startTimeUtc: 1693044000000, endTimeUtc: 1693047600000 },
    { displayDate: '2024-08-27', displayTime: '09:00 AM', displayTimeEnd: '10:00 AM', startTimeUtc: 1693126800000, endTimeUtc: 1693130400000 },
  ];
  
  return {
    __esModule: true,
    default: mockData,
  };
});

describe('AppointmentScheduler Component', () => {
  test('renders date selector with dates', () => {
    render(<AppointmentScheduler />);
    const dateCards = screen.getAllByText(/2024-08-26|2024-08-27/i);
    expect(dateCards).toHaveLength(2);
  });

  test('filters time slots based on selected date', () => {
    render(<AppointmentScheduler />);
    const dateCard = screen.getByText(/2024-08-26/i);
    fireEvent.click(dateCard);
    const timeSlots = screen.getAllByText(/09:00 AM|10:00 AM/i);
    expect(timeSlots).toHaveLength(2); // Expecting two time slots for the selected date
  });

  test('scrolls to the left and right', () => {
    render(<AppointmentScheduler />);
    const scrollLeftButton = screen.getByText(/◀/i);
    const scrollRightButton = screen.getByText(/▶/i);

    // Mock scroll behavior
    Object.defineProperty(HTMLDivElement.prototype, 'scrollBy', {
      value: jest.fn(),
    });

    fireEvent.click(scrollLeftButton);
    fireEvent.click(scrollRightButton);

    expect(HTMLDivElement.prototype.scrollBy).toHaveBeenCalledTimes(2);
  });
});