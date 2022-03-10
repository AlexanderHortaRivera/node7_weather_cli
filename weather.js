#!/usr/bin/env node
import {getArgs} from './helpers/args.js'
import {printHelp, printSuccess, printError} from "./services/log.services.js";
import {saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather} from "./services/api.service.js";

const saveToken = async (token) => {
    if(!token.length) {
        printError('Не введен токен');
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Токен сохранен');
    }
    catch (e) {
        printError('Ошибка сохранения токена: ' + e.message);
    }
}


const initCLI = () => {

    const args = getArgs(process.argv);

    if(args.h) {
        printHelp();
    }
    if(args.s) {
        // Сохранить город
        getWeather(args.s);

    }
    if(args.t) {
        return saveToken(args.t);
    }
    // Вывести погоду

};

initCLI();