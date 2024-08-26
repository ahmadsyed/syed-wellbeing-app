import React, { useState } from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import { Feeling } from '../types';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ToastNotification from '../components/ToastNotification';

// Array of feelings with their corresponding label, emoji, and color
const feelings: Feeling[] = [
  { label: "Terrible", emoji: "😢", color: "danger" },
  { label: "Bad", emoji: "😟", color: "warning" },
  { label: "Alright", emoji: "😐", color: "secondary" },
  { label: "Pretty Good", emoji: "😊", color: "info" },
  { label: "Fantastic", emoji: "😄", color: "success" }
];

// Mapping colors for toast notifications
const toastColors: { [key: string]: string } = {
  Terrible: "#f8d7da", 
  Bad: "#fff3cd", 
  Alright: "#e2e3e5", 
  "Pretty Good": "#d1ecf1",
  Fantastic: "#d4edda" 
};
interface Props {
  onExit: () => void;
}

const WellbeingCheckIn: React.FC<Props> = ({onExit}) => {
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  /**
   * Handle the Continue button click
   * If a feeling is selected, show the toast notification
   */
  const handleContinue = () => {
    if (selectedFeeling) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1000);
    }
  };

  const toastBackgroundColor = selectedFeeling ? toastColors[selectedFeeling] : '#ffffff';

  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <Container className="text-center p-5 bg-light rounded shadow-lg position-relative">
          {/* Back Arrow Icon */}
          <i
            className="bi bi-arrow-left position-absolute top-0 start-0 m-3"
            style={{ fontSize: '1.5rem', cursor: 'pointer' }}
            onClick={() => onExit()}
            aria-label="Back button"  
          ></i>
          {/* Close Icon */}
          <i
            className="bi bi-x-lg position-absolute top-0 end-0 m-3"
            style={{ fontSize: '1.5rem', cursor: 'pointer' }}
            onClick={() => onExit()}
            aria-label="Close button"  
          ></i>

          <h2>Wellbeing Check-in</h2>
          <p>Hello! How are you feeling today?</p>

          <Row className="justify-content-center">
            {feelings.map((feeling, index) => (
              <Col key={index} xs={6} sm={4} md={2} className="mb-3 d-flex justify-content-center">
                <Card
                  role="button"
                  className={`text-center feeling-card ${selectedFeeling === feeling.label ? `border-${feeling.color}` : ""}`}
                  onClick={() => setSelectedFeeling(feeling.label)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Body className="p-2 d-flex flex-column align-items-center">
                    <h1 className="m-0">{feeling.emoji}</h1>
                    <p className="m-0">{feeling.label}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Button
            variant={selectedFeeling ? "primary" : "secondary"}
            disabled={!selectedFeeling}
            onClick={handleContinue}
            className="mt-3 w-50"
          >
            Continue
          </Button>
        </Container>
      </div>

      <ToastNotification
        show={showToast}
        onClose={() => setShowToast(false)}
        message={`You selected: ${selectedFeeling}`}
        backgroundColor={toastBackgroundColor}
      />
    </>
  );
}

export default WellbeingCheckIn;