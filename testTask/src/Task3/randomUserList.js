/**
 * Generates a random date between January 1, 1950, and the current date.
 * @returns {Date} A random date object.
 */
function generateRandomDate() {
    const start = new Date('1950-01-01').getTime();
    const now = new Date().getTime();
    const randomTime = start + Math.random() * (now - start);
    return new Date(randomTime);
}

/**
 * Creates a user with a random birthdate and a status from a predefined list.
 * @returns {{date: Date, status: string}} An object containing the status and birthdate of a user.
 */
function createUser() {
    const statuses = ['vip', 'gold', 'usual'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const birthDate = generateRandomDate();
    return { status, date: birthDate };
}

/**
 * Generates a list of random users and sorts them by status and birth date.
 * @returns {{date: Date, status: string}[]} A sorted array of user objects.
 */
function randomUserList() {
    let users = Array.from({ length: 10 }, () => createUser());


    return users.sort((a, b) => {
        const statusOrder = ['vip', 'gold', 'usual'];
        const statusComparison = statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
        if (statusComparison !== 0) return statusComparison;

        return b.date - a.date;
    });
}

console.log(randomUserList());
