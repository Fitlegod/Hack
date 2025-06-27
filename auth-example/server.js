require('dotenv').config(); // Загружаем .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const authRoutes = require('./routes/auth');


const app = express();


// Разрешаем запросы с других адресов (например, с твоей фронтенд-страницы)
app.use(cors());
// Разбираем JSON в теле запроса
app.use(express.json());
// Роуты авторизации
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

// Подключаемся к MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        // Запускаем сервер
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use(express.static('public'));

app.get('/check-domclick', async (req, res) => {
    const url = req.query.url;
    if (!url || !url.includes('domclick.ru')) {
        return res.json({ valid: false, reason: 'Ссылка не с ДомКлик' });
    }

    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-blink-features=AutomationControlled',
            ]
        });
        const page = await browser.newPage();

        // Настраиваем как настоящий браузер
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
            'AppleWebKit/537.36 (KHTML, like Gecko) ' +
            'Chrome/125.0.6422.142 Safari/537.36'
        );
        await page.setViewport({ width: 1280, height: 800 });

        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        // Ждём элементов: заголовок и адрес
        await page.waitForSelector('h1', { timeout: 30000 });
        await page.waitForSelector('a[data-e2e-id="building_uri"]', { timeout: 30000 });
        await page.waitForSelector('div[class="JfVCK"]', { timeout: 30000 });
        // await page.waitForSelector('div[id="description"]', { timeout: 30000 });
        // await page.waitForSelector('span[class="upbHP VL_g2"]', { timeout: 30000 });
        // await page.waitForSelector('span[link-link-777-11-1-2]', { timeout: 30000 });

        const html = await page.content();
        await browser.close();

        console.log(html);
        const $ = cheerio.load(html);

        // Актуальные селекторы нужно проверить по DevTools!
        const title = $('h1').first().text().trim();
        const address = $('a[data-e2e-id="building_uri"]').text().trim();
        const priceText = $('div[class="JfVCK"]').first().text().replace(/\D/g, '');
        const price = parseInt(priceText, 10);
        // let description = $('div[id="description"]').text().trim();
        // description = description.replace(/Скрыть\s*$/, '');

        const district = $('span[link-link-777-11-1-2]').text().trim();
        // const square = $('span[class="upbHP VL_g2"]').text().trim();

        // const marketPriceText = $('span[class="XBchw"]').first().text().replace(/\D/g, '');
        // const marketPrice = parseInt(priceText, 10);


        if (!title || !address || isNaN(price)) {
            return res.json({ valid: false, reason: 'Не удалось спарсить данные' });
        }

        res.json({ valid: true, title, address, price });
    } catch (err) {
        console.error('Ошибка при парсинге ДомКлик:', err);

        res.json({ valid: false, reason: 'Ошибка при парсинге ДомКлик' });
    }
});
