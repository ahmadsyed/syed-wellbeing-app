import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App'; // Adjust the import path as needed
import WellbeingCheckIn from '../widgets/WellbeingCheckIn'; // Adjust the import path as needed
import AppointmentScheduler from '../widgets/AppointmentScheduler'; // Adjust the import path as needed

// Mocking the WellbeingCheckIn and AppointmentScheduler components
jest.mock('../widgets/WellbeingCheckIn', () => () => <div>Wellbeing Check-in Widget</div>);
jest.mock('../widgets/AppointmentScheduler', () => () => <div>Appointment Scheduler Widget</div>);

describe('App Component', () => {
  
  test('renders the Show Wellbeing Widget and Show Appointment Scheduler links', () => {
    render(<App />);
    
    // Check if the links are in the document
    const wellbeingLink = screen.getByText(/Show Wellbeing Widget/i);
    const appointmentLink = screen.getByText(/Show Appointment Scheduler/i);
    
    expect(wellbeingLink).toBeInTheDocument();
    expect(appointmentLink).toBeInTheDocument();
  });

  test('displays Wellbeing Check-in Widget when the respective link is clicked', () => {
    render(<App />);
    
    // Click the "Show Wellbeing Widget" link
    const wellbeingLink = screen.getByText(/Show Wellbeing Widget/i);
    fireEvent.click(wellbeingLink);
    
    // Check if the WellbeingCheckIn widget is displayed
    const wellbeingWidget = screen.getByText(/Wellbeing Check-in Widget/i);
    expect(wellbeingWidget).toBeInTheDocument();
  });

  test('displays Appointment Scheduler Widget when the respective link is clicked', () => {
    render(<App />);
    
    // Click the "Show Appointment Scheduler" link
    const appointmentLink = screen.getByText(/Show Appointment Scheduler/i);
    fireEvent.click(appointmentLink);
    
    // Check if the AppointmentScheduler widget is displayed
    const appointmentWidget = screen.getByText(/Appointment Scheduler Widget/i);
    expect(appointmentWidget).toBeInTheDocument();
  });

  test('does not display any widget initially', () => {
    render(<App />);
    
    // Ensure neither widget is displayed initially
    const wellbeingWidget = screen.queryByText(/Wellbeing Check-in Widget/i);
    const appointmentWidget = screen.queryByText(/Appointment Scheduler Widget/i);
    
    expect(wellbeingWidget).not.toBeInTheDocument();
    expect(appointmentWidget).not.toBeInTheDocument();
  });

  test('switches from Wellbeing Check-in Widget to Appointment Scheduler Widget when respective links are clicked', () => {
    render(<App />);
    
    // Click the "Show Wellbeing Widget" link
    const wellbeingLink = screen.getByText(/Show Wellbeing Widget/i);
    fireEvent.click(wellbeingLink);
    
    // Ensure the WellbeingCheckIn widget is displayed
    const wellbeingWidget = screen.getByText(/Wellbeing Check-in Widget/i);
    expect(wellbeingWidget).toBeInTheDocument();
    
    // Click the "Show Appointment Scheduler" link
    const appointmentLink = screen.getByText(/Show Appointment Scheduler/i);
    fireEvent.click(appointmentLink);
    
    // Ensure the AppointmentScheduler widget is displayed
    const appointmentWidget = screen.getByText(/Appointment Scheduler Widget/i);
    expect(appointmentWidget).toBeInTheDocument();
    
    // Ensure the WellbeingCheckIn widget is no longer displayed
    expect(wellbeingWidget).not.toBeInTheDocument();
  });

});