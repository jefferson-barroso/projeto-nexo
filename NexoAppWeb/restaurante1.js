document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.querySelector('.app-container');

    const bookmarkIconContainer = document.getElementById('bookmarkIcon');
    const bookmarkImg = document.getElementById('bookmarkImg');

    if (bookmarkIconContainer && bookmarkImg) {
        bookmarkIconContainer.addEventListener('click', () => {
            const isActive = bookmarkIconContainer.dataset.active === 'true';

            let toastText = "";
            let toastBgColor = "";

            if (isActive) {
                bookmarkImg.src = 'assets/icons8-bookmark-30.png';
                bookmarkIconContainer.dataset.active = 'false';
                toastText = "Restaurante removido dos 'Salvos'!";
                toastBgColor = "#FF5252";
            } else {
                bookmarkImg.src = 'assets/icons8-bookmark-30 (1).png';
                bookmarkIconContainer.dataset.active = 'true';
                toastText = "Restaurante Salvo!";
                toastBgColor = "#AF52DE";
            }

            Toastify({
                text: toastText,
                duration: 2000,
                gravity: "top",
                position: "left",
                offset: {
                    x: 120,
                    y: 100
                },
                backgroundColor: toastBgColor,
                stopOnFocus: true,
                selector: appContainer,
                style: {
                    borderRadius: "10px",
                    padding: "12px 20px",
                    fontSize: "15px",
                    fontFamily: "'Montserrat', sans-serif",
                    position: "absolute",
                    zIndex: "9999",
                    width: "fit-content",
                    maxWidth: "80%"
                }
            }).showToast();
        });
    }

    const leaveReviewText = document.getElementById('leaveReviewText');
    const reviewFormContainer = document.getElementById('reviewFormContainer');
    const ratingStarsInput = document.getElementById('ratingStarsInput');
    const starInputs = ratingStarsInput ? ratingStarsInput.querySelectorAll('.star-input') : [];
    const reviewTextarea = document.getElementById('reviewTextarea');
    const submitReviewBtn = document.getElementById('submitReviewBtn');

    let currentRating = 0;

    if (leaveReviewText && reviewFormContainer) {
        leaveReviewText.addEventListener('click', () => {
            reviewFormContainer.classList.toggle('active');
            if (reviewFormContainer.classList.contains('active')) {
                reviewFormContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    if (ratingStarsInput) {
        starInputs.forEach(star => {
            star.addEventListener('mouseover', () => {
                const value = parseInt(star.dataset.value);
                starInputs.forEach((s, i) => {
                    if (i < value) {
                        s.classList.add('filled');
                    } else {
                        s.classList.remove('filled');
                    }
                });
            });

            star.addEventListener('mouseout', () => {
                starInputs.forEach((s, i) => {
                    if (i < currentRating) {
                        s.classList.add('filled');
                    } else {
                        s.classList.remove('filled');
                    }
                });
            });

            star.addEventListener('click', () => {
                currentRating = parseInt(star.dataset.value);
                starInputs.forEach((s, i) => {
                    if (i < currentRating) {
                        s.classList.add('filled');
                    } else {
                        s.classList.remove('filled');
                    }
                });
            });
        });
    }

    if (submitReviewBtn) {
        submitReviewBtn.addEventListener('click', () => {
            const reviewText = reviewTextarea.value.trim();
            
            if (currentRating === 0) {
                alert('Por favor, selecione uma avaliação em estrelas!');
                return;
            }
            if (reviewText === '') {
                alert('Por favor, escreva sua avaliação!');
                return;
            }

            Toastify({
                text: "Avaliação enviada com sucesso!",
                duration: 2000,
                gravity: "top",
                position: "left", 
                offset: {
                    x: 10,
                    y: 10
                },
                backgroundColor: "#4CAF50",
                stopOnFocus: true,
                selector: appContainer,
                style: {
                    borderRadius: "10px",
                    padding: "12px 20px",
                    fontSize: "15px",
                    fontFamily: "'Montserrat', sans-serif",
                    position: "absolute",
                    zIndex: "9999",
                    width: "fit-content",
                    maxWidth: "80%"
                }
            }).showToast();

            currentRating = 0;
            starInputs.forEach(s => s.classList.remove('filled'));
            reviewTextarea.value = '';
            reviewFormContainer.classList.remove('active');
        });
    }
});