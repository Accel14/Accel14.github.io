const products_path = 'Accel14.github.io/js/products.json';

function fetchProductsJSON(productId, categoryId = 0) {

    fetch(products_path)
        .then(response => {
            if (!response.ok) {
                throw new Error('Файл не найден');
            }
            console.log(products_path);
            return response.json();
        })
        .then(products => {
            return products[0][categoryId];
        })
}


