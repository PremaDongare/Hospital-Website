import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import components
import Header from './components/Header';
import Home from './components/Home';
import Doctors from './components/Doctors';
import Hospitals from './components/Hospitals';
import Appointments from './components/Appointments';
import NotificationPanel from './components/NotificationPanel';
import Modal from './components/Modal';
import Footer from './components/Footer';

// Import data
import { doctorsData, hospitalsData, notificationsData, appointmentsData } from './data/data';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [notifications, setNotifications] = useState(notificationsData);
  const [appointments, setAppointments] = useState(appointmentsData);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData);
  const [filteredHospitals, setFilteredHospitals] = useState(hospitalsData);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.length < 2) {
      setFilteredDoctors(doctorsData);
      setFilteredHospitals(hospitalsData);
      return;
    }

    const lowerQuery = query.toLowerCase();
    
    // Filter doctors
    const filteredDocs = doctorsData.filter(doctor => 
      doctor.name.toLowerCase().includes(lowerQuery) ||
      doctor.specialization.toLowerCase().includes(lowerQuery) ||
      doctor.hospital.toLowerCase().includes(lowerQuery) ||
      doctor.city.toLowerCase().includes(lowerQuery)
    );
    
    // Filter hospitals
    const filteredHosps = hospitalsData.filter(hospital => 
      hospital.name.toLowerCase().includes(lowerQuery) ||
      hospital.location.toLowerCase().includes(lowerQuery) ||
      hospital.departments.some(dept => dept.toLowerCase().includes(lowerQuery))
    );

    setFilteredDoctors(filteredDocs);
    setFilteredHospitals(filteredHosps);
  };

  const handleBookAppointment = (doctor) => {
    setModalContent({
      type: 'booking',
      title: `Book Appointment with ${doctor.name}`,
      data: doctor
    });
    setShowModal(true);
  };

  const handleCheckAvailability = (doctor) => {
    setModalContent({
      type: 'availability',
      title: `Check Availability - ${doctor.name}`,
      data: doctor
    });
    setShowModal(true);
  };

  const handleViewHospital = (hospital) => {
    setModalContent({
      type: 'hospital',
      title: hospital.name,
      data: hospital
    });
    setShowModal(true);
  };

  const handleLogin = () => {
    setModalContent({
      type: 'login',
      title: 'Login',
      data: {}
    });
    setShowModal(true);
  };

  const submitBooking = async (bookingData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAppointment = {
        id: Date.now(),
        doctorId: bookingData.doctor.id,
        doctorName: bookingData.doctor.name,
        specialization: bookingData.doctor.specialization,
        date: bookingData.date,
        time: bookingData.time,
        status: 'Confirmed',
        hospital: bookingData.doctor.hospital,
        notes: bookingData.notes || '',
        reason: bookingData.reason || ''
      };

      setAppointments([...appointments, newAppointment]);

      // Add notification
      const newNotification = {
        id: notifications.length + 1,
        title: 'Appointment Booked',
        message: `Your appointment with ${bookingData.doctor.name} has been scheduled for ${bookingData.date} at ${bookingData.time}.`,
        time: 'Just now',
        type: 'appointment'
      };

      setNotifications([newNotification, ...notifications]);
      setShowModal(false);
      
      // Show confirmation modal
      setModalContent({
        type: 'confirmation',
        title: 'Booking Confirmed!',
        message: 'Your appointment has been successfully booked.',
        details: {
          'Doctor': bookingData.doctor.name,
          'Date': new Date(bookingData.date).toLocaleDateString(),
          'Time': bookingData.time,
          'Appointment ID': `APT-${Date.now().toString().slice(-6)}`
        },
        confirmText: 'Great!'
      });
      setShowModal(true);
    } catch (error) {
      showMessage('Failed to book appointment. Please try again.', 'error');
    }
  };

  const checkAvailability = async (availabilityData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate availability check
      const isAvailable = Math.random() > 0.3; // 70% chance of availability
      
      setShowModal(false);
      
      if (isAvailable) {
        setModalContent({
          type: 'confirmation',
          title: 'Slot Available!',
          message: 'The selected time slot is available for booking.',
          details: {
            'Date': new Date(availabilityData.date).toLocaleDateString(),
            'Time': availabilityData.time,
            'Status': 'Available'
          },
          confirmText: 'Book Now'
        });
      } else {
        setModalContent({
          type: 'confirmation',
          title: 'Slot Unavailable',
          message: 'The selected time slot is not available. Please choose another time.',
          details: {
            'Date': new Date(availabilityData.date).toLocaleDateString(),
            'Time': availabilityData.time,
            'Status': 'Unavailable'
          },
          confirmText: 'OK'
        });
      }
      setShowModal(true);
    } catch (error) {
      showMessage('Failed to check availability. Please try again.', 'error');
    }
  };

  const showMessage = (message, type) => {
    // This would typically use a toast notification library
    alert(`${type.toUpperCase()}: ${message}`);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const cancelAppointment = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(appointments.filter(a => a.id !== id));
      showMessage('Appointment cancelled successfully.', 'success');
    }
  };

  return (
    <Router>
      <div className="App">
        <Header 
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          notifications={notifications}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          onLogin={handleLogin}
        />
        
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  searchQuery={searchQuery}
                  onSearch={handleSearch}
                  onSectionChange={setCurrentSection}
                />
              } 
            />
            <Route 
              path="/doctors" 
              element={
                <Doctors 
                  doctors={filteredDoctors}
                  onBookAppointment={handleBookAppointment}
                  onCheckAvailability={handleCheckAvailability}
                  onSearch={handleSearch}
                />
              } 
            />
            <Route 
              path="/hospitals" 
              element={
                <Hospitals 
                  hospitals={filteredHospitals}
                  onViewHospital={handleViewHospital}
                />
              } 
            />
            <Route 
              path="/appointments" 
              element={
                <Appointments 
                  appointments={appointments}
                  onCancelAppointment={cancelAppointment}
                />
              } 
            />
          </Routes>
        </main>

        <NotificationPanel 
          notifications={notifications}
          show={showNotifications}
          onClose={() => setShowNotifications(false)}
          onMarkAsRead={markNotificationAsRead}
        />

        <Modal 
          show={showModal}
          content={modalContent}
          onClose={() => setShowModal(false)}
          onSubmit={modalContent.type === 'availability' ? checkAvailability : submitBooking}
        />

        <Footer />
      </div>
    </Router>
  );
}

export default App; 