ymaps.ready(init);

function init() {
    const map = new ymaps.Map("map", {
        center: [45.035470, 38.975313], // Центр Краснодар
        zoom: 10,
        controls: ['zoomControl']
    });

    const apartments = [
        {
            coords: [45.024583, 39.051810],
            type: 'new',
            price: 9500000,
            title: 'ЖК "Патрики"',
        },
        {
            coords: [45.023495, 39.051867],
            type: 'used',
            price: 7200000,
            title: 'Патрики',
        },
        {
            coords: [45.023851, 39.051867],
            type: 'new',
            price: 12000000,
            title: 'ЖК "Патрики"',
        },
        {
            coords: [45.021571, 39.008928],
            type: 'used',
            price: 12000000,
            title: 'ЖК "Патрики"',
        }
    ];

    const markers = [];

    apartments.forEach((apt) => {
        const placemark = new ymaps.Placemark(apt.coords, {
            balloonContent: `<strong>${apt.title}</strong><br>Цена: ${apt.price.toLocaleString()}₽`
        });
        placemark.properties.set('type', apt.type);
        placemark.properties.set('price', apt.price);
        map.geoObjects.add(placemark);
        markers.push(placemark);
    });

    // Фильтрация
    const typeFilter = document.getElementById('typeFilter');
    const priceFilter = document.getElementById('priceFilter');

    function applyFilters() {
        const selectedType = typeFilter.value;
        const maxPrice = parseInt(priceFilter.value, 10);

        markers.forEach(marker => {
            const type = marker.properties.get('type');
            const price = marker.properties.get('price');
            const visible = (selectedType === 'all' || type === selectedType) && price <= maxPrice;

            if (visible) {
                map.geoObjects.add(marker);
            } else {
                map.geoObjects.remove(marker);
            }
        });
    }

    typeFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('input', applyFilters);
}
