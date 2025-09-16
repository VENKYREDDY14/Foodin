

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('restaurant-search');
    const optionsContainer = document.getElementById('restaurant-options');
    const searchContainer = document.getElementById('restaurant-search-container');
    const options = document.querySelectorAll('.option');

    // Show the dropdown when the input is focused
    searchInput.addEventListener('focus', () => {
        optionsContainer.classList.add('show');
    });

    // 🔹 Hide the dropdown when input loses focus
    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            optionsContainer.classList.remove('show');
        }, 600); // small delay so option clicks still register
    });

    // Hide the dropdown when clicking outside of it
    document.addEventListener('click', (event) => {
        const isClickInside = searchContainer.contains(event.target);
        if (!isClickInside) {
            optionsContainer.classList.remove('show');
        }
    });

    // Handle option clicks
    options.forEach(option => {
        option.addEventListener('click', () => {
            searchInput.value = option.textContent;
            optionsContainer.classList.remove('show');
        });
    });

    // Implement a simple live search filter
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        options.forEach(option => {
            const text = option.textContent.toLowerCase();
            if (text.includes(filter)) {
                option.style.display = 'block';
            } else {
                option.style.display = 'none';
            }
        });
    });
  });
