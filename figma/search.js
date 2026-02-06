document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const clearButton = document.getElementById('clear-search');
    const searchIcon = document.getElementById('search-icon');
    const allItems = document.querySelectorAll('nav li');

    if (!searchInput || !clearButton || allItems.length === 0) {
        console.warn('Elementos de busca não encontrados.');
        return;
    }

    function removeAccents(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    function performSearch() {
        const query = removeAccents(searchInput.value.trim());

        if (searchInput.value.length > 0) {
            clearButton.classList.remove('hidden');
            searchIcon.classList.add('text-blue-500'); 
        } else {
            clearButton.classList.add('hidden');
            searchIcon.classList.remove('text-blue-500');
            searchIcon.classList.add('text-gray-400');
        }

        if (!query) {
            allItems.forEach(item => {
                item.style.display = '';
            });
            return;
        }

        allItems.forEach(item => {
            const text = removeAccents(item.textContent);
            const isMatch = text.includes(query);

            if (isMatch) {
                item.style.display = '';
                let current = item;
                while (current && current.tagName === 'LI') {
                    const checkbox = current.querySelector('input[type="checkbox"]');
                    if (checkbox) checkbox.checked = true;
                    current = current.parentElement?.closest('li');
                }
            } else {
                item.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', performSearch);

    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        performSearch();
        searchInput.focus(); 
    });

    searchInput.addEventListener('focus', performSearch);
});