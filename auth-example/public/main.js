let properties = [];

fetch('properties.json')
    .then(response => response.json())
    .then(async data => {
        properties = data.map(p => {
            if (p.probability == null) p.probability = 100;
            return p;
        });
        document.getElementById('price-value').textContent = document.getElementById('price').value;

        await checkAllAddresses();

        filterProperties(); // вызываем после загрузки данных
    })
    .catch(error => {
        console.error('Ошибка загрузки данных:', error);
    });

function filterProperties() {
        const type = document.getElementById('type').value;
        const maxPrice = parseInt(document.getElementById('price').value);
        const area = parseInt(document.getElementById('area').value) || 0;
        const city = document.getElementById('city').value.toLowerCase();
        const guests = parseInt(document.getElementById('guests').value) || 0;
        const search = document.getElementById('search').value.toLowerCase();
        const selectedEquipment = Array.from(document.querySelectorAll('.equipment:checked')).map(el => el.value);

        const filtered = properties.filter(p => {
            return (!type || p.type === type)
            && p.price <= maxPrice
            && p.area >= area
            && (!city || p.city.toLowerCase().includes(city))
            && (!search || p.city.toLowerCase().includes(search) || p.title.toLowerCase().includes(search))
            && p.guests >= guests
            && selectedEquipment.every(eq => p.equipment.includes(eq));
    });

    displayResults(filtered);
    }


function checkAddressExists(city, address) {
    const apiKey = '0052a09e-3633-4c3f-84c1-1c2309b4728b';
    const fullAddress = `${city}, ${address}`;
    const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${encodeURIComponent(fullAddress)}&format=json`;

    return fetch(url)
        .then(res => res.json())
        .then(data => {
            const results = data.response.GeoObjectCollection.featureMember;
            if (results.length === 0) {
                console.log(`Адрес "${fullAddress}" не найден`);
                return false;
            }

            const meta = results[0].GeoObject.metaDataProperty.GeocoderMetaData;
            const kind = meta.kind;          // тип объекта (house, street, locality и т.д.)
            const precision = meta.precision; // точность результата (exact, number, near, street и т.д.)

            console.log(`Проверка адреса "${fullAddress}": kind = ${kind}, precision = ${precision}`);

            // Возвращаем true только если тип — дом и точность — exact или number
            if (kind === 'house' && (precision === 'exact' || precision === 'number')) {
                return true;
            }

            return false;
        })
        .catch(error => {
            console.error('Ошибка при проверке адреса:', error);
            return false;
        });
}

async function checkAllAddresses() {
    for (let p of properties) {
        p.validAddress = await checkAddressExists(p.city, p.address);
    }
}



function displayResults(results) {
    const container = document.getElementById('results');
    container.innerHTML = results.map(p => {

        return `
        <article class="property">
        <div class="property__body">
          <img src="${p.image}" width="250" alt="Фото квартиры в городе ${p.city}">
          <div class="property-info">
            <h5>${p.title}</h5>
            <div class="description">
              <p>Город: ${p.city}</p>
              <p>Цена: ${p.price.toLocaleString()} ₽</p>
              <p>Площадь: ${p.area} м²</p>
            </div>
          </div>
        </div>
       
      </article>
      `;
    }).join('');
}


