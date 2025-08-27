// Contact Form Script
// Wait for page to load
window.addEventListener('load', function() {
    // Find the button
    const submitBtn = document.getElementById('submitBtn');
    
    if (submitBtn) {
        // Add input listeners for real-time validation
        addInputListeners();
        
        // Add click handler for form submission
        submitBtn.onclick = function() {
            // Clear previous error messages
            clearAllErrors();
            
            // Get form data
            const form = document.getElementById('contactForm');
            const formData = new FormData(form);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject').trim();
            const message = formData.get('message').trim();
            
            // Validate all fields
            let isValid = true;
            
            if (!name) {
                showError('name', 'Please enter your name');
                isValid = false;
            }
            
            if (!email) {
                showError('email', 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!subject) {
                showError('subject', 'Please enter a subject');
                isValid = false;
            }
            
            if (!message) {
                showError('message', 'Please enter your message');
                isValid = false;
            }
            
            if (!isValid) {
                return false;
            }
            
            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send form data to FormSubmit via JavaScript
            fetch("https://formsubmit.co/kidistayele37@gmail.com", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    showSuccessMessage();
                    
                    // Reset form
                    form.reset();
                    clearAllErrors();
                } else {
                    throw new Error(`FormSubmit error: ${response.status}`);
                }
            })
            .catch(error => {
                showErrorMessage('Failed to send message. Please try again later.');
            })
            .finally(() => {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
            
            return false;
        };
    }
});

// Helper functions
function showError(fieldName, message) {
    const errorElement = document.getElementById(fieldName + 'Error');
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement && inputElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        inputElement.classList.add('error');
    }
}

// Add input event listeners to clear errors as user types
function addInputListeners() {
    const inputs = ['name', 'email', 'subject', 'message'];
    
    inputs.forEach(fieldName => {
        const inputElement = document.getElementById(fieldName);
        if (inputElement) {
            inputElement.addEventListener('input', function() {
                clearFieldError(fieldName);
            });
            
            inputElement.addEventListener('blur', function() {
                validateField(fieldName);
            });
        }
    });
}

function clearFieldError(fieldName) {
    const errorElement = document.getElementById(fieldName + 'Error');
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement && inputElement) {
        errorElement.style.display = 'none';
        errorElement.textContent = '';
        inputElement.classList.remove('error');
    }
}

function validateField(fieldName) {
    const inputElement = document.getElementById(fieldName);
    const value = inputElement.value.trim();
    
    if (!value) {
        showError(fieldName, `Please enter your ${fieldName === 'name' ? 'name' : fieldName === 'email' ? 'email address' : fieldName}`);
        return false;
    }
    
    if (fieldName === 'email' && !isValidEmail(value)) {
        showError(fieldName, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('.form-group input, .form-group textarea');
    
    errorElements.forEach(element => {
        element.style.display = 'none';
        element.textContent = '';
    });
    
    inputElements.forEach(element => {
        element.classList.remove('error');
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    const contactForm = document.getElementById('contactForm');
    
    if (successMessage && contactForm) {
        // Hide the form
        contactForm.style.display = 'none';
        // Show success message
        successMessage.style.display = 'block';
        
        setTimeout(() => {
            // Hide success message
            successMessage.style.display = 'none';
            // Show form again
            contactForm.style.display = 'block';
        }, 5000);
    }
}

function showErrorMessage(message) {
    const successMessage = document.getElementById('successMessage');
    const contactForm = document.getElementById('contactForm');
    
    if (successMessage && contactForm) {
        // Update success message content for error
        const successContent = successMessage.querySelector('.success-content');
        if (successContent) {
            const icon = successContent.querySelector('.success-icon');
            const title = successContent.querySelector('h3');
            const description = successContent.querySelector('p');
            
            if (icon) icon.textContent = '❌';
            if (title) title.textContent = 'Message Failed to Send';
            if (description) description.textContent = message;
            
            // Change colors to error theme
            successMessage.style.borderColor = '#e74c3c';
            if (icon) icon.style.color = '#e74c3c';
        }
        
        // Hide the form
        contactForm.style.display = 'none';
        // Show error message
        successMessage.style.display = 'block';
        
        setTimeout(() => {
            // Hide error message
            successMessage.style.display = 'none';
            // Show form again
            contactForm.style.display = 'block';
            
            // Reset to original success styling
            const successContent = successMessage.querySelector('.success-content');
            if (successContent) {
                const icon = successContent.querySelector('.success-icon');
                const title = successContent.querySelector('h3');
                const description = successContent.querySelector('p');
                
                if (icon) icon.textContent = '✅';
                if (title) title.textContent = 'Message Sent Successfully!';
                if (description) description.textContent = 'Thank you for reaching out. I\'ll get back to you soon.';
                
                // Reset colors
                successMessage.style.borderColor = '';
                if (icon) icon.style.color = '#4CAF50';
            }
        }, 5000);
    }
}
