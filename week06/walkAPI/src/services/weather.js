const BASE_URL = 'https://api.weatherapi.com/v1/history.json';

const getWeather = (city, date) => {
    try {
        axios.get(
            `${BASE_URL}?key=TODO&q=${city}&dt=${date}`
        );
    } catch (error) {
        console.error(error);
    }
    console.log(`{BASE_URL}?key=TODO&q=${city}&dt=${date}`);
};

module.exports = {
    getWeather,
};