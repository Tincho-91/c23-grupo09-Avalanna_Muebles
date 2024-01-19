const fs=require("fs");
const path = require("path")

const getJson = (fileName) =>{
    const file = fs.readFileSync(`${__dirname}/../data/${fileName}.json`, "utf-8");
    const json = JSON.parse(file);
    return json;
}

const setJson = (array, fileName) =>{
    const json = JSON.stringify(array);
    fs.writeFileSync(`${__dirname}/../data/${fileName}.json`, json, "utf-8");

}

module.exports = { getJson, setJson };