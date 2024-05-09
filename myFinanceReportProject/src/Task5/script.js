const callBotsArr = [
    {sessionId: "f4465250-1066-11eb-a1ba-333704aff6af", channelId: "543ea1f0-81d8-11e8-99e2-75a22f922020", companyId: "i14778026796", botName: "moneybox", time: 1602677158, numderBot: 1},
    {sessionId: "74e40bf0-0fbd-11eb-8dcc-39ce21e9ded5", channelId: "d79ad580-8432-11e8-8ccb-47a5457db1b2", companyId: "i14778026796", botName: "changecrlim", time: 1602933008, numderBot: 2},
    {sessionId: "74e40bf0-0fbd-11eb-8dcc-39ce21e9ded5", channelId: "d79ad580-8432-11e8-8ccb-47a5457db1b2", companyId: "i14778026796", botName: "changecrlim", time: 1602930478, numderBot: 3},
    {sessionId: "74e40bf0-0fbd-11eb-8dcc-39ce21e9ded5", channelId: "d79ad580-8432-11e8-8ccb-47a5457db1b2", companyId: "i14778026796", botName: "partpaym", time: 1602929458, numderBot: 4},
    {sessionId: "eeae0530-1067-11eb-a1ba-333704aff6af", channelId: "70fff320-42d9-11ea-ac8e-33aee523fe76", companyId: "i14778026796", botName: "mainformcurr", time: 1602835558, numderBot: 5},
    {sessionId: "eeae0530-1067-11eb-a1ba-333704aff6af", channelId: "70fff320-42d9-11ea-ac8e-33aee523fe76", companyId: "i14778026796", botName: "formcurr", time: 1602835258, numderBot: 6}
];
let sortedAsc = false;

window.onload = function() {
    populateTable(callBotsArr);
    populateFilter();
    document.getElementById('botNameFilter').addEventListener('change', filterByBotName);
};
/**
 * Populates the HTML table with data provided.
 * @param {Object[]} data - Array of objects, where each object represents bot data.
 */
function populateTable(data) {
    const tbody = document.getElementById('botsTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    data.forEach(bot => {
        const row = tbody.insertRow();
        Object.values(bot).forEach(text => {
            const cell = row.insertCell();
            cell.textContent = text;
        });
    });
}

/**
 * Sorts the global bot array and updates the table display.
 */
function sortTable() {
    callBotsArr.sort((a, b) => {
        return sortedAsc ? a.numderBot - b.numderBot : b.numderBot - a.numderBot;
    });
    sortedAsc = !sortedAsc;
    filterByBotName();
}

/**
 * Populates the filter dropdown with unique bot names from the global bot array.
 */
function populateFilter() {
    const botNames = Array.from(new Set(callBotsArr.map(item => item.botName))).sort();
    const select = document.getElementById('botNameFilter');
    botNames.forEach(botName => {
        const option = document.createElement('option');
        option.value = botName;
        option.textContent = botName;
        select.appendChild(option);
    });
}

/**
 * Filters the table based on the selected bot name from the dropdown.
 */
function filterByBotName() {
    const selectedBotName = document.getElementById('botNameFilter').value;
    const filteredBots = selectedBotName ? callBotsArr.filter(bot => bot.botName === selectedBotName) : callBotsArr;
    populateTable(filteredBots);
}
