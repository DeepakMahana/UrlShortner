const shortId = require("shortid")
const mongoose = require("mongoose")
const Hashs = require("../model/hashkey")
const log = require("../util/log")

const getHash = async () => {

    // Start a Transaction
    const session = await Hashs.startSession();
    session.startTransaction();

    try{

        // Find hash
        let hash = await Hashs.findOne({isUsed: false}).lean();

        // If no hashKey Found
        if(!hash || !hash.hashKey){
            // Close Transaction and Generate Some Hash key
            await session.commitTransaction();
            session.endSession();
            await generateAndStoreHash();
            return getHash()
        }

        // If hash found then update the status
        let searchQuery = { _id: mongoose.Types.ObjectId(hash._id) }
        let updateQuery = { $set: {'isUsed': true} }
        await Hashs.findOneAndUpdate(searchQuery, updateQuery).exec();

        // Close Transaction and Return HashKey
        await session.commitTransaction();
        session.endSession();

        return hash.hashKey

    }catch(err){
        console.log(err)
        await session.abortTransaction();
        session.endSession();
    }

}

const generateAndStoreHash = async () => {

    let hashs = []
    for(let i=0; i<100; i++){
        let hash = shortId.generate()
        hashs.push({hashKey: hash})
    }

    await Hashs.insertMany(hashs).then(() => {
        log(`Hash stored successfully`)
    }).catch(err => {
        log(`Error While Storing Hash in DB: ${err}`, true, true)
    })

}

module.exports = {
    getHash
}