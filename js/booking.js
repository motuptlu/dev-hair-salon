// ===================================
// BOOKING FORM - WHATSAPP AUTOMATION
// ===================================

const bookingForm = document.getElementById('bookingForm');
const WHATSAPP_NUMBER = '919990232499'; // Dev Hair Colourist number

// Set minimum date to today
document.getElementById('date').min = new Date().toISOString().split('T')[0];

bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();
    
    // Validate
    if (!name || !phone || !date || !time || !service) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Format date
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Format time
    const timeObj = new Date(`2000-01-01T${time}`);
    const formattedTime = timeObj.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    
    // Create WhatsApp message
    let whatsappMessage = `✨ *NEW APPOINTMENT REQUEST* ✨\n\n`;
    whatsappMessage += `👤 *Name:* ${name}\n`;
    whatsappMessage += `📱 *Phone:* ${phone}\n`;
    whatsappMessage += `📅 *Date:* ${formattedDate}\n`;
    whatsappMessage += `⏰ *Time:* ${formattedTime}\n`;
    whatsappMessage += `💇 *Service:* ${service}\n`;
    
    if (message) {
        whatsappMessage += `\n💬 *Message:*\n${message}\n`;
    }
    
    whatsappMessage += `\n✅ Please confirm my appointment.\n`;
    whatsappMessage += `\n_Sent from Dev Hair Colourist Website_`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Show loading
    const submitBtn = bookingForm.querySelector('.submit-btn');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening WhatsApp...';
    submitBtn.disabled = true;
    
    // Open WhatsApp
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
        
        // Reset button
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Redirecting to WhatsApp...', 'success');
        
        // Reset form after 2 seconds
        setTimeout(() => {
            bookingForm.reset();
        }, 2000);
    }, 500);
});

// ===================================
// NOTIFICATION SYSTEM
// ===================================

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add notification styles
const notificationStyles = `
.notification {
    position: fixed;
    top: 100px;
    right: 20px;
    background: white;
    padding: 20px 25px;
    border-radius: 10px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 400px;
}

.notification.show {
    transform: translateX(0);
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 15px;
    font-weight: 500;
}

.notification-content i {
    font-size: 24px;
}

.notification-success {
    border-left: 5px solid #25D366;
}

.notification-success i {
    color: #25D366;
}

.notification-error {
    border-left: 5px solid #e74c3c;
}

.notification-error i {
    color: #e74c3c;
}

.notification-info {
    border-left: 5px solid #3498db;
}

.notification-info i {
    color: #3498db;
}

@media (max-width: 768px) {
    .notification {
        right: 10px;
        left: 10px;
        max-width: none;
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// ===================================
// FORM ENHANCEMENTS
// ===================================

// Phone number formatting
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (!value.startsWith('91') && value.length > 0) {
        value = '91' + value;
    }
    if (value.length > 12) {
        value = value.slice(0, 12);
    }
    e.target.value = value ? '+' + value : '';
});

// Prevent booking in the past
document.getElementById('date').addEventListener('change', function(e) {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showNotification('Please select a future date', 'error');
        e.target.value = '';
    }
});

// Time slot validation (salon hours: 10 AM - 8 PM)
document.getElementById('time').addEventListener('change', function(e) {
    const time = e.target.value;
    const [hours, minutes] = time.split(':').map(Number);
    
    if (hours < 10 || hours >= 20) {
        showNotification('Please select time between 10:00 AM and 8:00 PM', 'error');
        e.target.value = '';
    }
});

// Add animations to form inputs
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});
