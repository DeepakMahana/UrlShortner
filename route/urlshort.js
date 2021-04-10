const express = require('express')
const urlshort = express.Router()
const helper = require('../helper/urlshort')

urlshort.post('/shorten', async (req, res) => {
    let apires = await helper.shortenUrl(req.body);
    return res.status(200).json(apires);
})

urlshort.get('/all-urls', async (req, res) => {
    let apires = await helper.getAllUrl();
    return res.status(200).json(apires);
})

urlshort.get('/:id', async (req, res) => {
    let apires = await helper.getUrlByID(req.params);
    return res.status(200).json(apires);
})

module.exports = urlshort