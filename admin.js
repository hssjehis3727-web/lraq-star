// البيانات المحفوظة محلياً
let adminData = {
    services: [
        { id: 1, name: 'الحلول البرمجية', description: 'تطبيقات ويب وموبايل احترافية' },
        { id: 2, name: 'التصميم الإلكتروني', description: 'تصاميم فريدة وجذابة' },
        { id: 3, name: 'الاستضافات', description: 'خوادم موثوقة وآمنة' },
        { id: 4, name: 'الاشتراكات', description: 'باقات مرنة وتنافسية' }
    ],
    requests: [
        { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', service: 'الحلول البرمجية', date: '2024-01-15' },
        { id: 2, name: 'فاطمة علي', email: 'fatima@example.com', service: 'التصميم الإلكتروني', date: '2024-01-14' }
    ],
    messages: [
        { id: 1, name: 'محمد سالم', email: 'mohammad@example.com', subject: 'استفسار عن الأسعار', date: '2024-01-13' },
        { id: 2, name: 'سارة حسن', email: 'sarah@example.com', subject: 'طلب عرض سعر', date: '2024-01-12' }
    ]
};

// تحميل البيانات من localStorage
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = document.body.className;
    
    if (currentPage.includes('login')) {
        setupLoginForm();
    } else if (currentPage.includes('dashboard') || document.querySelector('.admin-container')) {
        checkLogin();
        loadDashboardData();
    }
});

// التحقق من تسجيل الدخول
function checkLogin() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }
}

// إعداد نموذج تسجيل الدخول
function setupLoginForm() {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // بيانات تسجيل الدخول الافتراضية
            if (username === 'admin' && password === 'admin123') {
                localStorage.setItem('adminLoggedIn', 'true');
                localStorage.setItem('adminUsername', username);
                window.location.href = 'dashboard.html';
            } else {
                alert('اسم المستخدم أو كلمة المرور غير صحيحة');
            }
        });
    }
}

// تحميل بيانات لوحة التحكم
function loadDashboardData() {
    // تحديث الإحصائيات
    document.getElementById('newRequests').textContent = adminData.requests.length;
    document.getElementById('totalMessages').textContent = adminData.messages.length;
    document.getElementById('totalClients').textContent = adminData.requests.length + adminData.messages.length;
    
    // تحميل الخدمات
    loadServices();
    
    // تحميل الطلبات
    loadRequests();
    
    // تحميل الرسائل
    loadMessages();
}

// تحميل الخدمات
function loadServices() {
    const table = document.getElementById('servicesTable');
    if (!table) return;
    
    table.innerHTML = adminData.services.map(service => `
        <tr>
            <td>${service.name}</td>
            <td>${service.description}</td>
            <td>
                <button class="btn-action btn-edit" onclick="editService(${service.id})">تعديل</button>
                <button class="btn-action btn-delete" onclick="deleteService(${service.id})">حذف</button>
            </td>
        </tr>
    `).join('');
}

// تحميل الطلبات
function loadRequests() {
    const table = document.getElementById('requestsTable');
    if (!table) return;
    
    table.innerHTML = adminData.requests.map(request => `
        <tr>
            <td>${request.name}</td>
            <td>${request.email}</td>
            <td>${request.service}</td>
            <td>${request.date}</td>
            <td>
                <button class="btn-action btn-edit" onclick="viewRequest(${request.id})">عرض</button>
                <button class="btn-action btn-delete" onclick="deleteRequest(${request.id})">حذف</button>
            </td>
        </tr>
    `).join('');
}

// تحميل الرسائل
function loadMessages() {
    const table = document.getElementById('messagesTable');
    if (!table) return;
    
    table.innerHTML = adminData.messages.map(message => `
        <tr>
            <td>${message.name}</td>
            <td>${message.email}</td>
            <td>${message.subject}</td>
            <td>${message.date}</td>
            <td>
                <button class="btn-action btn-edit" onclick="viewMessage(${message.id})">عرض</button>
                <button class="btn-action btn-delete" onclick="deleteMessage(${message.id})">حذف</button>
            </td>
        </tr>
    `).join('');
}

// عرض القسم
function showSection(sectionId) {
    // إخفاء جميع الأقسام
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // إزالة الفئة النشطة من جميع عناصر التنقل
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // عرض القسم المحدد
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }
    
    // تحديد عنصر التنقل النشط
    event.target.closest('.nav-item').classList.add('active');
}

// إضافة خدمة
function addService() {
    const name = prompt('اسم الخدمة:');
    if (!name) return;
    
    const description = prompt('وصف الخدمة:');
    if (!description) return;
    
    const newService = {
        id: Math.max(...adminData.services.map(s => s.id), 0) + 1,
        name: name,
        description: description
    };
    
    adminData.services.push(newService);
    loadServices();
    alert('تم إضافة الخدمة بنجاح');
}

// تعديل خدمة
function editService(id) {
    const service = adminData.services.find(s => s.id === id);
    if (!service) return;
    
    const newName = prompt('اسم الخدمة:', service.name);
    if (!newName) return;
    
    const newDescription = prompt('وصف الخدمة:', service.description);
    if (!newDescription) return;
    
    service.name = newName;
    service.description = newDescription;
    loadServices();
    alert('تم تحديث الخدمة بنجاح');
}

// حذف خدمة
function deleteService(id) {
    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
        adminData.services = adminData.services.filter(s => s.id !== id);
        loadServices();
        alert('تم حذف الخدمة بنجاح');
    }
}

// عرض طلب
function viewRequest(id) {
    const request = adminData.requests.find(r => r.id === id);
    if (request) {
        alert(`الاسم: ${request.name}\nالبريد: ${request.email}\nالخدمة: ${request.service}\nالتاريخ: ${request.date}`);
    }
}

// حذف طلب
function deleteRequest(id) {
    if (confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
        adminData.requests = adminData.requests.filter(r => r.id !== id);
        loadRequests();
        document.getElementById('newRequests').textContent = adminData.requests.length;
        alert('تم حذف الطلب بنجاح');
    }
}

// عرض رسالة
function viewMessage(id) {
    const message = adminData.messages.find(m => m.id === id);
    if (message) {
        alert(`الاسم: ${message.name}\nالبريد: ${message.email}\nالموضوع: ${message.subject}\nالتاريخ: ${message.date}`);
    }
}

// حذف رسالة
function deleteMessage(id) {
    if (confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
        adminData.messages = adminData.messages.filter(m => m.id !== id);
        loadMessages();
        document.getElementById('totalMessages').textContent = adminData.messages.length;
        alert('تم حذف الرسالة بنجاح');
    }
}

// حفظ الإعدادات
function saveSettings() {
    alert('تم حفظ الإعدادات بنجاح');
}

// تسجيل الخروج
function logout() {
    if (confirm('هل تريد تسجيل الخروج؟')) {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUsername');
        window.location.href = 'login.html';
    }
}
