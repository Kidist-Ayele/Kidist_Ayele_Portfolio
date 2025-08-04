document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop normal form submission

            const form = e.target;
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            // Validate form
            let isValid = true;
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('shake');
                    setTimeout(() => input.classList.remove('shake'), 600);
                } else {
                    input.classList.remove('shake');
                }
            });

            if (!isValid) {
                alert("Please fill in all required fields.");
                return;
            }

            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Create FormData with proper field names
            const formData = new FormData();
            formData.append('name', form.querySelector('input[name="name"]').value);
            formData.append('email', form.querySelector('input[name="email"]').value);
            formData.append('subject', form.querySelector('input[name="subject"]').value);
            formData.append('message', form.querySelector('textarea[name="message"]').value);

            fetch("https://formsubmit.co/kidistayele37@gmail.com", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    form.reset();
                    const successMessage = document.getElementById('successMessage');
                    if (successMessage) {
                        successMessage.style.display = 'block';
                        
                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            successMessage.style.display = 'none';
                        }, 5000);
                    }
                } else {
                    alert("Oops! Something went wrong. Please try again.");
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                alert("Oops! Something went wrong. Please try again.");
            })
            .finally(() => {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });

        // Reset form fields when inputs are changed
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('shake');
            });
        });
    }
});

