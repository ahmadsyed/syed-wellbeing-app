import React, { useState, useEffect, useRef } from 'react';
import data from '../DATA/data'; // Adjust the path as needed
import { CSSProperties } from 'react';

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

    // Reference for the scrollable container
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Extract unique dates from the data
    useEffect(() => {
        const uniqueDates = Array.from(new Set(data.map(item => item.displayDate)));
        setDates(uniqueDates);
    }, []);

    // Filter time slots based on the selected date
    useEffect(() => {
        const filteredSlots = data.filter(item => item.displayDate === selectedDate);
        setTimeSlots(filteredSlots);
    }, [selectedDate]);

    // Scroll the container to the left
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
        }
    };

    // Scroll the container to the right
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
        }
    };

    return (
        <div style={styles.card}>
            {/* Date selector with horizontal scroll */}
            <div style={styles.dateSelector}>
                <button onClick={scrollLeft} style={styles.scrollButton}>◀</button>
                <div ref={scrollContainerRef} style={styles.scrollContainer}>
                    {dates.map(date => (
                        <div
                            key={date}
                            style={styles.dateCard}
                            onClick={() => setSelectedDate(date)}
                        >
                            {date}
                        </div>
                    ))}
                </div>
                <button onClick={scrollRight} style={styles.scrollButton}>▶</button>
            </div>

            {/* Display time slots for the selected date */}
            {selectedDate && (
                <div style={styles.timeSlotContainer}>
                    <h3>Available Time Slots for {selectedDate}</h3>
                    {timeSlots.length > 0 ? (
                        <ul style={styles.timeSlotList}>
                            {timeSlots.map(slot => (
                                <li key={slot.startTimeUtc} style={styles.timeSlotItem}>
                                    {slot.displayTime} - {slot.displayTimeEnd}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No available time slots.</p>
                    )}
                </div>
            )}
        </div>
    );
};

// Styles for the component with correct typing
const styles: { [key: string]: CSSProperties } = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        width: '100%',
        maxWidth: '600px',
        margin: 'auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    dateSelector: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px',
    },
    scrollButton: {
        background: '#007bff',
        border: 'none',
        color: 'white',
        padding: '8px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        margin: '0 8px',
    },
    scrollContainer: {
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        flexGrow: 1,
        display: 'flex',
    },
    dateCard: {
        display: 'inline-block',
        padding: '8px 16px',
        margin: '0 4px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    timeSlotContainer: {
        marginTop: '16px',
    },
    timeSlotList: {
        listStyle: 'none',
        padding: '0',
        margin: '0',
    },
    timeSlotItem: {
        padding: '8px 0',
        borderBottom: '1px solid #eee',
    },
};

export default AppointmentScheduler;