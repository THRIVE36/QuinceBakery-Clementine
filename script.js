
document.addEventListener("DOMContentLoaded", () => {
    // MOBILE NAVIGATION
    const menuToggle = document.querySelector("#menuToggle");
    const navigation = document.querySelector("#navigation");

    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("active");

            menuToggle.classList.toggle("open", isOpen);
            menuToggle.setAttribute("aria-expanded", isOpen);
            document.body.classList.toggle("menu-open", isOpen);
        });

        navigation.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navigation.classList.remove("active");
                menuToggle.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
            });
        });
    }

    // NAVBAR SCROLL EFFECT
    const navbar = document.querySelector(".navbar");

    function updateNavbar() {
        if (navbar) {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
        }
    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();

    // SCROLL REVEAL ANIMATIONS
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    // HERO IMAGE PARALLAX
    const heroImage = document.querySelector(".hero-image");

    function updateHero() {
        if (!heroImage || window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches) return;

        const movement = Math.min(window.scrollY * 0.15, 60);
        heroImage.style.transform = `translate3d(0, ${movement}px, 0)`;
    }

    window.addEventListener("scroll", updateHero, {
        passive: true
    });

    // IMAGE LIGHTBOX
    const galleryImages = document.querySelectorAll(
        ".gallery img, .product-card img"
    );

    galleryImages.forEach(image => {
        image.style.cursor = "zoom-in";

        image.addEventListener("click", () => {
            const lightbox = document.querySelector("#lightbox");
            const lightboxImage = document.querySelector("#lightboxImage");

            if (!lightbox || !lightboxImage) return;

            lightboxImage.src = image.currentSrc || image.src;
            lightboxImage.alt = image.alt;
            lightbox.classList.add("active");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.classList.add("lightbox-open");
        });
    });

    const lightbox = document.querySelector("#lightbox");
    const closeLightbox = document.querySelector("#closeLightbox");

    function hideLightbox() {
        if (!lightbox) return;

        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-open");
    }

    closeLightbox?.addEventListener("click", hideLightbox);

    lightbox?.addEventListener("click", event => {
        if (event.target === lightbox) hideLightbox();
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") hideLightbox();
    });

    // BACK TO TOP
    const backToTop = document.querySelector("#backToTop");

    function updateBackToTop() {
        backToTop?.classList.toggle("show", window.scrollY > 500);
    }

    window.addEventListener("scroll", updateBackToTop, {
        passive: true
    });

    updateBackToTop();

    backToTop?.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // NEWSLETTER VALIDATION
    const newsletterForm = document.querySelector("#newsletterForm");
    const newsletterMessage = document.querySelector(
        "#newsletterMessage"
    );

    newsletterForm?.addEventListener("submit", event => {
        event.preventDefault();

        const email = newsletterForm.querySelector(
            'input[type="email"]'
        );

        if (!email || !email.checkValidity()) {
            newsletterMessage.textContent =
                "Please enter a valid email address.";
            return;
        }

        newsletterMessage.textContent =
            "Thank you! Newsletter registration needs to be connected to a mailing service.";

        // No false subscription confirmation:
        // Connect a real newsletter API before saving subscribers.
    });

    // CURRENT YEAR
    const year = document.querySelector("#currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});
