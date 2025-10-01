// Global variable to track current dashboard state
let currentDashboard = null;

// Default credentials
const credentials = {
  passenger: {
    email: 'passenger@trackngo.com',
    phone: '1234567890',
    password: 'passenger123'
  },
  authority: {
    email: 'authority@trackngo.com',
    phone: '0987654321',
    password: 'authority123'
  }
};

function showLoginForm(type) {
  const sections = ['landingPage', 'passengerLogin', 'authorityLogin', 'passengerPage', 'authorityPage'];
  sections.forEach(id => document.getElementById(id).classList.remove('active'));

  const elementId = type === 'passenger' ? 'passengerLogin' : 'authorityLogin';
  const el = document.getElementById(elementId);

  // Trigger reflow to restart animation
  el.classList.add('active');
  void el.offsetWidth; // restart CSS animation
}

function validateLogin(type, emailOrPhone, password) {
  const creds = credentials[type];
  
  // Check if email/phone matches
  const isEmailValid = emailOrPhone === creds.email;
  const isPhoneValid = emailOrPhone === creds.phone;
  
  // Check if password matches
  const isPasswordValid = password === creds.password;
  
  return (isEmailValid || isPhoneValid) && isPasswordValid;
}

function handlePassengerLogin(event) {
  event.preventDefault();
  
  const emailOrPhone = document.querySelector('#passengerLogin input[type="text"]').value;
  const password = document.querySelector('#passengerLogin input[type="password"]').value;
  
  if (validateLogin('passenger', emailOrPhone, password)) {
    showPassengerPage();
  } else {
    alert('Invalid credentials! Please use:\nEmail: passenger@trackngo.com\nPhone: 1234567890\nPassword: passenger123');
  }
}

function handleAuthorityLogin(event) {
  event.preventDefault();
  
  const emailOrPhone = document.querySelector('#authorityLogin input[type="text"]').value;
  const password = document.querySelector('#authorityLogin input[type="password"]').value;
  
  if (validateLogin('authority', emailOrPhone, password)) {
    showAuthorityPage();
  } else {
    alert('Invalid credentials! Please use:\nEmail: authority@trackngo.com\nPhone: 0987654321\nPassword: authority123');
  }
}

function showSubSection(id) {
  // Hide all subsections
  let allSubSections;
  if (currentDashboard === 'passenger') {
    allSubSections = document.querySelectorAll('#passengerPage .subSection');
  } else {
    allSubSections = document.querySelectorAll('#authorityPage .subSection');
  }
  
  allSubSections.forEach(sec => sec.classList.remove('active'));
  
  // Show the selected subsection
  document.getElementById(id).classList.add('active');
  
  // Hide dashboard cards
  const dashboardCards = document.querySelector(`#${currentDashboard === 'passenger' ? 'passengerPage' : 'authorityPage'} .dashboard-cards`);
  if (dashboardCards) {
    dashboardCards.style.display = 'none';
  }
  
  // Hide dashboard header
  const dashboardHeader = document.querySelector(`#${currentDashboard === 'passenger' ? 'passengerPage' : 'authorityPage'} .dashboard-header`);
  if (dashboardHeader) {
    dashboardHeader.style.display = 'none';
  }
}

function showDashboard() {
  // Show all subsections
  let allSubSections;
  if (currentDashboard === 'passenger') {
    allSubSections = document.querySelectorAll('#passengerPage .subSection');
  } else {
    allSubSections = document.querySelectorAll('#authorityPage .subSection');
  }
  
  allSubSections.forEach(sec => sec.classList.remove('active'));
  
  // Show dashboard cards
  const dashboardCards = document.querySelector(`#${currentDashboard === 'passenger' ? 'passengerPage' : 'authorityPage'} .dashboard-cards`);
  if (dashboardCards) {
    dashboardCards.style.display = 'grid';
  }
  
  // Show dashboard header
  const dashboardHeader = document.querySelector(`#${currentDashboard === 'passenger' ? 'passengerPage' : 'authorityPage'} .dashboard-header`);
  if (dashboardHeader) {
    dashboardHeader.style.display = 'block';
  }
}

function showPassengerPage() {
  const sections = ['landingPage', 'passengerLogin', 'authorityLogin', 'authorityPage'];
  sections.forEach(id => document.getElementById(id).classList.remove('active'));

  const passengerPage = document.getElementById('passengerPage');
  passengerPage.classList.add('active');
  
  currentDashboard = 'passenger';
  showDashboard();
}

function showAuthorityPage() {
  const sections = ['landingPage', 'passengerLogin', 'authorityLogin', 'passengerPage'];
  sections.forEach(id => document.getElementById(id).classList.remove('active'));

  const authorityPage = document.getElementById('authorityPage');
  authorityPage.classList.add('active');
  
  currentDashboard = 'authority';
  showDashboard();
}

function generateNewTicket() {
  const qrPlaceholder = document.querySelector('.qr-placeholder');
  if (qrPlaceholder) {
    qrPlaceholder.innerHTML = `
      <i class="fas fa-sync-alt fa-spin"></i>
      <p>Generating new ticket...</p>
    `;
    
    setTimeout(() => {
      qrPlaceholder.innerHTML = `
        <i class="fas fa-qrcode"></i>
        <p>New Ticket Generated</p>
        <small>Valid until: Tomorrow 23:59</small>
      `;
      alert('New QR ticket generated successfully!');
    }, 2000);
  }
}

// Update passenger count with random data
function updatePassengerCount() {
  const countElement = document.getElementById('totalPassengers');
  if (countElement) {
    // Random count between 10,000 and 15,000 for demo
    const randomCount = Math.floor(Math.random() * 5000) + 10000;
    countElement.textContent = randomCount.toLocaleString();
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log('TrackNGo System Initialized');
  console.log('Demo Credentials:');
  console.log('Passenger - Email: passenger@trackngo.com, Phone: 1234567890, Password: passenger123');
  console.log('Authority - Email: authority@trackngo.com, Phone: 0987654321, Password: authority123');
  
  // Add click handlers for dashboard cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', function() {
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
  
  // Update passenger count every 10 seconds for demo
  setInterval(updatePassengerCount, 10000);
  updatePassengerCount(); // Initial call
  
  // Add camera feed interactions
  const cameraFeeds = document.querySelectorAll('.camera-feed');
  cameraFeeds.forEach(feed => {
    feed.addEventListener('click', function() {
      cameraFeeds.forEach(f => f.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Add form validation styling
  const loginForms = document.querySelectorAll('.login-form form');
  loginForms.forEach(form => {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('input', function() {
        if (this.value.trim()) {
          this.style.borderColor = '#ddd';
        }
      });
    });
  });
});

// Utility function to format time
function formatTime(date) {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
}

// Export functions for global access (if needed)
window.showLoginForm = showLoginForm;
window.showSubSection = showSubSection;
window.showDashboard = showDashboard;
window.handlePassengerLogin = handlePassengerLogin;
window.handleAuthorityLogin = handleAuthorityLogin;
window.generateNewTicket = generateNewTicket;