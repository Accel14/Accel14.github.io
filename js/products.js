document.addEventListener('DOMContentLoaded', () => {
  const categoryCards = document.getElementById('category-cards');
  const categoryButtons = document.getElementById('category-buttons');
  const productList = document.getElementById('product-list');


  // При клике на большие баннеры
  document.querySelectorAll('.category-banner').forEach(card => {
    card.addEventListener('click', () => {
      const categoryId = card.dataset.id;
      categoryCards.style.display = 'none';
      categoryButtons.style.display = 'flex';
      document.getElementById('product-tools').style.display = 'inline-flex';
      loadProducts(categoryId);
    });
  });


});

let currentCategory = null;

function toggleDropdown() {
  const dropdown = document.getElementById("myDropdown");
  dropdown.classList.toggle("show");

  // Закрытие при клике вне dropdown
  if (dropdown.classList.contains("show")) {
    document.addEventListener('click', closeDropdownOutside, true);
  } else {
    document.removeEventListener('click', closeDropdownOutside, true);
  }
}

function closeDropdownOutside(event) {
  const dropdown = document.getElementById("myDropdown");
  const dropbtn = document.querySelector(".dropbtn");

  if (!dropdown.contains(event.target) && !dropbtn.contains(event.target)) {
    dropdown.classList.remove("show");
    document.removeEventListener('click', closeDropdownOutside, true);
  }
}

// Обработчики для пунктов меню
document.querySelectorAll('#myDropdown a').forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    const [sortBy, order] = this.getAttribute('value').split('-');
    loadProducts(currentCategory, sortBy, order);
    document.getElementById('myDropdown').classList.remove('show');
  });
});

function sortCategory(data, categoryId, sortBy, order = 'asc') {
  const products = data[0][categoryId];
  if (!products) return [];

  return [...products].sort((a, b) => {
    // Получаем значения для сравнения
    const valA = a[sortBy];
    const valB = b[sortBy];

    // Проверяем, является ли значение числом (даже в строке)
    const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

    // Если оба значения числовые, сравниваем как числа
    if (isNumeric(valA) && isNumeric(valB)) {
      const numA = parseFloat(valA);
      const numB = parseFloat(valB);
      return order === 'asc' ? numA - numB : numB - numA;
    }
    // Иначе сравниваем как строки
    else {
      return order === 'asc' 
        ? String(valA).localeCompare(String(valB), 'ru') 
        : String(valB).localeCompare(String(valA), 'ru');
    }
  });
}


// Загрузка продуктов
function loadProducts(categoryId, sortBy = 'name', _order = 'asc') {
  const cart = getCart(categoryId); // Получить localStorage с количеством продуктов в корзине
  window.scrollTo(0, 0); // Вернуться на начало страницы
  currentCategory = categoryId;

  const sortby = sortBy || 'name';
  const order = _order === 'desc' ? 'desc' : 'asc';

  const allowedFields = ['name', 'mass', 'price'];
  if (!allowedFields.includes(sortby)) {
    return res.status(400).json({ error: 'Неизвестный параметр сортировки' });
  }

  fetch('js/products.json')  // Путь относительно текущей страницы
    .then(response => {
      if (!response.ok) {
        throw new Error('Файл не найден');
      }
      return response.json();
    })

    .then(products => {
      const container = document.getElementById('product-list');
      container.innerHTML = '';
      //const myProducts = products["0"][categoryId];
      //const sortedByPrice = [...myProducts].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      const sorted = sortCategory(products, categoryId, sortBy, order);
  
      //const sortedByMassDesc = [...myProducts].sort((a, b) => parseFloat(b.mass) - parseFloat(a.mass));
      sorted.forEach(product => {
        const el = createProductCard(product, cart, categoryId);
        container.appendChild(el);
        if (!cart[product.id]) {
          document.getElementById
            ('product-count-' + product.id)
            .style
            .display = 'none';
        };
      });

      // Добавление обработчиков для кнопок удаления и добавления продуктов в корзину
      document.querySelectorAll('.to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const productId = parseInt(btn.dataset.id);
          addToCart(productId, categoryId);
          updateProductCount(productId, categoryId);
        });
      });

      document.querySelectorAll('.from-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const productId = parseInt(btn.dataset.id);
          removeFromCart(productId, categoryId);
          updateProductCount(productId, categoryId);
        });
      });
    })
    .catch(error => {
      console.error('Ошибка загрузки файла:', error);
    });

}


