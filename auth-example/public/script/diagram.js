const ctx = document.getElementById('demandChart').getContext('2d');
const demandChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Москва', 'Краснодар', 'Санкт-Петербург', 'Новосибирск', 'Казань'],
        datasets: [{
            label: 'Кол-во запросов',
            data: [1200, 950, 800, 600, 500],
            backgroundColor: [
                '#141414',
                '#141414',
                '#141414',
                '#141414',
                '#141414'
            ],
            borderRadius: 8
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (ctx) => `Запросов: ${ctx.parsed.y}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Кол-во запросов'
                }
            },
            x: {
                title: {
                    display: true
                }
            }
        }
    }
});



const diagramTwo = document.getElementById('dealsChart').getContext('2d');
const dealsChart = new Chart(diagramTwo, {
    type: 'line',
    data: {
        labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл'],
        datasets: [{
            label: 'Кол-во сделок',
            data: [120, 150, 180, 200, 250, 300, 275],
            borderColor: '#FFD11A',
            backgroundColor: 'rgba(25,25,25,0.2)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#FFD11A',
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (diagramTwo) => `Сделок: ${diagramTwox.parsed.y}`
                }
            },
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Месяц'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Количество сделок'
                }
            }
        }
    }
});




const diagramTree = document.getElementById('developersChart').getContext('2d');
const developersChart = new Chart(diagramTree, {
    type: 'bar',
    data: {
        labels: ['DOGMA', 'Победа', 'Avalin'],
        datasets: [
            {
                label: 'Добавленные объекты',
                data: [35, 22, 41],
                backgroundColor: '#141414'
            },
            {
                label: 'Закрытые сделки',
                data: [28, 18, 33],
                backgroundColor: '#FFD11A'
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14
                    }
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Застройщик'
                },
                stacked: false
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Количество объектов / сделок'
                }
            }
        }
    }
});



const diagramFour = document.getElementById('priceTrendChart').getContext('2d');
const chart = new Chart(diagramFour, {
    type: 'line',
    data: {
        labels: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь'],
        datasets: [
            {
                label: 'Эконом',
                data: [55000, 56000, 56500, 57000, 57800, 58200],
                borderColor: '#4e73df',
                tension: 0.3
            },
            {
                label: 'Комфорт',
                data: [72000, 73000, 73500, 74000, 75500, 76800],
                borderColor: '#1cc88a',
                tension: 0.3
            },
            {
                label: 'Бизнес',
                data: [95000, 97000, 99000, 100500, 102000, 103000],
                borderColor: '#e74a3b',
                tension: 0.3
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Месяц'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Средняя цена, ₽/м²'
                },
                beginAtZero: false
            }
        }
    }
});
// Заглушка: фильтры пока не обновляют данные (можно подключить к API)
document.getElementById('regionSelect').addEventListener('change', () => {
    alert('Фильтрация по региону не реализована. Подключите серверные данные.');
});
document.getElementById('developerSelect').addEventListener('change', () => {
    alert('Фильтрация по застройщику не реализована. Подключите серверные данные.');
});



