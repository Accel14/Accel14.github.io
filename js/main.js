document.getElementById('menuToggle').addEventListener('click', function () {
    const menu = document.getElementById('menu');
    menu.classList.toggle('open');
    
    let menu_img = document.getElementById('menuToggle');
    let path = new URL(menu_img.src).pathname;

    if (path == "img/menu.png") {
        menu_img.src = "img/menu_close.png";
    } else {
        menu_img.src = "img/menu.png";
    }
});

// const clearCart = document.createElement('button');
// clearCart.innerHTML = "Clear Cart";
// clearCart.addEventListener('click', () => {
//     localStorage.clear();
// });

// document.getElementById('menu').appendChild(clearCart);