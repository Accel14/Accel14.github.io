document.querySelectorAll('.location-card').forEach(location => {
    let map = location.querySelector('.location-map');
    let img = location.querySelector('.location-img');
    let close = location.querySelector('.close-map');
    img.addEventListener('click', () => {
        img.style.display = 'none';
        map.style.display = 'block';
    });
    close.addEventListener('click', () => {
        img.style.display = 'inline';
        map.style.display = 'none';
    })
});