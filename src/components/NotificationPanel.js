import React from 'react';

const NotificationPanel = ({ notifications, show, onClose, onMarkAsRead }) => {
  if (!show) return null;

  return (
    <div className="notification-panel active">
      <div className="notification-header">
        <h3>Notifications</h3>
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="notification-list">
        {notifications.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-bell"></i>
            <h3>No notifications</h3>
            <p>You're all caught up!</p>
          </div>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              className="notification-item"
              onClick={() => onMarkAsRead(notification.id)}
            >
              <div className="notification-title">{notification.title}</div>
              <div className="notification-message">{notification.message}</div>
              <div className="notification-time">{notification.time}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel; 