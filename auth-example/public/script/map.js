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
            type: 'new', // новостройка
            price: 9500000,
            pricePerM2: 142640, // расчетная цена за м²
            title: 'ЖК "Патрики"',
            address: 'г. Краснодар, ул. Красная, д. 123',
            developer: 'ГК Победа',
            rooms: 2,
            area: 66.6, // м²
            floor: 5,
            floorsTotal: 16,
            class: 'бизнес',
            deadline: '4 квартал 2025',
            isMortgageAvailable: true,
            description: 'Современный жилой комплекс в центре Краснодара с подземным паркингом и закрытой территорией.',
            link: 'https://patriki-krd.ru',
            images: [
                '/uploads/1751119574386-Group 303.png',
                '/uploads/1751119574386-Group 303.png',
                '/uploads/1751119574386-Group 303.png'
            ],
            tags: ['Паркинг', 'Двор без машин', 'Центр', 'Ипотека от 5%'],
            createdAt: '2025-06-28T10:32:00Z'
        }

    ];

    const markers = [];

    apartments.forEach((apt) => {
        const placemark = new ymaps.Placemark(apt.coords, {
            balloonContent: `
                                 
                                  <div class="images" style="display: flex;">
                                      <img src="${apt.images[0]}" alt="Изображение квартиры" style="width: 100%; max-height: 150px; object-fit: cover;">
                                      <img src="${apt.images[0]}" alt="Изображение квартиры" style="width: 100%; max-height: 150px; object-fit: cover;">
                                      <img src="${apt.images[0]}" alt="Изображение квартиры" style="width: 100%; max-height: 150px; object-fit: cover;">
                                  </div>
                                  <h6>Параметры</h6>
                                  <nav class="nav">
                                        <li style="font-size: 25px">Цена: ${apt.price.toLocaleString()}₽</li>
                                        <li>${apt.description}</li>
                                        <li>Адрес: ${apt.address}</li>
                                        <li>Застройщик: ${apt.developer}</li>
                                        <li>Класс: ${apt.class}</li>
                                        <li>Этажность: ${apt.class}</li>
                                        <li>Площадь: ${apt.address}</li>
                                
                                        <li>Этажность: ${apt.description}</li>
                                        <li>Приемущества: ${apt.class}</li>
                                        <li>Класс: ${apt.class}</li>
                                        
                                        <li>Дата сдачи: ${apt.deadline}</li>
                                  </nav> `
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
