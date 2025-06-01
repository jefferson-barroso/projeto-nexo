

document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DO BOOKMARK ---
    const bookmarkIconContainer = document.getElementById('bookmarkIcon');
    const bookmarkImg = document.getElementById('bookmarkImg');

    if (bookmarkIconContainer && bookmarkImg) {
        bookmarkIconContainer.addEventListener('click', () => {
            const isActive = bookmarkIconContainer.dataset.active === 'true';

            if (isActive) {
                bookmarkImg.src = 'assets/icons8-bookmark-30.png'; // Caminho para a imagem "vazia"
                bookmarkIconContainer.dataset.active = 'false';
                console.log('Restaurante removido dos favoritos!');
            } else {
                bookmarkImg.src = 'assets/icons8-bookmark-30 (1).png'; // Caminho para a imagem "roxinha"
                bookmarkIconContainer.dataset.active = 'true';
                console.log('Restaurante adicionado aos favoritos!');
            }
        });

        // Opcional: Carregar o estado inicial do bookmark (se salvo anteriormente)
        // Lembre-se que 'icons8-bookmark-30 (1).png' é o roxinho e 'icons8-bookmark-30.png' é o vazio
        // if (localStorage.getItem('restaurante_domjuju_favorito') === 'true') {
        //     bookmarkImg.src = 'assets/icons8-bookmark-30 (1).png';
        //     bookmarkIconContainer.dataset.active = 'true';
        // }
    }

    // --- LÓGICA DA AVALIAÇÃO ---
    const leaveReviewText = document.getElementById('leaveReviewText');
    const reviewFormContainer = document.getElementById('reviewFormContainer');
    const ratingStarsInput = document.getElementById('ratingStarsInput');
    const starInputs = ratingStarsInput ? ratingStarsInput.querySelectorAll('.star-input') : [];
    const reviewTextarea = document.getElementById('reviewTextarea');
    const submitReviewBtn = document.getElementById('submitReviewBtn');

    let currentRating = 0; 
    // Mostrar/Ocultar o formulário de avaliação
    if (leaveReviewText && reviewFormContainer) {
        leaveReviewText.addEventListener('click', () => {
            reviewFormContainer.classList.toggle('active'); // Alterna a visibilidade
            // Opcional: Se o formulário for aberto, rolar para ele
            if (reviewFormContainer.classList.contains('active')) {
                reviewFormContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    // Funcionalidade de preenchimento das estrelas
    if (ratingStarsInput) {
        starInputs.forEach(star => {
            // Ao passar o mouse sobre a estrela
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

            // Ao tirar o mouse (resetar para a avaliação atual)
            star.addEventListener('mouseout', () => {
                starInputs.forEach((s, i) => {
                    if (i < currentRating) {
                        s.classList.add('filled');
                    } else {
                        s.classList.remove('filled');
                    }
                });
            });

            // Ao clicar na estrela (definir a avaliação)
            star.addEventListener('click', () => {
                currentRating = parseInt(star.dataset.value);
                // Preenche as estrelas permanentemente com a avaliação clicada
                starInputs.forEach((s, i) => {
                    if (i < currentRating) {
                        s.classList.add('filled');
                    } else {
                        s.classList.remove('filled');
                    }
                });
                console.log('Avaliação selecionada:', currentRating);
            });
        });
    }

    //  Enviar a avaliação
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

            // Simulação de envio
            console.log('--- Nova Avaliação Enviada ---');
            console.log('Nota:', currentRating);
            console.log('Comentário:', reviewText);
            alert('Sua avaliação foi enviada com sucesso!');

            //Resetar o formulário
            currentRating = 0;
            starInputs.forEach(s => s.classList.remove('filled'));
            reviewTextarea.value = '';
            reviewFormContainer.classList.remove('active'); // Oculta o formulário novamente
        });
    }
});