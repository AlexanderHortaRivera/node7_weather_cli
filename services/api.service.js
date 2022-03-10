import https from 'https';
import {getKeyValue, TOKEN_DICTIONARY} from "./storage.service.js";

const getWeather = async (city) => {

    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    const coord = {};

    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    const url = new URL('https://api.openweathermap.org/geo/1.0/direct');
    url.searchParams.append('q', city);
    url.searchParams.append('appid', token);

    await https.get(url, (response) => {

        let res = '';
        response.on('data', (chunk) => {
            res += chunk;
        });

        response.on('end', () => {

            const resJson = JSON.parse(res);

            coord.lat = resJson[0].lat;
            coord.lon = resJson[0].lon;

            getWeatherCity(coord);

        });

    });

}

const getWeatherCity = async (coord) => {

    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.searchParams.append('lat', coord.lat);
    url.searchParams.append('lon', coord.lon);
    url.searchParams.append('appid', token);
    url.searchParams.append('units', 'metric');
    url.searchParams.append('lang', 'ru');

    await https.get(url, (response) => {

        let res = '';
        response.on('data', (chunk) => {
            res += chunk;
        });

        response.on('end', () => {

            const resJson = JSON.parse(res);
            console.log(resJson);

        });

    });





}

console.log("работаем...")
export {getWeather};