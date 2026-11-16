



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





/* ========================================
   CATEGORY PAGE - FILTER SYSTEM
======================================== */

(() => {

    /* ------------------------------------
       1. FILTER DRAWER ELEMENTS
    ------------------------------------ */

    const filterDrawer = document.getElementById("category-filter");

    const openFilterButton = document.getElementById(
        "open-filter-drawer"
    );

    const closeFilterButton = document.getElementById(
        "close-filter-drawer"
    );

    const filterOverlay = document.getElementById(
        "filter-drawer-overlay"
    );

    const applyFilterButton = document.getElementById(
        "apply-category-filter"
    );


    if (!filterDrawer) return;


    /* ------------------------------------
       OPEN FILTER DRAWER
    ------------------------------------ */

    function openFilterDrawer() {

        filterDrawer.classList.add("is-open");

        filterOverlay?.classList.add("is-visible");

        document.body.classList.add("filter-drawer-open");

        filterDrawer.setAttribute("aria-hidden", "false");

        openFilterButton?.setAttribute("aria-expanded", "true");

        closeFilterButton?.focus();

    }


    /* ------------------------------------
       CLOSE FILTER DRAWER
    ------------------------------------ */

    function closeFilterDrawer() {

        filterDrawer.classList.remove("is-open");

        filterOverlay?.classList.remove("is-visible");

        document.body.classList.remove("filter-drawer-open");

        filterDrawer.setAttribute(
            "aria-hidden",
            window.innerWidth <= 768 ? "true" : "false"
        );

        openFilterButton?.setAttribute("aria-expanded", "false");

        if (window.innerWidth <= 768) {
            openFilterButton?.focus();
        }

    }


    /* ------------------------------------
       DRAWER EVENT LISTENERS
    ------------------------------------ */

    openFilterButton?.addEventListener(
        "click",
        openFilterDrawer
    );

    closeFilterButton?.addEventListener(
        "click",
        closeFilterDrawer
    );

    filterOverlay?.addEventListener(
        "click",
        closeFilterDrawer
    );


    // Close Drawer with Escape Key

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape" &&
            filterDrawer.classList.contains("is-open")) {

            closeFilterDrawer();

        }

    });


    // Close Drawer When Resizing to Desktop

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            filterDrawer.classList.remove("is-open");

            filterOverlay?.classList.remove("is-visible");

            document.body.classList.remove("filter-drawer-open");

            filterDrawer.setAttribute("aria-hidden", "false");

            openFilterButton?.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* ------------------------------------
       2. FILTER GROUP COLLAPSE / EXPAND
    ------------------------------------ */

    const filterGroupButtons = document.querySelectorAll(
        ".filter-group__header"
    );


    filterGroupButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const contentId = button.getAttribute("aria-controls");

            const content = document.getElementById(contentId);

            if (!content) return;

            const isExpanded =
                button.getAttribute("aria-expanded") === "true";

            button.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );

            content.hidden = isExpanded;

        });

    });


    /* ------------------------------------
       3. COLOR SELECTION
    ------------------------------------ */

    const filterColors = document.querySelectorAll(
        ".filter-color"
    );


    filterColors.forEach((color) => {

        color.addEventListener("click", () => {

            const isSelected = color.classList.contains("selected");

            color.classList.toggle("selected", !isSelected);

            color.setAttribute(
                "aria-pressed",
                String(!isSelected)
            );

        });

    });


    /* ------------------------------------
       4. SIZE SELECTION
    ------------------------------------ */

    const filterSizes = document.querySelectorAll(
        ".filter-size"
    );


    filterSizes.forEach((size) => {

        size.addEventListener("click", () => {

            const isSelected = size.classList.contains("selected");

            size.classList.toggle("selected", !isSelected);

            size.setAttribute(
                "aria-pressed",
                String(!isSelected)
            );

        });

    });


    /* ------------------------------------
       5. PRICE RANGE SLIDER
    ------------------------------------ */

    const minPriceInput = document.getElementById("price-min");

    const maxPriceInput = document.getElementById("price-max");

    const minPriceLabel = document.getElementById(
        "min-price-label"
    );

    const maxPriceLabel = document.getElementById(
        "max-price-label"
    );

    const priceRangeFill = document.getElementById(
        "price-range-fill"
    );


    function updatePriceRange(changedInput) {

        if (!minPriceInput || !maxPriceInput) return;

        const min = Number(minPriceInput.min);
        const max = Number(maxPriceInput.max);
        const step = Number(minPriceInput.step) || 1;

        let minValue = Number(minPriceInput.value);
        let maxValue = Number(maxPriceInput.value);


        // Prevent the two handles from crossing

        if (minValue >= maxValue) {

            if (changedInput === minPriceInput) {

                minValue = maxValue - step;
                minPriceInput.value = minValue;

            } else {

                maxValue = minValue + step;
                maxPriceInput.value = maxValue;

            }

        }


        // Calculate Range Position

        const totalRange = max - min;

        const leftPosition =
            ((minValue - min) / totalRange) * 100;

        const rightPosition =
            ((maxValue - min) / totalRange) * 100;


        // Update Active Track

        if (priceRangeFill) {

            priceRangeFill.style.left = `${leftPosition}%`;

            priceRangeFill.style.width =
                `${rightPosition - leftPosition}%`;

        }


        // Update Price Labels

        if (minPriceLabel) {
            minPriceLabel.textContent = `$${minValue}`;
        }

        if (maxPriceLabel) {
            maxPriceLabel.textContent = `$${maxValue}`;
        }

    }


    minPriceInput?.addEventListener("input", () => {
        updatePriceRange(minPriceInput);
    });

    maxPriceInput?.addEventListener("input", () => {
        updatePriceRange(maxPriceInput);
    });


    updatePriceRange();


    /* ------------------------------------
       6. APPLY FILTER
    ------------------------------------ */

    applyFilterButton?.addEventListener("click", () => {

        // Close the mobile drawer.
        // Actual product filtering will be connected
        // when the product grid and product data are added.

        closeFilterDrawer();

    });


})();




/* ========================================
CART PAGE FUNCTIONALITY
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Cart Element

    const cartItemsPanel = document.getElementById(
        "cart-items-panel"
    );

    const subtotalElement = document.getElementById(
        "cart-subtotal"
    );

    const discountElement = document.getElementById(
        "cart-discount"
    );

    const deliveryElement = document.getElementById(
        "cart-delivery"
    );

    const totalElement = document.getElementById(
        "cart-total"
    );

    const emptyCartMessage = document.getElementById(
        "cart-empty-message"
    );

    const checkoutButton = document.getElementById(
        "cart-checkout"
    );


    if (!cartItemsPanel) return;


    // Money Formater

    function formatMoney(amount) {

        return "$" + Math.round(amount).toLocaleString("en-US");

    }


    // Update Order Summary

    function updateCartSummary() {

        const cartItems = cartItemsPanel.querySelectorAll(
            "[data-cart-item]"
        );

        let subtotal = 0;


        cartItems.forEach((item) => {

            const price = Number(item.dataset.price);

            const quantityElement = item.querySelector(
                "[data-quantity-value]"
            );

            const quantity = Number(
                quantityElement.textContent
            );

            subtotal += price * quantity;

        });


        // Calculate Discount

        const discount = subtotal > 0
            ? Math.round(subtotal * 0.20)
            : 0;


        // Fixed Delivery Fee

        const deliveryFee = subtotal > 0 ? 15 : 0;


        // Calculate Total

        const total = subtotal - discount + deliveryFee;


        // Update UI

        subtotalElement.textContent = formatMoney(subtotal);

        discountElement.textContent = "-" + formatMoney(discount);

        deliveryElement.textContent = formatMoney(deliveryFee);

        totalElement.textContent = formatMoney(total);


        // Empty Cart State

        const isEmpty = cartItems.length === 0;

        emptyCartMessage.hidden = !isEmpty;

        checkoutButton.disabled = isEmpty;


        // Return Calculated Values

        return {
            subtotal,
            discount,
            deliveryFee,
            total
        };

    }


    // Quantity and Remove Functionality

    cartItemsPanel.addEventListener("click", (event) => {


        // Find Current Cart Item

        const cartItem = event.target.closest(
            "[data-cart-item]"
        );

        if (!cartItem) return;


        const quantityElement = cartItem.querySelector(
            "[data-quantity-value]"
        );


        // Increase Quantity

        if (event.target.closest("[data-quantity-plus]")) {

            let quantity = Number(
                quantityElement.textContent
            );

            quantity++;

            quantityElement.textContent = quantity;

            updateCartSummary();

        }


        // Decrease Quantity

        if (event.target.closest("[data-quantity-minus]")) {

            let quantity = Number(
                quantityElement.textContent
            );

            if (quantity > 1) {

                quantity--;

                quantityElement.textContent = quantity;

                updateCartSummary();

            }

        }


        // Remove Product

        if (event.target.closest("[data-remove-item]")) {

            cartItem.remove();

            updateCartSummary();

        }

    });


    // Fromo Code Form

    const promoForm = document.getElementById("promo-form");

    const promoInput = document.getElementById("promo-code");

    const promoMessage = document.getElementById("promo-message");


    function showPromoMessage(message, type) {

        promoMessage.textContent = message;

        promoMessage.hidden = false;

        promoMessage.classList.remove(
            "is-error",
            "is-success"
        );

        promoMessage.classList.add(type);

    }


    promoForm?.addEventListener("submit", (event) => {

        event.preventDefault();

        const promoCode = promoInput.value.trim();


        if (!promoCode) {

            showPromoMessage(
                "Please enter a promo code.",
                "is-error"
            );

            promoInput.focus();

            return;

        }


        /*
         * Promo code validation will be connected
         * when the actual promo code rules are defined.
         */

        showPromoMessage(
            "Promo code validation is not connected yet.",
            "is-error"
        );

    });


    // Clear promo feedback when typing

    promoInput?.addEventListener("input", () => {

        promoMessage.hidden = true;

    });


    // Checkout Navigation

    checkoutButton?.addEventListener("click", () => {

        if (checkoutButton.disabled) return;

        window.location.href = "checkout.html";

    });


    // Initial Cart Calculation

    updateCartSummary();

});
