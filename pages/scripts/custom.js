// /js/custom.js

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. AOS ANIMATION WITH HORSEPOWER CHECK
    // ==========================================
    let isSlowDevice = false;
    if (navigator.deviceMemory && navigator.deviceMemory < 4) isSlowDevice = true;
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) isSlowDevice = true;

    // AGENCY DIAGNOSTIC: Uncomment these lines to test device speeds in the console
    // console.log("Diagnostic - RAM:", navigator.deviceMemory, "GB");
    // console.log("Diagnostic - CPU Cores:", navigator.hardwareConcurrency);
    // console.log("Diagnostic - Animations Disabled?:", isSlowDevice);

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            disable: isSlowDevice 
        });
    }

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
    const contactForm = document.querySelector('form[action="https://api.web3forms.com/submit"]');

    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const phoneInput = contactForm.querySelector('input[name="phone"]');

        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            });
        }

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            // THIS IS WHERE THE MAGIC HAPPENS: We inject the key here
            formData.append("access_key", "2b629606-5c17-495b-9e49-895fcdf4ef35");

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

    // ==========================================
    // 4. NAVBAR SCROLL EFFECT
    // ==========================================
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.navbar');
        if (nav) {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });
});