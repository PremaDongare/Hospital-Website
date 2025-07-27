// Hospital Application - Main JavaScript File

class HospitalApp {
    constructor() {
        this.currentSection = 'home';
        this.filteredDoctors = [...hospitalData.doctors];
        this.filteredHospitals = [...hospitalData.hospitals];
        this.notifications = [...hospitalData.notifications];
        this.appointments = [...hospitalData.appointments];
        
        this.init();
    }

    init() {
        this.initializeAOS();
        this.setupEventListeners();
        this.populateFilters();
        this.renderDoctors();
        this.renderHospitals();
        this.renderNotifications();
        this.renderAppointments();
    }

    initializeAOS() {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.dataset.section;
                this.navigateToSection(section);
            });
        });

        // Mobile menu
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Search functionality
        const unifiedSearch = document.getElementById('unifiedSearch');
        const searchBtn = document.getElementById('searchBtn');
        
        unifiedSearch.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
        
        searchBtn.addEventListener('click', () => {
            this.performSearch();
        });

        // Doctor filters
        document.getElementById('specializationFilter').addEventListener('change', () => this.filterDoctors());
        document.getElementById('hospitalFilter').addEventListener('change', () => this.filterDoctors());
        document.getElementById('experienceFilter').addEventListener('change', () => this.filterDoctors());
        document.getElementById('ratingFilter').addEventListener('change', () => this.filterDoctors());

        // Hospital filters
        document.getElementById('hospitalTypeFilter').addEventListener('change', () => this.filterHospitals());
        document.getElementById('hospitalLocationFilter').addEventListener('change', () => this.filterHospitals());

        // Notifications
        document.getElementById('notificationBell').addEventListener('click', () => {
            this.toggleNotifications();
        });
        
        document.getElementById('closeNotifications').addEventListener('click', () => {
            this.toggleNotifications();
        });

        // Modal
        document.getElementById('modalOverlay').addEventListener('click', (e) => {
            if (e.target.id === 'modalOverlay') {
                this.closeModal();
            }
        });
        
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        // Login button
        document.getElementById('loginBtn').addEventListener('click', () => {
            this.showLoginModal();
        });
    }

    navigateToSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Update sections
        document.querySelectorAll('.section').forEach(s => {
            s.classList.remove('active');
        });
        document.getElementById(section).classList.add('active');

        this.currentSection = section;
    }

    populateFilters() {
        // Populate specialization filter
        const specializationFilter = document.getElementById('specializationFilter');
        const specializations = [...new Set(hospitalData.doctors.map(d => d.specialization))];
        specializations.forEach(spec => {
            const option = document.createElement('option');
            option.value = spec;
            option.textContent = spec;
            specializationFilter.appendChild(option);
        });

        // Populate hospital filter
        const hospitalFilter = document.getElementById('hospitalFilter');
        const hospitals = [...new Set(hospitalData.doctors.map(d => d.hospital))];
        hospitals.forEach(hospital => {
            const option = document.createElement('option');
            option.value = hospital;
            option.textContent = hospital;
            hospitalFilter.appendChild(option);
        });

        // Populate hospital location filter
        const hospitalLocationFilter = document.getElementById('hospitalLocationFilter');
        const locations = [...new Set(hospitalData.hospitals.map(h => h.location))];
        locations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            hospitalLocationFilter.appendChild(option);
        });
    }

    handleSearch(query) {
        if (query.length < 2) {
            document.getElementById('searchSuggestions').style.display = 'none';
            return;
        }

        const suggestions = this.getSearchSuggestions(query);
        this.displaySearchSuggestions(suggestions);
    }

    getSearchSuggestions(query) {
        const lowerQuery = query.toLowerCase();
        const suggestions = [];

        // Search in doctors
        hospitalData.doctors.forEach(doctor => {
            if (doctor.name.toLowerCase().includes(lowerQuery) ||
                doctor.specialization.toLowerCase().includes(lowerQuery) ||
                doctor.hospital.toLowerCase().includes(lowerQuery) ||
                doctor.city.toLowerCase().includes(lowerQuery)) {
                suggestions.push({
                    type: 'doctor',
                    text: `Dr. ${doctor.name} - ${doctor.specialization}`,
                    data: doctor
                });
            }
        });

        // Search in hospitals
        hospitalData.hospitals.forEach(hospital => {
            if (hospital.name.toLowerCase().includes(lowerQuery) ||
                hospital.location.toLowerCase().includes(lowerQuery)) {
                suggestions.push({
                    type: 'hospital',
                    text: `${hospital.name} - ${hospital.location}`,
                    data: hospital
                });
            }
        });

        // Search in specializations
        hospitalData.specializations.forEach(spec => {
            if (spec.toLowerCase().includes(lowerQuery)) {
                suggestions.push({
                    type: 'specialization',
                    text: `Specialization: ${spec}`,
                    data: spec
                });
            }
        });

        // Search in cities
        hospitalData.cities.forEach(city => {
            if (city.toLowerCase().includes(lowerQuery)) {
                suggestions.push({
                    type: 'city',
                    text: `Location: ${city}`,
                    data: city
                });
            }
        });

        return suggestions.slice(0, 8);
    }

    displaySearchSuggestions(suggestions) {
        const suggestionsContainer = document.getElementById('searchSuggestions');
        
        if (suggestions.length === 0) {
            suggestionsContainer.style.display = 'none';
            return;
        }

        suggestionsContainer.innerHTML = suggestions.map(suggestion => `
            <div class="search-suggestion-item" onclick="app.selectSearchSuggestion('${suggestion.type}', '${suggestion.data.id || suggestion.data}')">
                <i class="fas fa-${this.getSuggestionIcon(suggestion.type)}"></i>
                ${suggestion.text}
            </div>
        `).join('');

        suggestionsContainer.style.display = 'block';
    }

    getSuggestionIcon(type) {
        const icons = {
            doctor: 'user-md',
            hospital: 'hospital',
            specialization: 'stethoscope',
            city: 'map-marker-alt'
        };
        return icons[type] || 'search';
    }

    selectSearchSuggestion(type, data) {
        document.getElementById('unifiedSearch').value = '';
        document.getElementById('searchSuggestions').style.display = 'none';

        if (type === 'doctor') {
            this.navigateToSection('doctors');
            // Filter to show specific doctor
            this.filterDoctorsByDoctor(data);
        } else if (type === 'hospital') {
            this.navigateToSection('hospitals');
            // Filter to show specific hospital
            this.filterHospitalsByHospital(data);
        } else if (type === 'specialization') {
            this.navigateToSection('doctors');
            document.getElementById('specializationFilter').value = data;
            this.filterDoctors();
        } else if (type === 'city') {
            // Show all results for city
            this.performSearch();
        }
    }

    performSearch() {
        const query = document.getElementById('unifiedSearch').value.toLowerCase();
        if (query.length < 2) return;

        // Search across all sections
        this.searchDoctors(query);
        this.searchHospitals(query);
        
        // Show results in current section or switch to appropriate section
        if (this.currentSection === 'home') {
            this.navigateToSection('doctors');
        }
    }

    searchDoctors(query) {
        this.filteredDoctors = hospitalData.doctors.filter(doctor => 
            doctor.name.toLowerCase().includes(query) ||
            doctor.specialization.toLowerCase().includes(query) ||
            doctor.hospital.toLowerCase().includes(query) ||
            doctor.city.toLowerCase().includes(query) ||
            doctor.education.toLowerCase().includes(query)
        );
        this.renderDoctors();
    }

    searchHospitals(query) {
        this.filteredHospitals = hospitalData.hospitals.filter(hospital => 
            hospital.name.toLowerCase().includes(query) ||
            hospital.location.toLowerCase().includes(query) ||
            hospital.departments.some(dept => dept.toLowerCase().includes(query))
        );
        this.renderHospitals();
    }

    filterDoctors() {
        const specialization = document.getElementById('specializationFilter').value;
        const hospital = document.getElementById('hospitalFilter').value;
        const experience = document.getElementById('experienceFilter').value;
        const rating = document.getElementById('ratingFilter').value;

        this.filteredDoctors = hospitalData.doctors.filter(doctor => {
            let matches = true;

            if (specialization && doctor.specialization !== specialization) matches = false;
            if (hospital && doctor.hospital !== hospital) matches = false;
            
            if (experience) {
                const [min, max] = experience.split('-').map(Number);
                if (max && (doctor.experience < min || doctor.experience > max)) matches = false;
                if (!max && doctor.experience < min) matches = false;
            }
            
            if (rating) {
                const [min, max] = rating.split('-').map(Number);
                if (max && (doctor.rating < min || doctor.rating > max)) matches = false;
                if (!max && doctor.rating < min) matches = false;
            }

            return matches;
        });

        this.renderDoctors();
    }

    filterHospitals() {
        const type = document.getElementById('hospitalTypeFilter').value;
        const location = document.getElementById('hospitalLocationFilter').value;

        this.filteredHospitals = hospitalData.hospitals.filter(hospital => {
            let matches = true;

            if (type && hospital.type !== type) matches = false;
            if (location && hospital.location !== location) matches = false;

            return matches;
        });

        this.renderHospitals();
    }

    renderDoctors() {
        const grid = document.getElementById('doctorsGrid');
        
        if (this.filteredDoctors.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-user-md"></i>
                    <h3>No doctors found</h3>
                    <p>Try adjusting your filters or search criteria</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.filteredDoctors.map(doctor => `
            <div class="doctor-card" data-aos="fade-up">
                <div class="doctor-image">
                    <img src="${doctor.photo}" alt="${doctor.name}">
                </div>
                <div class="doctor-info">
                    <div class="doctor-header">
                        <div class="doctor-name">${doctor.name}</div>
                        <div class="doctor-rating">
                            <i class="fas fa-star"></i>
                            <span>${doctor.rating}</span>
                        </div>
                    </div>
                    <div class="doctor-specialization">${doctor.specialization}</div>
                    <div class="doctor-details">
                        <div class="doctor-detail">
                            <i class="fas fa-graduation-cap"></i>
                            <span>${doctor.education}</span>
                        </div>
                        <div class="doctor-detail">
                            <i class="fas fa-hospital"></i>
                            <span>${doctor.hospital}</span>
                        </div>
                        <div class="doctor-detail">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${doctor.city}, ${doctor.state}</span>
                        </div>
                        <div class="doctor-detail">
                            <i class="fas fa-clock"></i>
                            <span>${doctor.experience} years experience</span>
                        </div>
                        <div class="doctor-detail">
                            <i class="fas fa-dollar-sign"></i>
                            <span>$${doctor.consultationFee} consultation fee</span>
                        </div>
                    </div>
                    <div class="doctor-status">
                        <span class="status-badge status-${doctor.status.toLowerCase()}">${doctor.status}</span>
                    </div>
                    <div class="doctor-actions">
                        <button class="btn-secondary check-availability" 
                                onclick="app.showAvailabilityModal(${doctor})">
                            <i class="fas fa-calendar-check"></i>
                            Check Availability
                        </button>
                        <button class="book-appointment" 
                                onclick="app.bookAppointment(${doctor.id})"
                                ${doctor.status === 'Booked' ? 'disabled' : ''}>
                            ${doctor.status === 'Booked' ? 'Fully Booked' : 'Book Appointment'}
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderHospitals() {
        const grid = document.getElementById('hospitalsGrid');
        
        if (this.filteredHospitals.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-hospital"></i>
                    <h3>No hospitals found</h3>
                    <p>Try adjusting your filters or search criteria</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.filteredHospitals.map(hospital => `
            <div class="hospital-card" data-aos="fade-up">
                <div class="hospital-image">
                    <img src="${hospital.photo}" alt="${hospital.name}">
                    <div class="hospital-type type-${hospital.type.toLowerCase()}">${hospital.type}</div>
                </div>
                <div class="hospital-info">
                    <div class="hospital-name">${hospital.name}</div>
                    <div class="hospital-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${hospital.location}</span>
                    </div>
                    <div class="hospital-rating">
                        <i class="fas fa-star"></i>
                        <span>${hospital.rating}</span>
                    </div>
                    <div class="hospital-departments">
                        ${hospital.departments.map(dept => `
                            <span class="department-tag">${dept}</span>
                        `).join('')}
                    </div>
                    <div class="hospital-capacity">
                        <i class="fas fa-bed"></i>
                        <span>Capacity: ${hospital.capacity} beds</span>
                    </div>
                    <button class="view-hospital" onclick="app.viewHospital(${hospital.id})">
                        View Details
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderNotifications() {
        const list = document.getElementById('notificationList');
        const badge = document.getElementById('notificationBadge');
        
        badge.textContent = this.notifications.length;
        
        if (this.notifications.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-bell"></i>
                    <h3>No notifications</h3>
                    <p>You're all caught up!</p>
                </div>
            `;
            return;
        }

        list.innerHTML = this.notifications.map(notification => `
            <div class="notification-item" onclick="app.markNotificationAsRead(${notification.id})">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-message">${notification.message}</div>
                <div class="notification-time">${notification.time}</div>
            </div>
        `).join('');
    }

    renderAppointments() {
        const list = document.getElementById('appointmentsList');
        
        if (this.appointments.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar"></i>
                    <h3>No appointments</h3>
                    <p>You don't have any scheduled appointments</p>
                </div>
            `;
            return;
        }

        list.innerHTML = this.appointments.map(appointment => `
            <div class="appointment-item">
                <div class="appointment-info">
                    <div class="appointment-doctor">${appointment.doctorName}</div>
                    <div class="appointment-details">
                        <div>${appointment.specialization} • ${appointment.hospital}</div>
                        <div>${appointment.date} at ${appointment.time}</div>
                        <div>Status: <span class="status-badge status-${appointment.status.toLowerCase()}">${appointment.status}</span></div>
                    </div>
                </div>
                <div class="appointment-actions">
                    <button class="btn-secondary" onclick="app.rescheduleAppointment(${appointment.id})">
                        Reschedule
                    </button>
                    <button class="btn-secondary btn-danger" onclick="app.cancelAppointment(${appointment.id})">
                        Cancel
                    </button>
                </div>
            </div>
        `).join('');
    }

    toggleNotifications() {
        const panel = document.getElementById('notificationPanel');
        panel.classList.toggle('active');
    }

    markNotificationAsRead(id) {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.renderNotifications();
    }

    bookAppointment(doctorId) {
        const doctor = hospitalData.doctors.find(d => d.id === doctorId);
        if (!doctor) return;

        this.showBookingModal(doctor);
    }

    showBookingModal(doctor) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        modalTitle.textContent = `Book Appointment with ${doctor.name}`;
        modalBody.innerHTML = `
            <div class="booking-summary">
                <h4>Booking Summary</h4>
                <div class="doctor-info">
                    <img src="${doctor.photo}" alt="${doctor.name}" />
                    <div>
                        <h5>${doctor.name}</h5>
                        <p>${doctor.specialization}</p>
                        <p>${doctor.hospital}</p>
                    </div>
                </div>
            </div>
            
            <form id="bookingForm">
                <div class="form-group">
                    <label for="name">Full Name: <span class="required">*</span></label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email: <span class="required">*</span></label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone: <span class="required">*</span></label>
                    <input type="tel" id="phone" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="date">Preferred Date: <span class="required">*</span></label>
                        <input type="date" id="date" required min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    <div class="form-group">
                        <label for="time">Preferred Time: <span class="required">*</span></label>
                        <select id="time" required>
                            <option value="">Select time</option>
                            <option value="09:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="reason">Reason for Visit: <span class="required">*</span></label>
                    <textarea id="reason" required placeholder="Please describe your symptoms or reason for visit..."></textarea>
                </div>
                <div class="form-group">
                    <label for="notes">Additional Notes (Optional):</label>
                    <textarea id="notes" placeholder="Any additional information..."></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-cancel" onclick="app.closeModal()">Cancel</button>
                    <button type="submit" class="btn-confirm">Confirm Booking</button>
                </div>
            </form>
        `;

        // Handle form submission
        document.getElementById('bookingForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitBooking(doctor);
        });

        this.openModal();
    }

    showAvailabilityModal(doctor) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        modalTitle.textContent = `Check Availability - ${doctor.name}`;
        modalBody.innerHTML = `
            <div class="availability-check">
                <h4>Check Doctor Availability</h4>
                <div class="doctor-info">
                    <img src="${doctor.photo}" alt="${doctor.name}" />
                    <div>
                        <h5>${doctor.name}</h5>
                        <p>${doctor.specialization}</p>
                        <p>${doctor.hospital}</p>
                    </div>
                </div>
            </div>
            
            <form id="availabilityForm">
                <div class="form-row">
                    <div class="form-group">
                        <label for="date">Date: <span class="required">*</span></label>
                        <input type="date" id="date" required min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    <div class="form-group">
                        <label for="time">Time: <span class="required">*</span></label>
                        <select id="time" required>
                            <option value="">Select time</option>
                            <option value="09:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                        </select>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-cancel" onclick="app.closeModal()">Cancel</button>
                    <button type="submit" class="btn-confirm">Check Availability</button>
                </div>
            </form>
        `;

        document.getElementById('availabilityForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.checkAvailability(doctor);
        });

        this.openModal();
    }

    showConfirmationModal(title, message, details, confirmText = 'OK') {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        modalTitle.textContent = title;
        modalBody.innerHTML = `
            <div class="confirmation-modal">
                <div class="confirmation-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h4>${title}</h4>
                <p>${message}</p>
                <div class="confirmation-details">
                    ${details ? Object.entries(details).map(([key, value]) => `
                        <div class="detail-row">
                            <span class="detail-label">${key}:</span>
                            <span class="detail-value">${value}</span>
                        </div>
                    `).join('') : ''}
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-confirm" onclick="app.closeModal()">${confirmText}</button>
                </div>
            </div>
        `;

        this.openModal();
    }

    submitBooking(doctor) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const reason = document.getElementById('reason').value;
        const notes = document.getElementById('notes').value;

        // Validate required fields
        if (!name || !email || !phone || !date || !time || !reason) {
            this.showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Create new appointment
        const newAppointment = {
            id: Date.now(),
            doctorId: doctor.id,
            doctorName: doctor.name,
            specialization: doctor.specialization,
            date: date,
            time: time,
            status: 'Confirmed',
            hospital: doctor.hospital,
            notes: notes,
            reason: reason
        };

        this.appointments.push(newAppointment);
        this.renderAppointments();

        // Add notification
        const newNotification = {
            id: this.notifications.length + 1,
            title: 'Appointment Booked',
            message: `Your appointment with ${doctor.name} has been scheduled for ${date} at ${time}.`,
            time: 'Just now',
            type: 'appointment'
        };

        this.notifications.unshift(newNotification);
        this.renderNotifications();

        // Close booking modal and show confirmation
        this.closeModal();
        
        // Show confirmation modal
        this.showConfirmationModal(
            'Booking Confirmed!',
            'Your appointment has been successfully booked.',
            {
                'Doctor': doctor.name,
                'Date': new Date(date).toLocaleDateString(),
                'Time': time,
                'Appointment ID': `APT-${Date.now().toString().slice(-6)}`
            },
            'Great!'
        );
    }

    checkAvailability(doctor) {
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        if (!date || !time) {
            this.showMessage('Please select both date and time.', 'error');
            return;
        }

        // Simulate availability check
        const isAvailable = Math.random() > 0.3; // 70% chance of availability
        
        this.closeModal();
        
        if (isAvailable) {
            this.showConfirmationModal(
                'Slot Available!',
                'The selected time slot is available for booking.',
                {
                    'Date': new Date(date).toLocaleDateString(),
                    'Time': time,
                    'Status': 'Available'
                },
                'Book Now'
            );
        } else {
            this.showConfirmationModal(
                'Slot Unavailable',
                'The selected time slot is not available. Please choose another time.',
                {
                    'Date': new Date(date).toLocaleDateString(),
                    'Time': time,
                    'Status': 'Unavailable'
                },
                'OK'
            );
        }
    }

    viewHospital(hospitalId) {
        const hospital = hospitalData.hospitals.find(h => h.id === hospitalId);
        if (!hospital) return;

        this.showHospitalModal(hospital);
    }

    showHospitalModal(hospital) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        modalTitle.textContent = hospital.name;
        modalBody.innerHTML = `
            <div class="hospital-details">
                <img src="${hospital.photo}" alt="${hospital.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                <div class="hospital-info">
                    <p><strong>Type:</strong> ${hospital.type}</p>
                    <p><strong>Location:</strong> ${hospital.location}</p>
                    <p><strong>Address:</strong> ${hospital.address}</p>
                    <p><strong>Rating:</strong> ${hospital.rating} ⭐</p>
                    <p><strong>Capacity:</strong> ${hospital.capacity} beds</p>
                    <p><strong>Phone:</strong> ${hospital.phone}</p>
                    <p><strong>Website:</strong> <a href="https://${hospital.website}" target="_blank">${hospital.website}</a></p>
                </div>
                <div class="departments-section">
                    <h4>Departments:</h4>
                    <div class="hospital-departments">
                        ${hospital.departments.map(dept => `
                            <span class="department-tag">${dept}</span>
                        `).join('')}
                    </div>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-cancel" onclick="app.closeModal()">Close</button>
                    <button type="button" class="btn-confirm" onclick="app.contactHospital(${hospital.id})">Contact Hospital</button>
                </div>
            </div>
        `;

        this.openModal();
    }

    showLoginModal() {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        modalTitle.textContent = 'Login';
        modalBody.innerHTML = `
            <form id="loginForm">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-cancel" onclick="app.closeModal()">Cancel</button>
                    <button type="submit" class="btn-confirm">Login</button>
                </div>
            </form>
        `;

        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        this.openModal();
    }

    handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Dummy login validation
        if (email && password) {
            this.showMessage('Login successful!', 'success');
            document.getElementById('loginBtn').textContent = 'Welcome!';
            this.closeModal();
        } else {
            this.showMessage('Please enter valid credentials.', 'error');
        }
    }

    rescheduleAppointment(appointmentId) {
        this.showMessage('Reschedule functionality would be implemented here.', 'info');
    }

    cancelAppointment(appointmentId) {
        if (confirm('Are you sure you want to cancel this appointment?')) {
            this.appointments = this.appointments.filter(a => a.id !== appointmentId);
            this.renderAppointments();
            this.showMessage('Appointment cancelled successfully.', 'success');
        }
    }

    contactHospital(hospitalId) {
        this.showMessage('Contact functionality would be implemented here.', 'info');
    }

    openModal() {
        document.getElementById('modalOverlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        document.getElementById('modalOverlay').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    showContactModal() {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        modalTitle.textContent = 'Contact Support';
        modalBody.innerHTML = `
            <form id="contactForm">
                <div class="form-group">
                    <label for="contactName">Name:</label>
                    <input type="text" id="contactName" required>
                </div>
                <div class="form-group">
                    <label for="contactEmail">Email:</label>
                    <input type="email" id="contactEmail" required>
                </div>
                <div class="form-group">
                    <label for="contactSubject">Subject:</label>
                    <select id="contactSubject" required>
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Appointment Issues">Appointment Issues</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Partnership">Partnership</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="contactMessage">Message:</label>
                    <textarea id="contactMessage" required placeholder="Please describe your inquiry..."></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-cancel" onclick="app.closeModal()">Cancel</button>
                    <button type="submit" class="btn-confirm">Send Message</button>
                </div>
            </form>
        `;

        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactSubmit();
        });

        this.openModal();
    }

    handleContactSubmit() {
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;

        if (name && email && subject && message) {
            this.showMessage('Thank you for your message! We will get back to you soon.', 'success');
            this.closeModal();
        } else {
            this.showMessage('Please fill in all required fields.', 'error');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new HospitalApp();
}); 