// ========== PART 1: EVENT HANDLING ========== //

// Wait for DOM to fully load before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', toggleTheme);
    
    // Click event example
    const clickBox = document.getElementById('clickBox');
    clickBox.addEventListener('click', handleClickEvent);
    
    // Mouseover event example
    const mouseoverBox = document.getElementById('mouseoverBox');
    mouseoverBox.addEventListener('mouseover', handleMouseoverEvent);
    mouseoverBox.addEventListener('mouseout', handleMouseoutEvent);
    
    // Keypress event example
    document.addEventListener('keydown', handleKeypressEvent);
    
    // ========== PART 2: INTERACTIVE ELEMENTS ========== //
    
    // Counter game functionality
    const startGameButton = document.getElementById('startGame');
    const clickButton = document.getElementById('clickButton');
    const timeLeftDisplay = document.getElementById('timeLeft');
    const clickCountDisplay = document.getElementById('clickCount');
    
    startGameButton.addEventListener('click', startCounterGame);
    clickButton.addEventListener('click', incrementCounter);
    
    // FAQ section functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', toggleFAQ);
    });
    
    // ========== PART 3: FORM VALIDATION ========== //
    
    const userForm = document.getElementById('userForm');
    userForm.addEventListener('submit', validateForm);
    
    // Add real-time validation for each field
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    nameInput.addEventListener('blur', () => validateField(nameInput, 'nameError', validateName));
    emailInput.addEventListener('blur', () => validateField(emailInput, 'emailError', validateEmail));
    passwordInput.addEventListener('blur', () => validateField(passwordInput, 'passwordError', validatePassword));
    confirmPasswordInput.addEventListener('blur', () => validateField(confirmPasswordInput, 'confirmPasswordError', validateConfirmPassword));
});

// ========== THEME TOGGLE FUNCTION ========== //
/**
 * Toggles between light and dark themes
 */
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙 Dark Mode';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️ Light Mode';
    }
}

// ========== EVENT HANDLING FUNCTIONS ========== //
/**
 * Handles click events on the click box
 */
function handleClickEvent(event) {
    const colors = ['#ff7675', '#74b9ff', '#55efc4', '#a29bfe', '#ffeaa7'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    event.target.style.backgroundColor = randomColor;
}

/**
 * Handles mouseover events on the mouseover box
 */
function handleMouseoverEvent(event) {
    event.target.style.transform = 'scale(1.05)';
    event.target.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
}

/**
 * Handles mouseout events on the mouseover box
 */
function handleMouseoutEvent(event) {
    event.target.style.transform = 'scale(1)';
    event.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
}

/**
 * Handles keypress events anywhere on the document
 */
function handleKeypressEvent(event) {
    const keypressBox = document.getElementById('keypressBox');
    const colors = ['#fd79a8', '#fdcb6e', '#00cec9', '#6c5ce7', '#dfe6e9'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    keypressBox.style.backgroundColor = randomColor;
    
    // Reset color after a short delay
    setTimeout(() => {
        keypressBox.style.backgroundColor = '';
    }, 500);
}

// ========== COUNTER GAME FUNCTIONS ========== //
let gameTimer;
let timeLeft = 10;
let clickCount = 0;

/**
 * Starts the counter game
 */
function startCounterGame() {
    const startGameButton = document.getElementById('startGame');
    const clickButton = document.getElementById('clickButton');
    
    // Reset game state
    timeLeft = 10;
    clickCount = 0;
    document.getElementById('timeLeft').textContent = timeLeft;
    document.getElementById('clickCount').textContent = clickCount;
    
    // Enable the click button and disable start button
    clickButton.disabled = false;
    startGameButton.disabled = true;
    
    // Start the timer
    gameTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('timeLeft').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

/**
 * Ends the counter game
 */
function endGame() {
    clearInterval(gameTimer);
    
    const startGameButton = document.getElementById('startGame');
    const clickButton = document.getElementById('clickButton');
    
    clickButton.disabled = true;
    startGameButton.disabled = false;
    
    // Show result
    alert(`Game over! You clicked ${clickCount} times in 10 seconds.`);
}

/**
 * Increments the click counter
 */
function incrementCounter() {
    clickCount++;
    document.getElementById('clickCount').textContent = clickCount;
}

// ========== FAQ SECTION FUNCTIONS ========== //
/**
 * Toggles FAQ answer visibility
 */
function toggleFAQ(event) {
    const faqItem = event.target.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const toggleIcon = faqItem.querySelector('.toggle-icon');
    
    // Toggle active class
    answer.classList.toggle('active');
    
    // Update toggle icon
    if (answer.classList.contains('active')) {
        toggleIcon.textContent = '−';
    } else {
        toggleIcon.textContent = '+';
    }
}

// ========== FORM VALIDATION FUNCTIONS ========== //
/**
 * Validates the entire form on submission
 */
function validateForm(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    let isValid = true;
    
    // Validate each field
    if (!validateField(nameInput, 'nameError', validateName)) isValid = false;
    if (!validateField(emailInput, 'emailError', validateEmail)) isValid = false;
    if (!validateField(passwordInput, 'passwordError', validatePassword)) isValid = false;
    if (!validateField(confirmPasswordInput, 'confirmPasswordError', validateConfirmPassword)) isValid = false;
    
    // If form is valid, show success message
    if (isValid) {
        document.getElementById('userForm').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
    }
    
    return false;
}

/**
 * Validates a single form field
 */
function validateField(input, errorElementId, validationFunction) {
    const errorElement = document.getElementById(errorElementId);
    const isValid = validationFunction(input.value);
    
    if (!isValid) {
        errorElement.textContent = getErrorMessage(input.name);
        input.style.borderColor = '#e74c3c';
        return false;
    } else {
        errorElement.textContent = '';
        input.style.borderColor = '#2ecc71';
        return true;
    }
}

/**
 * Validates name field
 */
function validateName(name) {
    return name.trim().length >= 2;
}

/**
 * Validates email field using regex
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validates password field
 */
function validatePassword(password) {
    return password.length >= 6;
}

/**
 * Validates confirm password field
 */
function validateConfirmPassword(confirmPassword) {
    const password = document.getElementById('password').value;
    return confirmPassword === password;
}

/**
 * Returns appropriate error message for each field
 */
function getErrorMessage(fieldName) {
    switch(fieldName) {
        case 'name':
            return 'Name must be at least 2 characters long';
        case 'email':
            return 'Please enter a valid email address';
        case 'password':
            return 'Password must be at least 6 characters long';
        case 'confirmPassword':
            return 'Passwords do not match';
        default:
            return 'This field is required';
    }
}