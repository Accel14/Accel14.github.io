function getCart(categoryId = 1) {
  return JSON.parse(localStorage.getItem(`${categoryId}`)) || {};
}

function setCart(cart, categoryId = 1) {
  localStorage.setItem(`${categoryId}`, JSON.stringify(cart));
}

function addToCart(productId, categoryId = 1) {
  
  const cart = getCart(categoryId);
  cart[productId] = (cart[productId] || 0) + 1;
  console.log(cart);
  console.log(categoryId);
  setCart(cart, categoryId);
}

function removeFromCart(productId, categoryId = 1) {
  const cart = getCart(categoryId);

  if (cart[productId]) {
    cart[productId]--;
    if (cart[productId] < 1) {
      delete cart[productId];
    }
    setCart(cart, categoryId);
  }
}