// const MESSAGES = require('../constant/messages');
const UTIL = require("../util/utility");
const URLSHORTENER = require("../core/urlshort");
// const TODO = require('../core/todo');
const NULLCHECK = [undefined, null, ''];

// Shorten URL 
const shortenUrl = async (req) => {
    try {

        let url = req.url.toString().trim();
        let sanitizedUrl = url.replace(/\/+$/, '');       // remove trailing slashes
        let description = req.description.toString().trim();

        // Validations
        if (!UTIL.checkValidUrl(sanitizedUrl)) throw new Error('Invalid Url');
        if (NULLCHECK.includes(description)) throw new Error('Invalid Description');

        // Core Logic
        let data = await URLSHORTENER.shortUrl(sanitizedUrl, description);

        // Return response
        return {
            status: "Success",
            message: "URL Shortened Successfully",
            data: {...data}
        }

    } catch (err) {
        return {
            status: "Failed",
            message: err.message,
            data: null
        }
    }
}

// Get All Url
const getAllUrl = async () => {
    try {

        // Core Logic
        let data = await URLSHORTENER.getAllUrl();

        // Return response
        return {
            status: "Success",
            message: "URLs Found Successfully",
            data: data
        }

    } catch (err) {
        return {
            status: "Failed",
            message: err.message,
            data: null
        }
    }
}

// Get All Url
const getUrlByID = async (params) => {
    try {

        let id = params.id;

        // Core Logic
        let data = await URLSHORTENER.getUrlByID(id);

        // Return response
        return {
            status: "Success",
            message: "URL Found Successfully",
            data: data
        }

    } catch (err) {
        return {
            status: "Failed",
            message: err.message,
            data: null
        }
    }
}

module.exports = {
    shortenUrl,
    getAllUrl,
    getUrlByID
}