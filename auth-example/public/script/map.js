ymaps.ready(init);

function init() {
    const map = new ymaps.Map("map", {
        center: [45.035470, 38.975313], // Центр Краснодар
        zoom: 10,
        controls: ['zoomControl']
    });

    const apartments = [
        {
            coords: [45.019583, 38.979495],
            type: 'new',
            price: 7800000,
            pricePerM2: 125000,
            title: 'ЖК "Сказка Град"',
            address: 'Краснодар, ул. Красных Партизан, 1/3',
            developer: 'ГК Догма',
            rooms: 1,
            area: 62.4,
            floor: 8,
            floorsTotal: 18,
            class: 'комфорт+',
            deadline: '3 кв 2025',
            isMortgageAvailable: true,
            description: 'ЖК с инфраструктурой, зелёным двором и садиком.',
            link: 'https://dogma-krd.ru/skazka-grad',
            images: ['/uploads/26c882320d824d3881b2788d2dc464ce.png', '/uploads/realty_app_snippet_middle.jpg'],
            tags: ['Детский сад','Парковка','Ипотека от 4.7%'],
            createdAt: '2025-06-28T11:10:00Z'
        },
        {
            coords: [45.020700, 38.973200],
            type: 'new',
            price: 6800000,
            pricePerM2: 115000,
            title: 'ЖК "Dogma Park"',
            address: 'Краснодар, ул. Марины Цветаевой, 7к1',
            developer: 'ГК Догма',
            rooms: 2,
            area: 59,
            floor: 5,
            floorsTotal: 16,
            class: 'комфорт',
            deadline: 'сдан июнь 2024',
            isMortgageAvailable: true,
            description: 'Комфорт-класс, подземный паркинг, рядом школы и садики.',
            link: 'https://dogma.ru/park-pobedy',
            images: ['/uploads/26c882320d824d3881b2788d2dc464ce.png', '/uploads/realty_app_snippet_middle.jpg'],
            tags: ['Паркинг','Двор без машин'],
            createdAt: '2025-01-27T10:00:00Z'
        },
        {
            coords: [45.006500, 38.960000],
            type: 'new',
            price: 9500000,
            pricePerM2: 142640,
            title: 'ЖК "Патрики"',
            address: 'Краснодар, ул. Красная, 123',
            developer: 'ГК Победа',
            rooms: 2,
            area: 66.6,
            floor: 5,
            floorsTotal: 16,
            class: 'бизнес',
            deadline: '4 кв 2025',
            isMortgageAvailable: true,
            description: 'Современный ЖК в центре с подземным паркингом.',
            link: 'https://patriki-krd.ru',
            images: ['/uploads/26c882320d824d3881b2788d2dc464ce.png', '/uploads/realty_app_snippet_middle.jpg'],
            tags: ['Парковка','Ипотека'],
            createdAt: '2025-06-28T10:32:00Z'
        },
        {
            coords: [45.021000, 38.970000],
            type: 'new',
            price: 8300000,
            pricePerM2: 130000,
            title: 'ЖК "Победа" (ул. Метальникова)',
            address: 'Краснодар, ул. Петра Метальникова, 34',
            developer: 'ГК Победа',
            rooms: 2,
            area: 64,
            floor: 7,
            floorsTotal: 17,
            class: 'комфорт+',
            deadline: 'сдан',
            isMortgageAvailable: true,
            description: 'Закрытая территория, благоустроенный двор и спортплощадки.',
            link: 'https://zhk-pobeda-krasnodar-i.cian.ru',
            images: ['/uploads/26c882320d824d3881b2788d2dc464ce.png', '/uploads/realty_app_snippet_middle.jpg'],
            tags: ['Спортплощадки','Охрана'],
            createdAt: '2025-04-01T09:00:00Z'
        },
        {
            coords: [45.015000, 38.960000],
            type: 'new',
            price: 10800000,
            pricePerM2: 163768,
            title: 'ЖК "AVrorA"',
            address: 'Краснодар, ул. Дзержинского, 95',
            developer: 'AVA',
            rooms: 2,
            area: 66,
            floor: 10,
            floorsTotal: 22,
            class: 'бизнес',
            deadline: '3 кв 2026',
            isMortgageAvailable: true,
            description: 'Бизнес-класс в центре, высокие потолки и закрытый двор.',
            link: 'https://avadom.ru/objects/avrora/',
            images: ['/uploads/26c882320d824d3881b2788d2dc464ce.png', '/uploads/realty_app_snippet_middle.jpg'],
            tags: ['Закрытый двор','Высокие потолки'],
            createdAt: '2025-04-01T09:00:00Z'
        },
        {
            coords: [45.025000, 38.980000],
            type: 'new',
            price: 7200000,
            pricePerM2: 120000,
            title: 'ЖК "Режиссёр"',
            address: 'Краснодар, ул. Уральская, 100/6',
            developer: 'AVA',
            rooms: 1,
            area: 38,
            floor: 12,
            floorsTotal: 21,
            class: 'комфорт',
            deadline: '4 кв 2025',
            isMortgageAvailable: true,
            description: 'Комфорт-класс рядом с ТЦ и транспортом.',
            link: 'https://avadom.ru/objects/rezhissyer/',
            images: ['/uploads/26c882320d824d3881b2788d2dc464ce.png', '/uploads/realty_app_snippet_middle.jpg'],
            tags: ['Близко к ТЦ','Комфорт'],
            createdAt: '2025-04-01T09:00:00Z'
        },
        {
            coords: [45.017500, 38.975000],
            type: 'new',
            price: 8200000,
            pricePerM2: 128000,
            title: 'ЖК "Mega Победа"',
            address: 'Новая Адыгея, Песочная ул., 1к2',
            developer: 'ГК Победа',
            rooms: 3,
            area: 64,
            floor: 9,
            floorsTotal: 17,
            class: 'комфорт+',
            deadline: 'сдан',
            isMortgageAvailable: true,
            description: 'Уютный комплекс с зелёным двором.',
            link: 'https://jk-mega-pobeda.ru',
            images: ['/uploads/26c882320d824d3881b2788d2dc464ce.png', '/uploads/realty_app_snippet_middle.jpg'],
            tags: ['Зелёный двор','Сдан'],
            createdAt: '2025-02-01T09:00:00Z'
        },
        {
            coords: [45.023000, 38.972000],
            type: 'new',
            price: 7600000,
            pricePerM2: 122000,
            title: 'ЖК "Парк Победы"',
            address: 'Краснодар, ул. Героя Пешкова, 14к3',
            developer: 'ГК Догма',
            rooms: 2,
            area: 62,
            floor: 6,
            floorsTotal: 16,
            class: 'комфорт',
            deadline: 'сдан',
            isMortgageAvailable: true,
            description: 'ЖК с выгодой до 2.7 млн при покупке.',
            link: 'https://dogma.ru/stocks',
            images: ['/uploads/26c882320d824d3881b2788d2dc464ce.png', '/uploads/realty_app_snippet_middle.jpg'],
            tags: ['Скидки','Паркинг'],
            createdAt: '2025-01-01T09:00:00Z'
        },
        {
            coords: [45.022500, 38.970500],
            type: 'new',
            price: 6500000,
            pricePerM2: 110000,
            title: 'ЖК "Dogma Park" (лит.10)',
            address: 'Краснодар, ул. Марины Цветаевой, 2к3',
            developer: 'ГК Догма',
            rooms: 1,
            area: 59,
            floor: 4,
            floorsTotal: 16,
            class: 'комфорт',
            deadline: 'сдан июнь 2024',
            isMortgageAvailable: true,
            description: 'Комфорт-класс, близко к школам и детским садам.',
            link: 'https://dogma.ru/park-pobedy',
            images: ['/uploads/26c882320d824d3881b2788d2dc464ce.png', '/uploads/realty_app_snippet_middle.jpg'],
            tags: ['Комфорт','Детский сад рядом'],
            createdAt: '2025-03-01T09:00:00Z'
        },
        {
            coords: [45.018000, 38.960500],
            type: 'new',
            price: 9900000,
            pricePerM2: 150000,
            title: 'ЖК "AVrorA" (лит.22)',
            address: 'Краснодар, ул. Дзержинского, 95',
            developer: 'AVA',
            rooms: 3,
            area: 66,
            floor: 15,
            floorsTotal: 22,
            class: 'бизнес',
            deadline: '3 кв 2026',
            isMortgageAvailable: true,
            description: 'Бизнес-класс в центральном районе.',
            link: 'https://avadom.ru/objects/avrora/',
            images: ['/uploads/26c882320d824d3881b2788d2dc464ce.png', '/uploads/realty_app_snippet_middle.jpg'],
            tags: ['Престижный','Закрытый двор'],
            createdAt: '2025-04-01T09:00:00Z'
        }
    ];

    const markers = [];

    apartments.forEach((apt) => {
        const placemark = new ymaps.Placemark(apt.coords, {
            balloonContent: `
                                 
                                  <div class="images" style="display: flex; column-gap: 10px">
                                      <img src="${apt.images[0]}" alt="Изображение квартиры" style="width: 100%; max-height: 150px; object-fit: cover; border-radius: 5px">
                                      <img src="${apt.images[1]}" alt="Изображение квартиры" style="width: 100%; max-height: 150px; object-fit: cover; border-radius: 5px">
                                  </div>
                               
                                  <nav class="nav">
                                        <li style="font-size: 25px; color: #141414; font-weight: 600; padding: 10px 0;">${apt.price.toLocaleString()}₽</li>
                                        <li>${apt.description}</li>
                                        <li style="padding-bottom: 20px;">Адрес: ${apt.address}</li>
                                        <li style="padding-bottom: 20px;">
                                          <a href="./podrobnee" class="link">Подробнее</a>
                                        </li>
                                        
                                        <h6 style="font-size: 18px">Параметры</h6>
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
