import https from 'https';
import {getKeyValue, TOKEN_DICTIONARY} from "./storage.service.js";
import axios from "axios";

const getWeather = async (city) => {

    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    const coord = await getCityCoord(city, token);
    const forcast = await getWeatherCityAxios(coord, token);

    return forcast;

}

const getCityCoord = async (city, token) => {

    const { data } = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: city,
            appid: token
        }
    });

    const coord = {
        lat: data[0].lat,
        lon: data[0].lon,
    };

    return coord;

}


const getWeatherCityHTTPS = async (coord) => {

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
            return resJson;

        });

    });

}

const getWeatherCityAxios = async (coord, token) => {

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            lat: coord.lat,
            lon: coord.lon,
            appid: token,
            units: 'metric',
            lang: 'ru'
        }
    });

    return data;

}

export {getWeather};