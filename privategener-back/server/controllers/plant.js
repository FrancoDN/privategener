const Plant = require('../models/Plant.js')

exports.getPlants = async(req, res) => {

    try {
        const plants = await Plant.find();
        res.status(200).json({
            ok: true,
            plants
        })
    } catch (err) {
        res.status(400).json({
            ok: false,
            msg: err
        });
    }
};

exports.getPlantById = async(req, res) => {
    const uidDonor = req.params.id
    try {
        const results = await Plant.find({uid: uidDonor}).exec();
        console.log(results);
        res.status(200).json(
            results
        )
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: error
        })
    }
};

exports.updatePlant = async(req, res) => {
    const query = {uid: req.params.id, account: req.body.account}
    const update = {$set: {...req.body }}
    const options = {upsert: true}
    try {
        const updated = await Plant.updateOne(query, update, options);
        console.log(updated);
        res.json({
            updated,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: error
        })
    }
};

exports.getPlantsCount = async(req, res) => {
    const uidDonor = req.params.id
    try{
        const totalPlants = await Plant.countDocuments({uid: uidDonor});

        res.json({
            totalPlants
        })
    } catch(err){
        res.json({
            ok: false,
            msg: err
        })

    }
};

exports.deletePlant = async(req, res) => {
    const uidDonor = req.params.id
    try{
        await Plant.deleteOne({uid: uidDonor});
        res.status(200).json({
            msg: `Las plantas con ID:${uidDonor} fueron eliminadas`,

        });
    }catch(err){
        res.status(400).json({
            error: err,
            msg:`Las plantas con ID:${uidDonor} no pudieron ser eliminadas`
        })
    }
}