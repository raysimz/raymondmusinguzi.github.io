// Contact Form Handling for Raymond Musinguzi Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form
    initContactForm();
    
    // Initialize social media links
    initSocialLinks();
    
    // Initialize email copy functionality
    initEmailCopy();
    
    // Initialize form analytics
    initFormAnalytics();
});

// Contact Form Initialization
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    // Form state
    let formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };
    
    // Load saved form data from localStorage
    loadSavedFormData();
    
    // Input event listeners
    nameInput.addEventListener('input', (e) => {
        formData.name = e.target.value.trim();
        saveFormData();
        validateName();
    });
    
    emailInput.addEventListener('input', (e) => {
        formData.email = e.target.value.trim();
        saveFormData();
        validateEmail();
    });
    
    subjectSelect.addEventListener('change', (e) => {
        formData.subject = e.target.value;
        saveFormData();
        validateSubject();
    });
    
    messageTextarea.addEventListener('input', (e) => {
        formData.message = e.target.value.trim();
        saveFormData();
        validateMessage();
    });
    
    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            await submitForm();
        }
    });
    
    // Form validation functions
    function validateName() {
        const name = formData.name;
        const isValid = name.length >= 2;
        
        updateValidationUI(nameInput, isValid, 'Please enter a valid name (at least 2 characters)');
        return isValid;
    }
    
    function validateEmail() {
        const email = formData.email;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        
        updateValidationUI(emailInput, isValid, 'Please enter a valid email address');
        return isValid;
    }
    
    function validateSubject() {
        const subject = formData.subject;
        const isValid = subject !== '';
        
        updateValidationUI(subjectSelect, isValid, 'Please select a subject');
        return isValid;
    }
    
    function validateMessage() {
        const message = formData.message;
        const isValid = message.length >= 10;
        
        updateValidationUI(messageTextarea, isValid, 'Please enter a message (at least 10 characters)');
        return isValid;
    }
    
    function validateForm() {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        return isNameValid && isEmailValid && isSubjectValid && isMessageValid;
    }
    
    // Save form data to localStorage
    function saveFormData() {
        try {
            localStorage.setItem('raymond_contact_form', JSON.stringify(formData));
        } catch (e) {
            console.warn('Could not save form data to localStorage');
        }
    }
    
    // Load saved form data
    function loadSavedFormData() {
        try {
            const savedData = localStorage.getItem('raymond_contact_form');
            if (savedData) {
                formData = JSON.parse(savedData);
                
                // Populate form fields
                nameInput.value = formData.name;
                emailInput.value = formData.email;
                subjectSelect.value = formData.subject;
                messageTextarea.value = formData.message;
            }
        } catch (e) {
            console.warn('Could not load saved form data');
        }
    }
    
    // Clear saved form data
    function clearSavedFormData() {
        try {
            localStorage.removeItem('raymond_contact_form');
        } catch (e) {
            console.warn('Could not clear saved form data');
        }
    }
}

// Update validation UI
function updateValidationUI(element, isValid, errorMessage) {
    const formGroup = element.closest('.form-group');
    if (!formGroup) return;
    
    // Remove existing error/success classes
    element.classList.remove('error', 'success');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Remove existing success message
    const existingSuccess = formGroup.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    if (isValid) {
        // Add success state
        element.classList.add('success');
        
        // Add success message for important fields
        if (element.id === 'email' || element.id === 'message') {
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = '✓ Valid';
            successMsg.style.cssText = `
                color: #10b981;
                font-size: 0.875rem;
                margin-top: 0.5rem;
                font-weight: 500;
            `;
            formGroup.appendChild(successMsg);
        }
    } else if (element.value.trim() !== '') {
        // Only show error if field is not empty
        element.classList.add('error');
        
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = errorMessage;
        errorMsg.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
        `;
        formGroup.appendChild(errorMsg);
    }
}

// Form Submission
async function submitForm() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Disable form and show loading
    contactForm.querySelectorAll('input, select, textarea, button').forEach(el => {
        el.disabled = true;
    });
    
    submitButton.textContent = 'Sending...';
    submitButton.classList.add('loading');
    
    try {
        // Simulate API call - Replace with actual API endpoint
        const response = await simulateAPICall(getFormData());
        
        if (response.success) {
            // Show success message
            showNotification('Message sent successfully! Raymond will respond within 24 hours.', 'success');
            
            // Log form submission for analytics
            logFormSubmission('success');
            
            // Clear form and saved data
            contactForm.reset();
            clearSavedFormData();
            
            // Reset form state
            const formData = {
                name: '',
                email: '',
                subject: '',
                message: ''
            };
            
            // Remove validation states
            contactForm.querySelectorAll('input, select, textarea').forEach(el => {
                el.classList.remove('error', 'success');
                const formGroup = el.closest('.form-group');
                const errorMsg = formGroup.querySelector('.error-message');
                const successMsg = formGroup.querySelector('.success-message');
                if (errorMsg) errorMsg.remove();
                if (successMsg) successMsg.remove();
            });
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        // Show error message
        showNotification('Failed to send message. Please try again or email directly at raymond@raysimz.com', 'error');
        
        // Log form submission error for analytics
        logFormSubmission('error', error.message);
    } finally {
        // Re-enable form
        contactForm.querySelectorAll('input, select, textarea, button').forEach(el => {
            el.disabled = false;
        });
        
        submitButton.textContent = originalText;
        submitButton.classList.remove('loading');
    }
}

// Simulate API Call (Replace with actual fetch)
async function simulateAPICall(formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                message: 'Message sent successfully',
                timestamp: new Date().toISOString()
            });
        }, 1500);
    });
}

// Get form data
function getFormData() {
    const contactForm = document.getElementById('contactForm');
    const formData = new FormData(contactForm);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Add metadata
    data.timestamp = new Date().toISOString();
    data.pageUrl = window.location.href;
    data.userAgent = navigator.userAgent;
    data.referrer = document.referrer;
    
    return data;
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Add icon based on type
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'warning') icon = '⚠️';
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icon}</span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close" aria-label="Close notification">×</button>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(120%);
            opacity: 0;
            transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55), 
                        opacity 0.3s ease;
            max-width: 400px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            backdrop-filter: blur(10px);
        }
        
        .notification.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .notification-success {
            background: linear-gradient(135deg, #10b981, #059669);
            border-left: 4px solid #047857;
        }
        
        .notification-error {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            border-left: 4px solid #b91c1c;
        }
        
        .notification-info {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            border-left: 4px solid #1d4ed8;
        }
        
        .notification-warning {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            border-left: 4px solid #b45309;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex: 1;
        }
        
        .notification-icon {
            font-size: 1.2rem;
        }
        
        .notification-message {
            font-size: 0.95rem;
            line-height: 1.4;
        }
        
        .notification-close {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s ease;
        }
        
        .notification-close:hover {
            background: rgba(255,255,255,0.3);
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Show with animation
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Social Media Links Enhancement
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        // Add hover effect
        link.addEventListener('mouseenter', (e) => {
            const icon = link.querySelector('img');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        link.addEventListener('mouseleave', (e) => {
            const icon = link.querySelector('img');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
        
        // Add click tracking
        link.addEventListener('click', (e) => {
            const platform = link.querySelector('span').textContent;
            logSocialClick(platform, link.href);
        });
    });
}

// Email Copy Functionality
function initEmailCopy() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            const email = link.href.replace('mailto:', '');
            
            // Try to copy to clipboard
            try {
                await navigator.clipboard.writeText(email);
                
                // Show copy confirmation
                const originalText = link.textContent;
                link.textContent = 'Copied!';
                link.style.color = '#10b981';
                
                setTimeout(() => {
                    link.textContent = originalText;
                    link.style.color = '';
                }, 2000);
                
                // Log email copy
                logEmailCopy(email);
            } catch (err) {
                console.log('Failed to copy email');
            }
        });
    });
}

// Analytics Functions
function initFormAnalytics() {
    // Track form interactions
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    let startTime = Date.now();
    let fieldInteractions = new Set();
    
    // Track form focus
    contactForm.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('focus', () => {
            fieldInteractions.add(field.id);
            logFormInteraction('field_focus', field.id);
        });
        
        field.addEventListener('blur', () => {
            logFormInteraction('field_blur', field.id, field.value.length);
        });
    });
    
    // Track form view time
    const formObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startTime = Date.now();
                logFormInteraction('form_view');
            } else {
                const viewTime = Date.now() - startTime;
                if (viewTime > 1000) { // Only log if viewed for >1s
                    logFormInteraction('form_view_time', null, viewTime);
                }
            }
        });
    }, { threshold: 0.5 });
    
    formObserver.observe(contactForm);
}

function logFormInteraction(type, field = null, value = null) {
    const data = {
        type,
        field,
        value,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
    };
    
    // In a real application, send this to your analytics service
    console.log('Form Interaction:', data);
    
    // Store in localStorage for debugging
    try {
        const logs = JSON.parse(localStorage.getItem('form_analytics') || '[]');
        logs.push(data);
        localStorage.setItem('form_analytics', JSON.stringify(logs.slice(-50))); // Keep last 50 entries
    } catch (e) {
        // Ignore storage errors
    }
}

function logFormSubmission(status, error = null) {
    const data = {
        event: 'form_submission',
        status,
        error,
        timestamp: new Date().toISOString(),
        url: window.location.href
    };
    
    console.log('Form Submission:', data);
    
    // Store in localStorage
    try {
        const submissions = JSON.parse(localStorage.getItem('form_submissions') || '[]');
        submissions.push(data);
        localStorage.setItem('form_submissions', JSON.stringify(submissions.slice(-20))); // Keep last 20 submissions
    } catch (e) {
        // Ignore storage errors
    }
}

function logSocialClick(platform, url) {
    const data = {
        event: 'social_click',
        platform,
        url,
        timestamp: new Date().toISOString()
    };
    
    console.log('Social Click:', data);
}

function logEmailCopy(email) {
    const data = {
        event: 'email_copy',
        email,
        timestamp: new Date().toISOString()
    };
    
    console.log('Email Copy:', data);
}

// Form data export (for debugging)
window.exportFormAnalytics = function() {
    try {
        const interactions = JSON.parse(localStorage.getItem('form_analytics') || '[]');
        const submissions = JSON.parse(localStorage.getItem('form_submissions') || '[]');
        
        const data = {
            interactions,
            submissions,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `form-analytics-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        return data;
    } catch (e) {
        console.error('Failed to export analytics:', e);
        return null;
    }
};

// Form data clear (for debugging)
window.clearFormAnalytics = function() {
    if (confirm('Clear all form analytics data?')) {
        localStorage.removeItem('form_analytics');
        localStorage.removeItem('form_submissions');
        console.log('Form analytics cleared');
    }
};