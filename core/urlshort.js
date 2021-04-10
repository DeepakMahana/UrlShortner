const Hash = require("../util/hashgenerator")
const Urls = require("../model/url");

const shortUrl = async (url, description) => {

    // Check if url already exists
    let urlDoc = await Urls.findOne({originalUrl: url}).lean().catch(err => {throw new Error('Failed to fetch existing URL')})
    let shortenUrl = "";

    // If exists return
    if(urlDoc){
        shortenUrl = urlDoc.shortenUrl;
    }else{
         // Get HashKey
        shortenUrl = await Hash.getHash()

        // Save in DB
        let newUrl = new Urls({
            originalUrl: url,
            shortenUrl: shortenUrl,
            description: description 
        })

        await newUrl.save().catch(err => { throw new Error('Failed to save shorten URL') })
    }

    return {
        url,
        shortenUrl,
        description
    }
}

const getAllUrl = async () => {

    let docs = await Urls.find({},{'_id': 0}).select('originalUrl').lean()
    if(!docs.length) throw new Error(`No URLs Found`)
    return [...docs]
}

const getUrlByID = async (hash) => {
    let doc = await Urls.findOne({shortenUrl: hash}).lean()
    if(!doc) throw new Error(`Invalid Short ID`)
    return doc
}

module.exports = {
    shortUrl,
    getAllUrl,
    getUrlByID
}