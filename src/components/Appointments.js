import React from 'react';

const Appointments = ({ appointments, onCancelAppointment }) => {
  return (
    <section className="section">
      <div className="section-header">
        <h2>My Appointments</h2>
        <p>Manage your healthcare appointments</p>
      </div>

      <div className="appointments-container">
        {appointments.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-calendar"></i>
            <h3>No appointments</h3>
            <p>You don't have any scheduled appointments</p>
          </div>
        ) : (
          <div className="appointments-list">
            {appointments.map(appointment => (
              <div key={appointment.id} className="appointment-item">
                <div className="appointment-info">
                  <div className="appointment-doctor">{appointment.doctorName}</div>
                  <div className="appointment-details">
                    <div>{appointment.specialization} • {appointment.hospital}</div>
                    <div>{appointment.date} at {appointment.time}</div>
                    <div>
                      Status: <span className={`status-badge status-${appointment.status.toLowerCase()}`}>
                        {appointment.status}
                      </span>
                    </div>
                    {appointment.notes && (
                      <div>Notes: {appointment.notes}</div>
                    )}
                  </div>
                </div>
                <div className="appointment-actions">
                  <button 
                    className="btn-secondary"
                    onClick={() => alert('Reschedule functionality would be implemented here.')}
                  >
                    Reschedule
                  </button>
                  <button 
                    className="btn-secondary btn-danger"
                    onClick={() => onCancelAppointment(appointment.id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Appointments; 