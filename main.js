// تحميل الخدمات من ملف JSON
document.addEventListener('DOMContentLoaded', function() {
    loadServices();
    setupContactForm();
});

function loadServices() {
    const services = [
        {
            id: 1,
            name: 'الحلول البرمجية',
            description: 'تطبيقات ويب وموبايل احترافية',
            icon: 'fa-code'
        },
        {
            id: 2,
            name: 'التصميم الإلكتروني',
            description: 'تصاميم فريدة وجذابة',
            icon: 'fa-palette'
        },
        {
            id: 3,
            name: 'الاستضافات',
            description: 'خوادم موثوقة وآمنة',
            icon: 'fa-server'
        },
        {
            id: 4,
            name: 'الاشتراكات',
            description: 'باقات مرنة وتنافسية',
            icon: 'fa-star'
        }
    ];

    const container = document.getElementById('servicesContainer');
    container.innerHTML = services.map(service => `
        <div class="service-card">
            <i class="fas ${service.icon}"></i>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <button class="btn btn-secondary" onclick="selectService(${service.id})">اختر الخدمة</button>
        </div>
    `).join('');
}

function selectService(serviceId) {
    alert('تم اختيار الخدمة رقم ' + serviceId);
}

function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            alert('شكراً لتواصلك معنا! سنرد عليك قريباً.');
            form.reset();
        });
    }
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
