import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppointmentScheduler from '../widgets/AppointmentScheduler';

// Mock the JSON data module
jest.mock('../DATA/data', () => {
  const mockData = [
    { displayDate: '2024/08/26', displayTime: '09:00 AM', displayTimeEnd: '10:00 AM', startTimeUtc: 1693040400000, endTimeUtc: 1693044000000 },
    { displayDate: '2024/08/26', displayTime: '10:00 AM', displayTimeEnd: '11:00 AM', startTimeUtc: 1693044000000, endTimeUtc: 1693047600000 },
    { displayDate: '2024/08/27', displayTime: '09:00 AM', displayTimeEnd: '10:00 AM', startTimeUtc: 1693126800000, endTimeUtc: 1693130400000 },
  ];

  return {
    __esModule: true,
    default: mockData,
  };
});

describe('AppointmentScheduler Component', () => {
  test('renders date selector with dates and days', () => {
    render(<AppointmentScheduler />);
    // Check that date and day elements are rendered
    const dateCards = screen.getAllByText(/26|27/i);
    const dayNames = screen.getAllByText(/Mon|Tue/i);
    expect(dateCards).toHaveLength(2);
    expect(dayNames).toHaveLength(2);
  });

  test('filters time slots based on selected date and shows default slot', () => {
    render(<AppointmentScheduler />);
    // Click on the date to select it
    const dateCard = screen.getByText(/26/i);
    fireEvent.click(dateCard);
    // Check that time slots for the selected date are rendered
    const timeSlots = screen.getAllByText(/09:00 AM|10:00 AM/i);
    expect(timeSlots).toHaveLength(2);
    expect(screen.getByText(/Available Time Slots/i)).toBeInTheDocument();
    expect(screen.getByText(/Each session lasts for 30 minutes/i)).toBeInTheDocument();
  });

  test('AppointmentScheduler Component selects a time slot and shows a toast', () => {
    render(<AppointmentScheduler />);
  
    // Click on the 09:00 AM time slot
    const timeSlot09AM = screen.getByTestId('time-slot-09:00 AM');
    fireEvent.click(timeSlot09AM);
  
    // Check if the selected slot is highlighted
    expect(timeSlot09AM).toHaveClass('border-primary');
  
    // Check if the toast message appears
    const toastMessage = screen.getByTestId('toast-message');
    expect(toastMessage).toHaveTextContent('You selected: 09:00 AM');
  });
});