const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
const PORT = 3000;

/**
 * Formats a JavaScript Date object into a string in the format DD.MM.YYYY.
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
const formatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
};

/**
 * Route to get current exchange rates for USD and EUR from the PrivatBank API.
 * It fetches data and filters for only USD and EUR currencies.
 */
app.get('/api/rates/current', async (req, res) => {
    try {
        const response = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
        const data = await response.json();
        const filteredRates = data.filter(rate => rate.ccy === 'USD' || rate.ccy === 'EUR');
        res.json(filteredRates);
    } catch (error) {
        console.error('Error fetching current rates:', error);
        res.status(500).json({ error: 'Failed to fetch current rates' });
    }
});

/**
 * Route to get yesterday's exchange rates for USD and EUR.
 * It calculates the date for "yesterday", formats it, and makes an API request with that date.
 */
app.get('/api/rates/yesterday', async (req, res) => {
    const yesterday = new Date(Date.now() - 86400000);
    const formattedDate = formatDate(yesterday);
    try {
        const response = await fetch(`https://api.privatbank.ua/p24api/exchange_rates?json&date=${formattedDate}`);
        const data = await response.json();
        const filteredRates = data.exchangeRate.filter(rate => rate.currency === 'USD' || rate.currency === 'EUR');
        res.json(filteredRates);
    } catch (error) {
        console.error('Error fetching yesterday rates:', error);
        res.status(500).json({ error: 'Failed to fetch yesterday rates' });
    }
});

/**
 * Route to get the minimum and maximum exchange rates for USD and EUR over the past week.
 * It iterates over the last 7 days, fetches rates for each day, and calculates the min and max rates.
 */
app.get('/api/rates/weekly-min-max', async (req, res) => {
    let weekData = [];
    for (let i = 6; i >= 0; i--) { // За останні 7 днів
        const date = new Date(Date.now() - i * 86400000);
        const formattedDate = formatDate(date);
        try {
            const response = await fetch(`https://api.privatbank.ua/p24api/exchange_rates?json&date=${formattedDate}`);
            const data = await response.json();
            const filteredRates = data.exchangeRate.filter(rate => rate.currency === 'USD' || rate.currency === 'EUR');
            weekData.push({ date: formattedDate, rates: filteredRates });
        } catch (error) {
            console.error('Error fetching weekly rates:', error);
            res.status(500).json({ error: 'Failed to fetch weekly rates' });
            return;
        }
    }

    const minMaxRates = weekData.reduce((acc, day) => {
        day.rates.forEach(rate => {
            if (!acc[rate.currency]) {
                acc[rate.currency] = { min: rate.saleRateNB, max: rate.saleRateNB, minDate: day.date, maxDate: day.date };
            } else {
                if (rate.saleRateNB < acc[rate.currency].min) {
                    acc[rate.currency].min = rate.saleRateNB;
                    acc[rate.currency].minDate = day.date;
                }
                if (rate.saleRateNB > acc[rate.currency].max) {
                    acc[rate.currency].max = rate.saleRateNB;
                    acc[rate.currency].maxDate = day.date;
                }
            }
        });
        return acc;
    }, {});

    res.json(minMaxRates);
});

// Starts the server and listens on PORT 3000 for connections
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
