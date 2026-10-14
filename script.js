document.addEventListener("DOMContentLoaded", () => {
    // ========================================
    // 1. MENU NAVIGASI MOBILE
    // =======================================
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
            );

            // Ganti ikon hamburger menjadi X jika memakai Font Awesome
            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            } else {
                menuToggle.textContent = isOpen ? "✕" : "☰";
            }
        });

        // Tutup menu setelah tautan navigasi diklik
        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Buka menu navigasi");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                } else {
                    menuToggle.textContent = "☰";
                }
            });
        });

        // Tutup menu dengan tombol Escape
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                navMenu.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Buka menu navigasi");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                } else {
                    menuToggle.textContent = "☰";
                }
            }
        });
    }

    // ========================================
    // 2. TAHUN OTOMATIS DI FOOTER
    // ========================================
    const yearElements = document.querySelectorAll(
        "#year, #year4, #currentYear"
    );

    yearElements.forEach((element) => {
        element.textContent = new Date().getFullYear();
    });

    // ========================================
    // 3. EFEK HEADER SAAT SCROLL
    // ========================================
    const header = document.querySelector(".header");

    const updateHeader = () => {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 20);
        }
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    // ========================================
    // 4. ANIMASI ELEMEN SAAT MASUK LAYAR
    // ========================================
    const animatedElements = document.querySelectorAll(
        ".project-card, .skill-category, .cert-card, " +
        ".certificate-card, .experience-card, .gallery-item"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        animatedElements.forEach((element) => {
            element.classList.add("reveal-on-scroll");
            observer.observe(element);
        });
    } else {
        // Fallback untuk browser yang tidak mendukung observer
        animatedElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }

    // ========================================
    // 5. TAHUN PADA COPYRIGHT
    // ========================================
    const copyrightYear = document.querySelector("[data-current-year]");

    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    console.log("R-AlfariziNet: JavaScript berhasil dimuat.");
});
