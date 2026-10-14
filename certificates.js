/*
 * R-AlfariziNet — Certificate Image Preview
 * File: js/certificates.js
 */

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(
        ".certification-section, .certificates-section"
    );

    // Hentikan jika halaman tidak memiliki bagian sertifikat.
    if (!section) return;

    // Mencegah modal dibuat lebih dari satu kali.
    if (document.querySelector(".certificate-modal")) return;

    // Membuat modal untuk menampilkan sertifikat.
    const modal = document.createElement("div");
    modal.className = "certificate-modal";
    modal.hidden = true;

    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Pratinjau sertifikat");

    const preview = document.createElement("img");
    preview.alt = "Pratinjau sertifikat";

    const closeButton = document.createElement("button");
    closeButton.className = "certificate-modal-close";
    closeButton.type = "button";
    closeButton.textContent = "×";
    closeButton.setAttribute("aria-label", "Tutup pratinjau");

    modal.append(preview, closeButton);
    document.body.appendChild(modal);

    let previousFocus = null;

    // Membuka pratinjau sertifikat.
    function openPreview(image) {
        previousFocus = document.activeElement;

        preview.src = image.currentSrc || image.src;
        preview.alt = image.alt || "Pratinjau sertifikat";

        modal.hidden = false;
        document.body.style.overflow = "hidden";
        closeButton.focus();
    }

    // Menutup pratinjau sertifikat.
    function closePreview() {
        modal.hidden = true;
        preview.removeAttribute("src");
        document.body.style.overflow = "";

        if (previousFocus) {
            previousFocus.focus();
        }
    }

    // Klik gambar sertifikat untuk memperbesar.
    section.addEventListener("click", (event) => {
        const image = event.target.closest(
            ".certificate-image img, " +
            ".cert-image img, " +
            "img.cert-image, " +
            ".featured-image img"
        );

        if (!image || !section.contains(image)) return;

        openPreview(image);
    });

    // Tombol silang untuk menutup.
    closeButton.addEventListener("click", closePreview);

    // Klik area gelap di luar gambar untuk menutup.
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closePreview();
        }
    });

    // Tombol Escape untuk menutup.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.hidden) {
            closePreview();
        }
    });
});
