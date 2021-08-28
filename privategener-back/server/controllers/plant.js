const Plant = require('../models/Plant.js')

exports.postPlant = async(req, res) => {
    const plantData = new Plant({
        ...req.body
    })
    plantData.save((err, plant) => {

    if(plantData.plantid.length <=6){
        res.status(200).json({
            ok: true,
            plant
        })
    } else {
        res.status(400).json({
            ok: false,
            msg: "No puedes cargar mas de 6 plantas"
        });
    }
    });
    
};

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
    const idPlant = req.params.id
    try {
        const results = await Plant.findOne({discord: idPlant}).exec();
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

// exports.getPlantById2 = async(req, res) => {
//     const idPlant = req.params.id
//     try {
//         const results = await Plant.findOne({discord: idPlant, account: 2 }).exec();
//         res.status(200).json(
//             results
//         )
//     } catch (error) {
//         res.status(400).json({
//             ok: false,
//             msg: error
//         })
//     }
// };

exports.updatePlant = async(req, res) => {
    try {
        const updated = await Plant.findOneAndUpdate({discord: req.params.id}, req.body);
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
    try{
        const totalPlants = await Plant.countDocuments();

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
    const idDiscord = req.params.id
    try{
        await Plant.deleteOne({discord: idDiscord});
        res.status(200).json({
            msg: `Las plantas con Discord ID:${idDiscord} fueron eliminadas`,

        });
    }catch(err){
        res.status(400).json({
            error: err,
            msg:`Las plantas con Discord ID:${idDiscord} no pudieron ser eliminadas`
        })
    }
}