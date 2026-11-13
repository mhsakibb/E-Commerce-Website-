



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