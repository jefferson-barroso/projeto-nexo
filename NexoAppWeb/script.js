document.addEventListener('DOMContentLoaded', () => {
    const allCarouselIndicators = document.querySelectorAll('.carousel-indicators');

    allCarouselIndicators.forEach(indicatorsContainer => {
        const carouselId = indicatorsContainer.dataset.carouselId;
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;

        const carouselItems = Array.from(carousel.querySelectorAll('.carousel-item'));
        const indicators = Array.from(indicatorsContainer.querySelectorAll('.indicator'));

        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const targetIndex = parseInt(indicator.dataset.index);
                const itemWidth = carouselItems[0].offsetWidth + (parseFloat(getComputedStyle(carouselItems[0]).marginLeft) * 2);
                carousel.scrollTo({
                    left: targetIndex * itemWidth,
                    behavior: 'smooth'
                });

                indicators.forEach(ind => ind.classList.remove('active'));
                indicator.classList.add('active');
            });
        });

        carousel.addEventListener('scroll', () => {
            const scrollLeft = carousel.scrollLeft;
            const itemWidth = carouselItems[0].offsetWidth + (parseFloat(getComputedStyle(carouselItems[0]).marginLeft) * 2);
            
            const currentIndex = Math.round(scrollLeft / itemWidth);

            indicators.forEach((ind, i) => {
                if (i === currentIndex) {
                    ind.classList.add('active');
                } else {
                    ind.classList.remove('active');
                }
            });
        });
    });
});