// ===================================
// ADMIN PANEL JAVASCRIPT
// ===================================

// Sample Data
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'devhair2025'
};

const sampleBookings = [
    {
        id: 'BK001',
        name: 'Priya Sharma',
        phone: '+91 9876543210',
        service: 'Balayage',
        date: '2025-01-20',
        time: '10:00 AM',
        status: 'confirmed'
    },
    {
        id: 'BK002',
        name: 'Rahul Verma',
        phone: '+91 9876543211',
        service: 'Haircut',
        date: '2025-01-20',
        time: '11:30 AM',
        status: 'confirmed'
    },
    {
        id: 'BK003',
        name: 'Ananya Patel',
        phone: '+91 9876543212',
        service: 'Bridal Package',
        date: '2025-01-21',
        time: '02:00 PM',
        status: 'pending'
    },
    {
        id: 'BK004',
        name: 'Rohit Singh',
        phone: '+91 9876543213',
        service: 'Keratin Treatment',
        date: '2025-01-22',
        time: '03:00 PM',
        status: 'confirmed'
    },
    {
        id: 'BK005',
        name: 'Neha Kapoor',
        phone: '+91 9876543214',
        service: 'Highlights',
        date: '2025-01-19',
        time: '04:00 PM',
        status: 'completed'
    }
];

const sampleClients = [
    { name: 'Priya Sharma', phone: '+91 9876543210', email: 'priya@example.com', visits: 12, lastVisit: '2025-01-15', spent: '₹45,000' },
    { name: 'Ananya Patel', phone: '+91 9876543211', email: 'ananya@example.com', visits: 8, lastVisit: '2025-01-10', spent: '₹32,000' },
    { name: 'Rohit Singh', phone: '+91 9876543212', email: 'rohit@example.com', visits: 15, lastVisit: '2025-01-18', spent: '₹58,000' }
];

// ===================================
// LOGIN FUNCTIONALITY
// ===================================

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'flex';
        loadDashboardData();
    } else {
        alert('Invalid credentials! Please try again.');
    }
});

// ===================================
// LOGOUT FUNCTIONALITY
// ===================================

document.getElementById('logoutBtn')?.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        document.getElementById('adminDashboard').style.display = 'none';
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('loginForm').reset();
    }
});

// ===================================
// NAVIGATION
// ===================================

document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        // Hide all pages
        document.querySelectorAll('.page-content').forEach(page => page.style.display = 'none');
        
        // Show selected page
        const page = this.getAttribute('data-page');
        const pageElement = document.getElementById(page + 'Page');
        if (pageElement) {
            pageElement.style.display = 'block';
        }
        
        // Update page title
        document.getElementById('pageTitle').textContent = this.textContent.trim();
        
        // Load page data
        loadPageData(page);
    });
});

// ===================================
// LOAD DASHBOARD DATA
// ===================================

function loadDashboardData() {
    loadRecentBookings();
}

function loadRecentBookings() {
    const tbody = document.getElementById('recentBookingsTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    sampleBookings.slice(0, 5).forEach(booking => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${booking.name}</td>
            <td>${booking.service}</td>
            <td>${booking.date} ${booking.time}</td>
            <td><span class="status-badge ${booking.status}">${booking.status}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-action view" onclick="viewBooking('${booking.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-action edit" onclick="editBooking('${booking.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action delete" onclick="deleteBooking('${booking.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ===================================
// LOAD PAGE DATA
// ===================================

function loadPageData(page) {
    switch(page) {
        case 'bookings':
            loadAllBookings();
            break;
        case 'clients':
            loadClients();
            break;
        default:
            break;
    }
}

function loadAllBookings() {
    const tbody = document.getElementById('allBookingsTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    sampleBookings.forEach(booking => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${booking.id}</td>
            <td>${booking.name}</td>
            <td>${booking.phone}</td>
            <td>${booking.service}</td>
            <td>${booking.date}</td>
            <td>${booking.time}</td>
            <td><span class="status-badge ${booking.status}">${booking.status}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-action view" onclick="viewBooking('${booking.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-action edit" onclick="editBooking('${booking.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action delete" onclick="deleteBooking('${booking.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function loadClients() {
    const tbody = document.getElementById('clientsTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    sampleClients.forEach(client => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${client.name}</td>
            <td>${client.phone}</td>
            <td>${client.email}</td>
            <td>${client.visits}</td>
            <td>${client.lastVisit}</td>
            <td>${client.spent}</td>
        `;
        tbody.appendChild(tr);
    });
}

// ===================================
// ACTION FUNCTIONS
// ===================================

function viewBooking(id) {
    const booking = sampleBookings.find(b => b.id === id);
    if (booking) {
        alert(`Booking Details:\n\nID: ${booking.id}\nName: ${booking.name}\nService: ${booking.service}\nDate: ${booking.date}\nTime: ${booking.time}`);
    }
}

function editBooking(id) {
    alert('Edit booking: ' + id);
}

function deleteBooking(id) {
    if (confirm('Are you sure you want to delete this booking?')) {
        alert('Booking deleted: ' + id);
        // Reload data
        loadDashboardData();
    }
}

// ===================================
// FILTERS
// ===================================

document.getElementById('filterDate')?.addEventListener('change', function() {
    // Filter bookings by date
    console.log('Filter by date:', this.value);
});

document.getElementById('filterStatus')?.addEventListener('change', function() {
    // Filter bookings by status
    console.log('Filter by status:', this.value);
});

document.getElementById('searchClients')?.addEventListener('input', function() {
    // Search clients
    console.log('Search:', this.value);
});

console.log('Admin panel loaded successfully!');
