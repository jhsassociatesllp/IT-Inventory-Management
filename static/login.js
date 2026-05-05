/* =====================================================
   JHS IT Admin - Login Page Script
   ===================================================== */

// ============================================================================
// CONFIGURATION
// ============================================================================

// Backend API URL - Change this if your backend is running on different port
const API_BASE_URL = "http://localhost:8000";

// Dashboard redirect page
const DASHBOARD_PAGE = "/static/index.html";

// ============================================================================
// DOM ELEMENTS
// ============================================================================

const loginForm     = document.getElementById('loginForm');
const submitBtn     = document.getElementById('submitBtn');
const btnText       = document.getElementById('btnText');
const emailInput    = document.getElementById('adminEmail');
const passwordInput = document.getElementById('password');
const errorMessage  = document.getElementById('errorMessage');
const errorText     = document.getElementById('errorText');
const successMessage = document.getElementById('successMessage');
const successText   = document.getElementById('successText');
const loginCard     = document.getElementById('loginCard');
const backendStatus = document.getElementById('backendStatus');

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function showError(message) {
  errorText.textContent = message;
  errorMessage.classList.remove('hidden');
  successMessage.classList.add('hidden');
  loginCard.classList.add('error-shake');
  setTimeout(() => loginCard.classList.remove('error-shake'), 500);
}

function showSuccess(message) {
  successText.textContent = message;
  successMessage.classList.remove('hidden');
  errorMessage.classList.add('hidden');
}

function hideMessages() {
  errorMessage.classList.add('hidden');
  successMessage.classList.add('hidden');
}

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  if (isLoading) {
    btnText.innerHTML = 'Signing In<span class="spinner"></span>';
  } else {
    btnText.textContent = 'Sign In as Admin';
  }
}

// ============================================================================
// BACKEND CONNECTION CHECK
// ============================================================================

async function checkBackendConnection() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      backendStatus.textContent = '✓ Connected';
      backendStatus.classList.add('text-green-600');
      backendStatus.classList.remove('text-red-600', 'text-gray-500');
      console.log('✓ Backend connected:', data);
      return true;
    } else {
      throw new Error('Backend not responding');
    }
  } catch (error) {
    backendStatus.textContent = '✗ Disconnected';
    backendStatus.classList.add('text-red-600');
    backendStatus.classList.remove('text-green-600', 'text-gray-500');
    console.error('✗ Backend connection failed:', error);
    return false;
  }
}

// Check backend on page load
checkBackendConnection();

// ============================================================================
// LOGIN FUNCTION
// ============================================================================

async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      // Login successful
      console.log('✓ Login successful:', data);

      // Store user data in localStorage
      localStorage.setItem('userEmail',   data.email);
      localStorage.setItem('userRole',    data.role);
      localStorage.setItem('isLoggedIn',  'true');
      localStorage.setItem('loginTime',   new Date().toISOString());

      // Show success message
      showSuccess(`Welcome back, ${data.email}! Redirecting to dashboard...`);

      // Redirect to dashboard after 1 second
      setTimeout(() => {
        window.location.href = DASHBOARD_PAGE;
      }, 1000);

      return true;
    } else {
      // Login failed
      console.error('✗ Login failed:', data);

      // Handle different error cases
      if (response.status === 401) {
        showError('Invalid email or password. Please try again.');
      } else if (response.status === 403) {
        showError('Your account is inactive. Please contact administrator.');
      } else {
        showError(data.detail || 'Login failed. Please try again.');
      }

      return false;
    }
  } catch (error) {
    console.error('✗ Login error:', error);

    // Network error or backend not available
    showError('Cannot connect to server. Please check if backend is running.');

    // Re-check backend connection
    checkBackendConnection();

    return false;
  }
}

// ============================================================================
// FORM SUBMIT HANDLER
// ============================================================================

loginForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  // Hide previous messages
  hideMessages();

  // Get form values
  const email    = emailInput.value.trim();
  const password = passwordInput.value;

  // Basic validation
  if (!email || !password) {
    showError('Please enter both email and password.');
    return;
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('Please enter a valid email address.');
    return;
  }

  // Set loading state
  setLoading(true);

  // Call login function
  await loginUser(email, password);

  // Remove loading state
  setLoading(false);
});

// ============================================================================
// AUTO-LOGIN CHECK (if already logged in)
// ============================================================================

window.addEventListener('load', function () {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userEmail  = localStorage.getItem('userEmail');

  if (isLoggedIn === 'true' && userEmail) {
    console.log('User already logged in, redirecting...');
    // Uncomment below to auto-redirect if already logged in
    // window.location.href = DASHBOARD_PAGE;
  }
});

// ============================================================================
// KEYBOARD SHORTCUTS
// ============================================================================

// Press Enter to submit (already handled by form)
// Press Escape to clear form
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    emailInput.value    = '';
    passwordInput.value = '';
    hideMessages();
  }
});

// ============================================================================
// DEBUG INFO (Remove in production)
// ============================================================================

console.log('='.repeat(60));
console.log('JHS IT Admin - Login Page');
console.log('='.repeat(60));
console.log('Backend API:', API_BASE_URL);
console.log('Dashboard:',   DASHBOARD_PAGE);
console.log('='.repeat(60));
console.log('Allowed Users:');
console.log('- admin@jhsassociates.in (admin)');
console.log('- maaz.quraishi@jhsassociates.in (user)');
console.log('- huzeifa.unwala@jhsassociates.in (user)');
console.log('- mohammad.siddiqui@jhsassociates.in (user)');
console.log('Default Password: Admin@123');
console.log('='.repeat(60));