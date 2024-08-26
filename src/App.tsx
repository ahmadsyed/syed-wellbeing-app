import React, { useState } from 'react';
import WellbeingCheckIn from './widgets/WellbeingCheckIn';
import AppointmentScheduler from './widgets/AppointmentScheduler';

const App: React.FC = () => {
  // State to manage which widget to show
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);

  // Function to handle link clicks
  const handleLinkClick = (widget: string) => {
    setSelectedWidget(widget);
  };

  return (
    <div>
      {/* Links to select the widget */}
      <div className="link-container">
        <a href="#" className="link" onClick={() => handleLinkClick('wellbeing')}>Show Wellbeing Widget</a>
        <a href="#" className="link" onClick={() => handleLinkClick('appointment')}>Show Appointment Scheduler</a>
      </div>

      {/* Conditionally render widgets based on selected state */}
      {selectedWidget === 'wellbeing' && <WellbeingCheckIn onExit={ () => setSelectedWidget(null)} />}
      {selectedWidget === 'appointment' && <AppointmentScheduler />}
    </div>
  );
}

export default App;