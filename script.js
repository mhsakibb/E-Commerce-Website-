



// Testimonial Carousel

const testimonialTrack = document.querySelector(
    ".testimonials__track"
);

const testimonialPrev = document.querySelector(
    ".testimonials__arrow--prev"
);

const testimonialNext = document.querySelector(
    ".testimonials__arrow--next"
);


if (testimonialTrack && testimonialPrev && testimonialNext) {

    // Update arrow states according to scroll position
    function updateTestimonialArrows() {

        const maxScroll =
            testimonialTrack.scrollWidth -
            testimonialTrack.clientWidth;

        testimonialPrev.disabled =
            testimonialTrack.scrollLeft <= 2;

        testimonialNext.disabled =
            testimonialTrack.scrollLeft >= maxScroll - 2;
    }


    // Calculate one card's width including the gap
    function getTestimonialScrollAmount() {

        const firstCard = testimonialTrack.querySelector(
            ".testimonial-card"
        );

        if (!firstCard) return testimonialTrack.clientWidth;

        const cardWidth = firstCard.getBoundingClientRect().width;

        const trackStyles = getComputedStyle(testimonialTrack);

        const gap = parseFloat(trackStyles.columnGap) || 0;

        return cardWidth + gap;
    }


    // Previous review
    testimonialPrev.addEventListener("click", function () {

        testimonialTrack.scrollBy({
            left: -getTestimonialScrollAmount(),
            behavior: "smooth"
        });

    });


    // Next review
    testimonialNext.addEventListener("click", function () {

        testimonialTrack.scrollBy({
            left: getTestimonialScrollAmount(),
            behavior: "smooth"
        });

    });


    // Update buttons after scrolling
    testimonialTrack.addEventListener(
        "scroll",
        updateTestimonialArrows,
        { passive: true }
    );


    // Recalculate after screen resizing
    window.addEventListener("resize", updateTestimonialArrows);


    // Initial arrow state
    updateTestimonialArrows();

}



// Product Detail

(() => {

    // Product Image galary

    const mainProductImage = document.getElementById(
        "main-product-image"
    );

    const productThumbnails = document.querySelectorAll(
        ".product-gallery__thumbnail"
    );


    productThumbnails.forEach((thumbnail) => {

        thumbnail.addEventListener("click", () => {

            const newImage = thumbnail.dataset.image;
            const thumbnailImage = thumbnail.querySelector("img");

            if (!mainProductImage || !newImage) return;

            // Change Main Image
            mainProductImage.src = newImage;

            // Update Alt Text
            mainProductImage.alt = thumbnailImage
                ? thumbnailImage.alt
                : "Product image";

            // Update Selected Thumbnail
            productThumbnails.forEach((item) => {

                item.classList.remove("active");
                item.setAttribute("aria-pressed", "false");

            });

            thumbnail.classList.add("active");
            thumbnail.setAttribute("aria-pressed", "true");

        });

    });


    // Product Color Selection

    const productColors = document.querySelectorAll(
        ".product-color"
    );


    productColors.forEach((color) => {

        color.addEventListener("click", () => {

            productColors.forEach((item) => {

                item.classList.remove("selected");
                item.setAttribute("aria-pressed", "false");

            });

            color.classList.add("selected");
            color.setAttribute("aria-pressed", "true");

        });

    });


    // Product Size Selection

    const productSizes = document.querySelectorAll(
        ".product-size"
    );


    productSizes.forEach((size) => {

        size.addEventListener("click", () => {

            productSizes.forEach((item) => {

                item.classList.remove("selected");
                item.setAttribute("aria-pressed", "false");

            });

            size.classList.add("selected");
            size.setAttribute("aria-pressed", "true");

        });

    });


    // Product Quantity

    const quantityValue = document.getElementById(
        "product-quantity"
    );

    const quantityMinus = document.getElementById(
        "quantity-minus"
    );

    const quantityPlus = document.getElementById(
        "quantity-plus"
    );


    if (quantityValue && quantityMinus && quantityPlus) {

        let quantity = 1;

        // Decrease Quantity
        quantityMinus.addEventListener("click", () => {

            if (quantity > 1) {
                quantity--;
                quantityValue.textContent = quantity;
            }

        });


        // Increase Quantity
        quantityPlus.addEventListener("click", () => {

            quantity++;
            quantityValue.textContent = quantity;

        });

    }

})();
