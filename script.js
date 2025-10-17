
// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scroll');
        navbar.classList.add('py-2');
    } else {
        navbar.classList.remove('nav-scroll');
        navbar.classList.remove('py-2');
    }
});

// Simple animation for elements when they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .timeline-item').forEach(el => {
    observer.observe(el);
});


// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuButton.querySelector('i');

    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', function () {
        const isHidden = mobileMenu.classList.contains('hidden');

        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnButton = mobileMenuButton.contains(event.target);

        if (!isClickInsideMenu && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
});


const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
    };

    try {
        const response = await fetch("https://formspree.io/f/mzzalkvk", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            status.textContent = "✅ Message Sent!";
            status.className = "block text-green-600 text-center font-medium";
            form.reset();
        } else {
            status.textContent = "⚠️ Failed to send. Try again.";
            status.className = "block text-red-600 text-center font-medium";
        }
    } catch (error) {
        status.textContent = "⚠️ Network error. Try again.";
        status.className = "block text-red-600 text-center font-medium";
    }
});