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

const averageSalePricesPerM2ByCity = {
    "сочи": 250000,
    "москва": 320000,
    "уфа": 120000,
    "тюмень": 100000,
    "санкт-петербург": 280000,
    "казань": 150000,
    "екатеринбург": 140000,
    "новосибирск": 130000,
    "ростов-на-дону": 110000,
    "владивосток": 180000,
    "нижний новгород": 135000,
    "пермь": 100000,
    "воронеж": 95000,
    "краснодар": 125000,
};
const averagePricesByCity = {
    "сочи": 45000,
    "москва": 80000,
    "уфа": 32000,
    "тюмень": 28000,
    "казань": 35000,
    "новосибирск": 38000,
    "санкт-петербург": 50000,
    "екатеринбург": 46000,
    "ростов-на-дону": 30000,
    "краснодар": 30000,
    "владивосток": 40000,
    "нижний новгород": 40000,
    "пермь": 30000,
    "воронеж": 27000
};
const averageDailyPricesByCity = {
    "сочи": 4000,
    "москва": 8000,
    "уфа": 3200,
    "тюмень": 2800,
    "казань": 3000,
    "новосибирск": 2500,
    "санкт-петербург": 2500,
    "екатеринбург": 2800,
    "ростов-на-дону": 2200,
    "краснодар": 1800,
    "владивосток": 3000,
    "нижний новгород": 2500,
    "пермь": 2000,
    "воронеж": 2000
};


function displayResults(results) {
    const container = document.getElementById('results');
    container.innerHTML = results.map(p => {
        let displayedProb = p.probability;
        const city = p.city.toLowerCase();

        if (p.type === "длительно" && averagePricesByCity[city]) {
            const percent = (p.price * 100) / averagePricesByCity[city];
            if (100 - percent >= 25) {
                displayedProb *= 0.7; // цена слишком низкая для длительной аренды
            }
        } else if (p.type === "посуточно" && averageDailyPricesByCity[city]) {
            const percent = (p.price * 100) / averageDailyPricesByCity[city];
            if (100 - percent >= 25) {
                displayedProb *= 0.7; // цена слишком низкая для посуточной аренды
            }
        } else if (p.type === "купить" && averageSalePricesPerM2ByCity[city]) {
            const percent = (p.price * 100) / averageSalePricesPerM2ByCity[city];
            if (100 - percent >= 25) {
                displayedProb *= 0.7; // цена слишком низкая для посуточной аренды
            }
        }

        if (p.validAddress === false) {
            displayedProb *= 0.4; // снижаем при неверном адресе
        }

        let color;
        if (displayedProb  >= 80) color = 'green';
        else if (displayedProb  < 80 && displayedProb  >= 55) color = 'yellow';
        else if (displayedProb  < 55 && displayedProb  > 30) color = 'orange';
        else color = 'red';


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
        <div class="property__verifications">
          <p class="property__probability">Надёжность <span style="color:${color}">${displayedProb.toFixed(0)} %</span></p>
        </div>
      </article>
      `;
    }).join('');
}

















