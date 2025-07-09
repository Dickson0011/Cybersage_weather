// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.getElementById('weatherWrapper');
    const leftBtn = document.querySelector('.left-arrow button');
    const rightBtn = document.querySelector('.right-arrow button');

    if (!wrapper || !leftBtn || !rightBtn) {
        console.error('Could not find required elements');
        return;
    }

    const items = wrapper.querySelectorAll('.carousel-item');
    const itemWidth = 400 + 32; // item width + gap
    let currentIndex = 0;

    console.log('Found', items.length, 'carousel items');

    // Function to update carousel position
    function updateCarousel() {
        const scrollLeft = currentIndex * itemWidth;
        wrapper.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });

        // Update button states
        leftBtn.disabled = currentIndex === 0;
        rightBtn.disabled = currentIndex === items.length - 1;

        // Add visual feedback for disabled buttons
        if (leftBtn.disabled) {
            leftBtn.style.opacity = '0.5';
            leftBtn.style.cursor = 'not-allowed';
        } else {
            leftBtn.style.opacity = '1';
            leftBtn.style.cursor = 'pointer';
        }

        if (rightBtn.disabled) {
            rightBtn.style.opacity = '0.5';
            rightBtn.style.cursor = 'not-allowed';
        } else {
            rightBtn.style.opacity = '1';
            rightBtn.style.cursor = 'pointer';
        }

        console.log('Updated carousel to index:', currentIndex);
    }

    // Left arrow click handler
    leftBtn.addEventListener('click', function () {
        console.log('Left button clicked, current index:', currentIndex);
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Right arrow click handler
    rightBtn.addEventListener('click', function () {
        console.log('Right button clicked, current index:', currentIndex);
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Initialize carousel
    updateCarousel();

    // Optional: Add keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Optional: Add touch/swipe support for mobile
    let startX = 0;
    let scrollLeft = 0;
    let isDown = false;

    wrapper.addEventListener('mousedown', function (e) {
        isDown = true;
        startX = e.pageX - wrapper.offsetLeft;
        scrollLeft = wrapper.scrollLeft;
        wrapper.style.cursor = 'grabbing';
    });

    wrapper.addEventListener('mouseleave', function () {
        isDown = false;
        wrapper.style.cursor = 'grab';
    });

    wrapper.addEventListener('mouseup', function () {
        isDown = false;
        wrapper.style.cursor = 'grab';

        // Snap to nearest item
        const newIndex = Math.round(wrapper.scrollLeft / itemWidth);
        if (newIndex !== currentIndex) {
            currentIndex = Math.max(0, Math.min(items.length - 1, newIndex));
            updateCarousel();
        }
    });

    wrapper.addEventListener('mousemove', function (e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 2;
        wrapper.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    wrapper.addEventListener('touchstart', function (e) {
        startX = e.touches[0].pageX - wrapper.offsetLeft;
        scrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener('touchmove', function (e) {
        if (!startX) return;
        const x = e.touches[0].pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 2;
        wrapper.scrollLeft = scrollLeft - walk;
    });

    wrapper.addEventListener('touchend', function () {
        // Snap to nearest item
        const newIndex = Math.round(wrapper.scrollLeft / itemWidth);
        if (newIndex !== currentIndex) {
            currentIndex = Math.max(0, Math.min(items.length - 1, newIndex));
            updateCarousel();
        }
        startX = 0;
    });

    // Handle search functionality
    const searchInput = document.getElementById('location-search');
    const ctaButton = document.querySelector('.cta-button');

    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const location = searchInput.value.trim();
                if (location) {
                    console.log('Searching for:', location);
                    // Here you would typically make an API call to get weather data
                    alert(`Searching for weather in: ${location}`);
                }
            }
        });
    }

    if (ctaButton) {
        ctaButton.addEventListener('click', function () {
            const location = searchInput?.value.trim() || 'current location';
            console.log('Check weather clicked for:', location);
            // Here you would typically trigger weather check functionality
            alert(`Checking weather for: ${location}`);
        });
    }

    // Handle newsletter subscription
    const subscribeBtn = document.querySelector('.footer-input button');
    const emailInput = document.getElementById('email-input');

    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const email = emailInput.value.trim();

            if (!email) {
                alert('Please enter your email address');
                return;
            }

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            console.log('Newsletter subscription for:', email);
            alert(`Thank you! You've been subscribed with email: ${email}`);
            emailInput.value = '';
        });

        emailInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                subscribeBtn.click();
            }
        });
    }

    // Add click handlers for top cities
    const cityElements = document.querySelectorAll('.city-content');
    cityElements.forEach(function (cityElement) {
        cityElement.addEventListener('click', function () {
            const cityName = cityElement.querySelector('p').textContent;
            console.log('City clicked:', cityName);
            alert(`Loading weather for ${cityName}...`);
        });

        // Add cursor pointer style
        cityElement.style.cursor = 'pointer';
    });

    console.log('Weather carousel initialization complete');
});