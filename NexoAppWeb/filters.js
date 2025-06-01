document.addEventListener('DOMContentLoaded', () => {
    const filterIcon = document.getElementById('filterIcon');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const closeSidebarIcon = document.getElementById('closeSidebarIcon');

    // Função para abrir a sidebar
    function openSidebar() {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    // Função para fechar a sidebar
    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = ''; 
    }

    // Evento de clique no ícone de filtro
    if (filterIcon) {
        filterIcon.addEventListener('click', openSidebar);
    }

    // Evento de clique no ícone "X" para fechar
    if (closeSidebarIcon) {
        closeSidebarIcon.addEventListener('click', closeSidebar);
    }

    // Evento de clique no overlay para fechar (clicar fora da sidebar)
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Opcional: Fechar sidebar ao clicar em um item de categoria (se for navegar)
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            console.log('Categoria clicada:', item.querySelector('.category-name').textContent);
            closeSidebar();
        });
    });
});