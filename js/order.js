document.addEventListener('DOMContentLoaded', () => {
  loadCart();
});

function removeFromCartOrder(productId, categoryId) {
  removeFromCart(productId, categoryId);

  loadCart();
}

function loadCart() {
  let totalCost = 0;
  let totalMass = 0;
  let totalCount = 0;
  let totalVolume = 0;

  let cart = getCart();
  if (Object.keys(cart).length > 0) {
    document.getElementById('empty-cart')?.remove();
  }

  const container = document.getElementById('order-list');
  container.innerHTML = '';

  let categoryId = 1;

  fetch('js/products.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Файл не найден');
      }
      return response.json();
    })

    .then(res => {
      return res[0];
    })

    .then(categories => {

      while (categoryId < 4) {
        cart = getCart(categoryId);
        let current = categories[categoryId];

        current.forEach(product => {
          const count = cart[product.id];
          if (cart[product.id]) {
            const totals = renderCartItem(product, count, categoryId);
            totalCost += totals.cost;
            if (categoryId === 3) {totalVolume += totals.mass;} else {totalMass += totals.mass;}
            totalCount += totals.count;
          }
        })
        categoryId++;
      }
      let grammAndMass = {totalMass, totalVolume};
      renderCartTotal(totalCost, grammAndMass, totalCount);

    })


}


function renderCartItem(product, count, categoryId) {
  console.log(categoryId);
  const container = document.getElementById('order-list');

  const el = document.createElement('div');
  el.classList.add('order');
  el.id = "order_" + product.id;

  const grammOrMass = categoryId == 3 ? 'л.' : 'гр.' ;
  let mql = window.matchMedia("(max-width: 768px)");
  if (mql.matches) {
    el.innerHTML = `
  <div class="order-img-container">
    <img src="food/${product.image_path}" class="food-image" alt="${product.name}">
  </div>
  <div class="product-details">
  
    <h3>${product.name}</h3>

    <div class="info-row">
      <div style="min-width: 60px">
        <p>${product.mass} ${grammOrMass}</p>
      </div>
      <div class="count">
        <p id="count_${product.id}">${count} шт.</p>
        <img class="remove-icon" alt="Удалить" src="img/remove.png">
      </div>
      <strong>${product.price * count} руб.</strong>
    </div>

  </div>
  `;
  } else {
    el.innerHTML = `
  <div class="order-img-container">
    <img src="food/${product.image_path}" class="food-image" alt="${product.name}">
  </div>
  <h3>${product.name}</h3>
  <p>${product.mass} ${grammOrMass}</p>
  <div class="count">
    <p id="count_${product.id}">${count} шт.</p>
    <img class="remove-icon" alt="Удалить" src="img/remove.png">
  </div>
  <strong>${product.price * count} руб.</strong> 
  `;
  }


  el.querySelector('.remove-icon').addEventListener('click', () => removeFromCartOrder(product.id, categoryId));
  container.appendChild(el);

  return {
    cost: parseFloat(product.price) * count,
    mass: parseFloat(product.mass) * count,
    count: count
  };
}



function renderCartTotal(totalCost, grammAndMass, totalCount) {
  const container = document.getElementById('order-list');

  const total = document.createElement('div');
  total.classList.add('order');
  total.id = 'total-order';
  total.style.backgroundColor = 'rgb(41, 32, 18)';
  total.style.borderRadius = '10px';
  let litres = grammAndMass.totalVolume > 0 ? ', ' + grammAndMass.totalVolume + " л." : '' ;
  let mql = window.matchMedia("(max-width: 768px)");
  if (mql.matches) {
    total.innerHTML = `
    <div style="width: 60px;"></div>
    <div class="product-details">
  
    <h3>Итого</h3>

    <div class="info-row">
        <p>${grammAndMass.totalMass} гр. ${litres}</p>
      <div class="count">
        <p>${totalCount} шт.</p>
        <img class="remove-icon" alt="Удалить" src="img/remove.png">
      </div>
      <strong>${totalCost} руб.</strong>
    </div>

  </div>
  `;
  } else {
    total.innerHTML = `
    <div></div>
    <h3 style="font-size: 24px;">Итого</h3>
    <p  style="font-size: 18px;" id="total-mass">${grammAndMass.totalMass} гр. ${litres}</p>
    <div class="count">
      <p style="font-size: 24px;" id="total-products">${totalCount} шт.</p>
    </div>
    <strong style="font-size: 22px;" id="total-price">${totalCost} руб.</strong>
  `;
  }
  
  container.appendChild(total);
}