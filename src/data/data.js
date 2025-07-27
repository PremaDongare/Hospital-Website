// Mock Data for Hospital Application

// Doctors Data
export const doctorsData = [
    {
        id: 1,
        name: "Dr. Sarah Joshi",
        specialization: "Cardiology",
        education: "MD - Harvard Medical School",
        hospital: "City General Hospital",
        city: "New York",
        state: "NY",
        address: "123 Medical Center Dr, New York, NY 10001",
        rating: 4.8,
        experience: 12,
        photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        status: "Available",
        languages: ["English", "Spanish"],
        consultationFee: 150
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        specialization: "Dermatology",
        education: "MD - Stanford University",
        hospital: "Metro Health Clinic",
        city: "Los Angeles",
        state: "CA",
        address: "456 Health Plaza, Los Angeles, CA 90210",
        rating: 4.6,
        experience: 8,
        photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        status: "Available",
        languages: ["English", "Mandarin"],
        consultationFee: 120
    },
    {
        id: 3,
        name: "Dr. Prema Dongare",
        specialization: "Pediatrics",
        education: "MD - Johns Hopkins University",
        hospital: "Children's Medical Center",
        city: "Chicago",
        state: "IL",
        address: "789 Pediatric Ave, Chicago, IL 60601",
        rating: 4.9,
        experience: 15,
        photo: "https://static.vecteezy.com/system/resources/previews/015/264/875/large_2x/medical-concept-of-beautiful-female-doctor-with-stethoscope-waist-up-medical-student-woman-hospital-worker-looking-at-camera-and-smiling-photo.jpg",
        status: "Booked",
        languages: ["English", "Spanish"],
        consultationFee: 100
    },
    {
        id: 4,
        name: "Dr. Deepak Kumar",
        specialization: "Orthopedics",
        education: "MD - Mayo Clinic",
        hospital: "Sports Medicine Institute",
        city: "Miami",
        state: "FL",
        address: "321 Athletic Blvd, Miami, FL 33101",
        rating: 4.7,
        experience: 18,
        photo: "https://residentsmedical.com/wp-content/uploads/2022/12/picture-of-indian-doctor-behind-indian-and-american-flag-standing-proud.jpg",
        status: "Available",
        languages: ["English"],
        consultationFee: 180
    },
    {
        id: 5,
        name: "Dr. Lisa Thompson",
        specialization: "Neurology",
        education: "MD - Yale University",
        hospital: "Neurological Institute",
        city: "Boston",
        state: "MA",
        address: "654 Brain Research Dr, Boston, MA 02101",
        rating: 4.5,
        experience: 20,
        photo: "https://img.freepik.com/premium-photo/indian-female-doctor-portrait-indian-female-doctor_890100-1237.jpg?w=2000",
        status: "Available",
        languages: ["English", "French"],
        consultationFee: 200
    },
    {
        id: 6,
        name: "Dr. Robert Kim",
        specialization: "Oncology",
        education: "MD - MD Anderson Cancer Center",
        hospital: "Cancer Treatment Center",
        city: "Houston",
        state: "TX",
        address: "987 Cancer Research Way, Houston, TX 77001",
        rating: 4.9,
        experience: 22,
        photo: "https://tse1.mm.bing.net/th/id/OIP.3pxLhVy6XEfdlFZvdesdSwHaE7?pid=Api&P=0&h=180",
        status: "Booked",
        languages: ["English", "Korean"],
        consultationFee: 250
    },
    {
        id: 7,
        name: "Dr. Amanda Foster",
        specialization: "Psychiatry",
        education: "MD - Columbia University",
        hospital: "Mental Health Clinic",
        city: "Seattle",
        state: "WA",
        address: "147 Wellness St, Seattle, WA 98101",
        rating: 4.4,
        experience: 10,
        photo: "https://as2.ftcdn.net/v2/jpg/04/55/00/43/1000_F_455004354_njrur2pil2eEx6NIDABiXMTjZmbKXRyg.jpg",
        status: "Available",
        languages: ["English"],
        consultationFee: 130
    },
    {
        id: 8,
        name: "Dr. David Martinez",
        specialization: "Endocrinology",
        education: "MD - UCLA",
        hospital: "Diabetes Care Center",
        city: "San Francisco",
        state: "CA",
        address: "258 Endocrine Ave, San Francisco, CA 94101",
        rating: 4.6,
        experience: 14,
        photo: "https://img.freepik.com/free-photo/portrait-young-handsome-indian-man-doctor-white_251136-79251.jpg?size=626&ext=jpg",
        status: "Available",
        languages: ["English", "Spanish"],
        consultationFee: 140
    },
    {
        id: 9,
        name: "Dr. Jennifer Lee",
        specialization: "Gynecology",
        education: "MD - Northwestern University",
        hospital: "Women's Health Center",
        city: "Denver",
        state: "CO",
        address: "369 Women's Health Dr, Denver, CO 80201",
        rating: 4.8,
        experience: 16,
        photo: "https://img.freepik.com/premium-photo/indian-female-doctor-portrait-south-indian-young-lady-doctor-holding-stethoscope-hand_527904-1841.jpg?w=996",
        status: "Booked",
        languages: ["English", "Mandarin"],
        consultationFee: 160
    },
    {
        id: 10,
        name: "Dr. Thomas Brown",
        specialization: "Urology",
        education: "MD - University of Michigan",
        hospital: "Urological Institute",
        city: "Phoenix",
        state: "AZ",
        address: "741 Urology Way, Phoenix, AZ 85001",
        rating: 4.3,
        experience: 11,
        photo: "https://st4.depositphotos.com/1017986/21088/i/600/depositphotos_210888716-stock-photo-happy-doctor-with-clipboard-at.jpg",
        status: "Available",
        languages: ["English"],
        consultationFee: 170
    }
];

// Hospitals Data
export const hospitalsData = [
    {
        id: 1,
        name: "City General Hospital",
        type: "Government",
        location: "New York, NY",
        address: "123 Medical Center Dr, New York, NY 10001",
        rating: 4.5,
        photo: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        departments: ["Cardiology", "Emergency", "Surgery", "Pediatrics", "Neurology"],
        capacity: 500,
        phone: "(555) 123-4567",
        website: "www.citygeneral.com"
    },
    {
        id: 2,
        name: "Metro Health Clinic",
        type: "Private",
        location: "Los Angeles, CA",
        address: "456 Health Plaza, Los Angeles, CA 90210",
        rating: 4.3,
        photo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        departments: ["Dermatology", "Internal Medicine", "Radiology"],
        capacity: 150,
        phone: "(555) 234-5678",
        website: "www.metrohealth.com"
    },
    {
        id: 3,
        name: "Children's Medical Center",
        type: "Private",
        location: "Chicago, IL",
        address: "789 Pediatric Ave, Chicago, IL 60601",
        rating: 4.7,
        photo: "https://wallpaperaccess.com/full/4113320.jpg",
        departments: ["Pediatrics", "Neonatology", "Child Psychiatry"],
        capacity: 300,
        phone: "(555) 345-6789",
        website: "www.childrensmedical.com"
    },
    {
        id: 4,
        name: "Sports Medicine Institute",
        type: "Clinic",
        location: "Miami, FL",
        address: "321 Athletic Blvd, Miami, FL 33101",
        rating: 4.4,
        photo: "https://www.reidmiddleton.com/wp-content/uploads/2016/09/Project-HeroImage01-DoctorsClinic1.jpg",
        departments: ["Orthopedics", "Physical Therapy", "Sports Medicine"],
        capacity: 100,
        phone: "(555) 456-7890",
        website: "www.sportsmedicine.com"
    },
    {
        id: 5,
        name: "Neurological Institute",
        type: "Private",
        location: "Boston, MA",
        address: "654 Brain Research Dr, Boston, MA 02101",
        rating: 4.8,
        photo: "https://png.pngtree.com/background/20230525/original/pngtree-image-of-futuristic-medical-hospital-room-picture-image_2736851.jpg",
        departments: ["Neurology", "Neurosurgery", "Neuropsychology"],
        capacity: 200,
        phone: "(555) 567-8901",
        website: "www.neurological.com"
    },
    {
        id: 6,
        name: "Cancer Treatment Center",
        type: "Government",
        location: "Houston, TX",
        address: "987 Cancer Research Way, Houston, TX 77001",
        rating: 4.9,
        photo: "https://cdn.navimumbaihouses.com/blog/wp-content/uploads/2022/11/siofhshdfgyusdf-800x400.jpg",
        departments: ["Oncology", "Radiation Therapy", "Hematology"],
        capacity: 400,
        phone: "(555) 678-9012",
        website: "www.cancertreatment.com"
    },
    {
        id: 7,
        name: "Mental Health Clinic",
        type: "Clinic",
        location: "Seattle, WA",
        address: "147 Wellness St, Seattle, WA 98101",
        rating: 4.2,
        photo: "https://images.idgesg.net/images/article/2020/08/american-hospital-dubai-100854064-large.jpg",
        departments: ["Psychiatry", "Psychology", "Counseling"],
        capacity: 80,
        phone: "(555) 789-0123",
        website: "www.mentalhealth.com"
    },
    {
        id: 8,
        name: "Diabetes Care Center",
        type: "Private",
        location: "San Francisco, CA",
        address: "258 Endocrine Ave, San Francisco, CA 94101",
        rating: 4.6,
        photo: "https://reviewbangla.com/media/CACHE/images/images/business_gallery_images/sylhet_.diabetic_-hospital/5cdd007448c1bfd91bde8e4aa387443a.jpg",
        departments: ["Endocrinology", "Nutrition", "Diabetes Education"],
        capacity: 120,
        phone: "(555) 890-1234",
        website: "www.diabetescare.com"
    },
    {
        id: 9,
        name: "Women's Health Center",
        type: "Clinic",
        location: "Denver, CO",
        address: "369 Women's Health Dr, Denver, CO 80201",
        rating: 4.5,
        photo: "https://www.icmc.net/wp-content/uploads/2021/04/icmc-inaugurates-a-new-covid-19-hospital-ward-in-pakistan.jpg",
        departments: ["Gynecology", "Obstetrics", "Mammography"],
        capacity: 90,
        phone: "(555) 901-2345",
        website: "www.womenshealth.com"
    },
    {
        id: 10,
        name: "Urological Institute",
        type: "Private",
        location: "Phoenix, AZ",
        address: "741 Urology Way, Phoenix, AZ 85001",
        rating: 4.3,
        photo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        departments: ["Urology", "Prostate Care", "Kidney Care"],
        capacity: 110,
        phone: "(555) 012-3456",
        website: "www.urological.com"
    }
];

// Notifications Data
export const notificationsData = [
    {
        id: 1,
        title: "Appointment Confirmed",
        message: "Your appointment with Dr. Sarah Johnson has been confirmed for tomorrow at 2:00 PM.",
        time: "2 hours ago",
        type: "appointment"
    },
    {
        id: 2,
        title: "New Doctor Available",
        message: "Dr. Michael Chen is now available for appointments in Dermatology.",
        time: "4 hours ago",
        type: "doctor"
    },
    {
        id: 3,
        title: "Hospital Update",
        message: "City General Hospital has updated their COVID-19 protocols.",
        time: "6 hours ago",
        type: "hospital"
    },
    {
        id: 4,
        title: "Appointment Reminder",
        message: "Don't forget your appointment with Dr. Emily Rodriguez tomorrow at 10:00 AM.",
        time: "1 day ago",
        type: "reminder"
    },
    {
        id: 5,
        title: "New Specialization",
        message: "Dr. Lisa Thompson now offers Telemedicine consultations.",
        time: "2 days ago",
        type: "doctor"
    }
];

// Appointments Data
export const appointmentsData = [
    {
        id: 1,
        doctorId: 1,
        doctorName: "Dr. Sarah Johnson",
        specialization: "Cardiology",
        date: "2024-01-15",
        time: "14:00",
        status: "Confirmed",
        hospital: "City General Hospital",
        notes: "Follow-up consultation for heart condition"
    },
    {
        id: 2,
        doctorId: 3,
        doctorName: "Dr. Emily Rodriguez",
        specialization: "Pediatrics",
        date: "2024-01-16",
        time: "10:00",
        status: "Scheduled",
        hospital: "Children's Medical Center",
        notes: "Annual checkup for child"
    },
    {
        id: 3,
        doctorId: 6,
        doctorName: "Dr. Robert Kim",
        specialization: "Oncology",
        date: "2024-01-14",
        time: "16:30",
        status: "Completed",
        hospital: "Cancer Treatment Center",
        notes: "Initial consultation completed"
    }
];

// Specializations for search suggestions
export const specializations = [
    "Cardiology", "Dermatology", "Pediatrics", "Orthopedics", "Neurology",
    "Oncology", "Psychiatry", "Endocrinology", "Gynecology", "Urology",
    "Skin Care", "Diabetes", "Heart Disease", "Cancer", "Mental Health",
    "Women's Health", "Child Care", "Sports Medicine", "Emergency Care"
];

// Cities for search suggestions
export const cities = [
    "New York", "Los Angeles", "Chicago", "Miami", "Boston",
    "Houston", "Seattle", "San Francisco", "Denver", "Phoenix",
    "Dallas", "Atlanta", "Philadelphia", "Detroit", "Minneapolis"
]; 