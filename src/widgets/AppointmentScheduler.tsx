import React, { useState, useEffect, useRef } from 'react';
import data from '../DATA/data'; // Adjust the path as needed
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card, Toast } from 'react-bootstrap';

interface TimeSlot {
    displayDate: string;
    displayTime: string;
    displayTimeEnd: string;
    startTimeUtc: number;
    endTimeUtc: number;
}

const AppointmentScheduler: React.FC = () => {
    // State to store unique dates and selected date
    const [dates, setDates] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [showToast, setShowToast] = useState(false);

    // Reference for the scrollable container
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Extract unique dates from the data
    useEffect(() => {
        const uniqueDates = Array.from(new Set(data.map(item => item.displayDate)));
        setDates(uniqueDates);
        if (uniqueDates.length > 0) {
            setSelectedDate(uniqueDates[0]);
        }
    }, []);

    // Filter time slots based on the selected date
    useEffect(() => {
        if (selectedDate) {
            const filteredSlots = data.filter(item => item.displayDate === selectedDate);
            setTimeSlots(filteredSlots);
            setSelectedSlot(null);
        }
    }, [selectedDate]);

    // Scroll the container to the left
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            console.log('Scrolling left');
            scrollContainerRef.current.scrollLeft -= 100;
        }
    };

    // Scroll the container to the right
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            console.log('Scrolling right');
            scrollContainerRef.current.scrollLeft += 100;
        }
    };
    //Will select a slot from the list and show toast
    const handleSlotClick = (slot: TimeSlot) => {
        setSelectedSlot(slot);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    return (
        <Container className="my-4">
            <Card className="shadow-sm p-3 mb-5 bg-white rounded" style={{ width: '60%', margin: 'auto' }}>
                <Card.Body>
                    <Row className="align-items-center mb-3">
                        <Col xs="auto">
                            <Col xs="auto">
                                <Button variant="primary" onClick={scrollLeft} style={{ backgroundColor: '#b6b6b6', borderRadius: '50%', padding: '0.5rem' }}>
                                    <i className="bi bi-arrow-left" style={{ color: 'black' }}></i>
                                </Button>
                            </Col>
                        </Col>
                        <Col xs className="overflow-auto" style={{ maxWidth: '100%', whiteSpace: 'nowrap' }} data-testid="scroll-bar">
                            <div ref={scrollContainerRef} className="d-inline-flex" style={{ overflowX: 'auto', scrollBehavior: 'smooth', width: '100%' }}>
                                {dates.map(date => {
                                    const dateObject = new Date(date);
                                    const dayName = dateObject.toLocaleDateString('en-US', { weekday: 'short' });
                                    return (
                                        <div
                                            key={date}
                                            className={`d-inline-flex flex-column align-items-center p-3 mx-1 border rounded cursor-pointer ${selectedDate === date ? 'bg-primary text-white' : ''}`}
                                            onClick={() => setSelectedDate(date)}
                                            style={{ minWidth: '75px' }}
                                        >
                                            <div>{date.split('/')[2]}</div>
                                            <div>{dayName}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Col>
                        <Col xs="auto">
                            <Button variant="primary" onClick={scrollRight} style={{ backgroundColor: '#b6b6b6', borderRadius: '50%', padding: '0.5rem' }}>
                                <i className="bi bi-arrow-right"></i>
                            </Button>
                        </Col>
                    </Row>

                    <div className="mt-4">
                        <h4>Available Time Slots</h4>
                        <p style={{color:'#b9b9b9'}}>Each session lasts for 30 minutes</p>

                        {selectedDate && (
                            <div className="d-flex flex-wrap" data-testid="time-slot-container">
                                {timeSlots.length > 0 ? (
                                    timeSlots.map(slot => (
                                        <Card
                                            key={slot.startTimeUtc}
                                            className={`m-2 ${selectedSlot === slot ? 'border-primary' : 'border'}`}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleSlotClick(slot)}
                                            data-testid={`time-slot-${slot.displayTime}`}
                                        >
                                            <Card.Body>
                                                {slot.displayTime}
                                            </Card.Body>
                                        </Card>
                                    ))
                                ) : (
                                    <Card className="m-2">
                                        <Card.Body>No available time slots.</Card.Body>
                                    </Card>
                                )}
                            </div>
                        )}
                    </div>
                </Card.Body>
            </Card>

            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                bg="info"
                className="position-fixed bottom-0 end-0 m-3"
            >
                <Toast.Body data-testid="toast-message">
                    You selected: {selectedSlot?.displayTime}
                </Toast.Body>
            </Toast>
        </Container>
    );
};

export default AppointmentScheduler;