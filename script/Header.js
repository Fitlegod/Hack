const properties = [
    {
        type: "длительно",
        price: 50000,
        area: 45,
        city: "Москва",
        guests: 2,
        equipment: ["фен", "утюг", "плита"],
        description: "Квартира в центре Москвы"
    },
    {
        type: "посуточно",
        price: 3000,
        area: 35,
        city: "Сочи",
        guests: 4,
        equipment: ["фен", "сплит", "стиралка"],
        description: "Квартира у моря"
    },
    {
        type: "купить",
        price: 7500000,
        area: 70,
        city: "Казань",
        guests: 3,
        equipment: ["утюг", "плита", "стиралка"],
        description: "Просторная квартира в Казани"
    }
];

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
            && (!search || p.city.toLowerCase().includes(search) || p.description.toLowerCase().includes(search))
            && p.guests >= guests
            && selectedEquipment.every(eq => p.equipment.includes(eq));
    });

    displayResults(filtered);
}

function displayResults(results) {
    const container = document.getElementById('results');
    container.innerHTML = results.map(p => `
        <article class="property">
          <strong>${p.description}</strong><br>
          Город: ${p.city}<br>
          Тип: ${p.type}<br>
          Цена: ${p.price.toLocaleString()} ₽<br>
          Площадь: ${p.area} м²<br>
          Гостей: ${p.guests}<br>
          Техника: ${p.equipment.join(', ')}
        </article>
      `).join('');
}

document.getElementById('price-value').textContent = document.getElementById('price').value;
filterProperties();