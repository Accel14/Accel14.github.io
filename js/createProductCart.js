
function createProductCard(product, cart, categoryId) {
  console.log(categoryId);
  const el = document.createElement('div');
  el.classList.add('product-card');
  const grammOrMass = categoryId == 3 ? 'л.' : 'гр.' ;
  
  el.innerHTML = `
    <div class="product-image-wrapper" style="background-image: url('img/paper.png')">
      <img src="food/${product.image_path}" class="food-image" alt="${product.name}">
    </div>
    <div class="product-info">
      <h3>${product.name}</h3>
      <div class="food-info">
        <p>${product.mass} ${grammOrMass}</p>
        <strong>${product.price} руб.</strong>
      </div>
      <a href="#" class="button from-cart-btn" data-id="${product.id}">
        Убрать из корзины
      </a>
      <div>
        <a href="#" class="button to-cart-btn" data-id="${product.id}"
        style="position: relative;">
          В корзину
          <div id="product-count-${product.id}" class="product-count">
            ${cart[product.id] || ''}
          </div>
        </a>
      </div>
    </div>
  `;

  return el;
}

function updateProductCount(productId, categoryId) {
  const cart = getCart(categoryId);
  const count = cart[productId] || '';
  const el = document.getElementById(`product-count-${productId}`);
  if (count === '0' || count === '') { el.style.display = 'none'; } else { el.style.display = 'inline'; }
  if (el) {
    el.textContent = count;
  }
}   
