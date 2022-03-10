import { homedir } from 'os';
import { join, basename, dirname, extname, relative, isAbsolute, resolve, sep } from 'path';
import { promises } from 'fs';

const filePAth = join(homedir(), "weather-data.json");

const saveKeyValue = async (key, value) => {

    let data = {};

    if(await isExist(filePAth)) {
        const file = await promises.readFile(filePAth);
        data = JSON.parse(file);
    }

    data[key] = value;
    await promises.writeFile(filePAth, JSON.stringify(data));

};

const getKeyValue = async (key) => {

    if(await isExist(filePAth)) {
        const file = await promises.readFile(filePAth);
        const data = JSON.parse(file);
        return data[key];
    }

    return undefined;

}

const isExist = async (path) => {

    try {
        await promises.stat(path);
        return true;
    }
    catch (e){
        return false;
    }

}


export { saveKeyValue, getKeyValue };
