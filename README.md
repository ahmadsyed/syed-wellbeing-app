# Wellbeing App

Welcome to the Syed Wellbeing App repository! This project is built with React using Create React App and includes two main widgets: Appointment Scheduler and Wellbeing Check-in. Both widgets come with their respective test cases to ensure functionality and reliability.

## Widgets

### Appointment Scheduler

The Appointment Scheduler widget allows users to select available time slots for scheduling appointments. It includes:

- **Component**: `AppointmentScheduler.tsx`
- **Test Case**: `AppointmentScheduler.test.tsx`

**Features**:
- Displays a list of available time slots.
- Highlights the selected time slot.
- Shows a toast notification with the selected time slot.
- Detailed test cases and code commenting. 

### Wellbeing Check-in

The Wellbeing Check-in widget enables users to check in and track their wellbeing. It includes:

- **Component**: `WellbeingCheckIn.tsx`
- **Test Case**: `WellbeingCheckIn.test.tsx`

**Features**:
- Provides a widget to select their mood.
- Show selected emoji.
- Should be responsiveness
- Displays confirmation messages.
- Detailed test cases and code commenting. 

## Getting Started

To get started with this project, follow these steps:

1. **Clone the Repository**

   ```git clone https://github.com/ahmadsyed/syed-wellbeing-app.git```

2. **Navigate to the Project Directory**
    ```cd syed-wellbeing-app```
3.	**Install Dependencies**    
Make sure you have Node.js installed. Then, run:
    ```npm install```
4. **npm start**
This will start the development server and open the application in your default browser.
5.	**Run Tests**
    ```npm test```

## Example Test
```test('AppointmentScheduler Component selects a time slot and shows a toast', () => {
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
