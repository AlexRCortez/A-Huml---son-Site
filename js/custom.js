
   // /js/custom.js

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. AOS ANIMATION WITH HORSEPOWER CHECK
    // ==========================================
    let isSlowDevice = false;
    
    // Loosened the rules: Now it ONLY triggers on extremely old devices (under 4GB RAM or under 4 cores)
    if (navigator.deviceMemory && navigator.deviceMemory < 4) isSlowDevice = true;
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) isSlowDevice = true;

    // AGENCY DIAGNOSTIC: Right-click your website, hit "Inspect", and click the "Console" tab to read this!
    console.log("Diagnostic - RAM:", navigator.deviceMemory, "GB");
    console.log("Diagnostic - CPU Cores:", navigator.hardwareConcurrency);
    console.log("Diagnostic - Animations Disabled?:", isSlowDevice);

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            disable: isSlowDevice 
        });
    } else {
        console.error("AOS Library failed to load.");
    }

    // ... (Keep the GLightbox and Contact Form code exactly as it is below this)

    // ==========================================
    // 2. GLIGHTBOX GALLERY SETUP
    // ==========================================
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            zoomable: false 
        });

        // Mobile back-button safety net
        lightbox.on('open', () => {
            window.history.pushState({ galleryOpen: true }, '', window.location.href);
        });

        window.addEventListener('popstate', () => {
            if (document.querySelector('.glightbox-container')) {
                lightbox.close();
            }
        });

        lightbox.on('close', () => {
            if (window.history.state && window.history.state.galleryOpen) {
                window.history.back();
            }
        });
    }

    // ==========================================
    // 3. CONTACT FORM & PHONE FORMATTING
    // ==========================================
    // SAFETY CHECK: Only run this if we are on a page that actually has the contact form!
    // This stops the script from crashing on the Home or Gallery pages.
    const contactForm = document.querySelector('form[action="https://api.web3forms.com/submit"]');

    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const phoneInput = contactForm.querySelector('input[name="phone"]');

        // Clean, real-time phone formatter: formats to (123) 456-7890 as you type
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            });
        }

        // Web3Forms API Submission
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            // Assuming the access key is already an <input type="hidden"> in your HTML, 
            // you don't need to append it again here.

            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Success! Your message has been sent.");
                    contactForm.reset();
                } else {
                    alert("Error: " + data.message);
                }

            } catch (error) {
                alert("Something went wrong. Please check your connection and try again.");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    // Add this inside the DOMContentLoaded function in /js/custom.js
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});
});