import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

interface ToastNotificationProps {
  show: boolean;
  onClose: () => void;
  message: string;
  backgroundColor: string;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ show, onClose, message, backgroundColor }) => {
  return (
    <ToastContainer
      //position="top-center"
      className="p-3 custom-toast-container"
      style={{ zIndex: 1050 }}
    >
      <Toast
        onClose={onClose}
        show={show}
        delay={3000}
        autohide
        style={{ backgroundColor, color: '#000' }}
      >
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastNotification;